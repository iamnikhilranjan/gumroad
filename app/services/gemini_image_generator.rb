# frozen_string_literal: true

require "base64"
require "httparty"

class GeminiImageGenerator
  API_URL = "https://generativelanguage.googleapis.com/v1beta/models"
  MODEL = "gemini-3-pro-image-preview"

  def self.generate(prompt:)
    return if api_key.blank?

    new(prompt:).generate
  end

  def self.api_key
    GlobalConfig.get("GEMINI_API_KEY")
  end

  def initialize(prompt:)
    @prompt = prompt
  end

  def generate
    response = post_request
    return if response.blank?

    parse_response(response)
  end

  private
    def post_request
      response = HTTParty.post(
        "#{API_URL}/#{MODEL}:generateContent",
        headers: {
          "Content-Type" => "application/json",
          "x-goog-api-key" => self.class.api_key
        },
        body: {
          contents: [
            {
              parts: [
                { text: @prompt }
              ]
            }
          ]
        }.to_json,
        timeout: 60
      )

      return response if response.success?

      Rails.logger.error("Gemini image generation failed: status=#{response.code} body=#{response.body}")
      nil
    rescue StandardError => e
      Rails.logger.error("Gemini image generation error: #{e.class}: #{e.message}")
      nil
    end

    def parse_response(response)
      body = JSON.parse(response.body)
      parts = body.dig("candidates", 0, "content", "parts") || []
      inline = parts.find { |part| part["inlineData"].present? || part["inline_data"].present? }
      inline_data = inline&.fetch("inlineData", nil) || inline&.fetch("inline_data", nil)
      data = inline_data&.fetch("data", nil)
      image_data = data && Base64.decode64(data)
      mime_type = inline_data&.fetch("mimeType", nil)

      { data: image_data, mime_type:, model: MODEL }
    rescue JSON::ParserError => e
      Rails.logger.error("Gemini image generation parse error: #{e.class}: #{e.message}")
    end
end
