# frozen_string_literal: true

require "spec_helper"
require "inertia_rails/rspec"

describe Settings::AdvancedController, type: :controller, inertia: true do
  render_views

  let(:user) { create(:user) }

  before do
    sign_in user
  end

  describe "GET show" do
    before do
      get :show
    end

    it "returns successful response with Inertia page data" do
      expect(response).to be_successful
      expect(inertia.component).to eq("Settings/Advanced")
    end

    it "includes settings pages" do
      expect(inertia.props[:settings_pages]).to be_an(Array)
      expect(inertia.props[:settings_pages]).not_to be_empty
    end

    it "includes advanced settings" do
      expect(inertia.props).to include(
        notification_endpoint: be_a(String),
        blocked_customer_emails: be_a(String),
        custom_domain_name: be_a(String),
        applications: be_an(Array)
      )
    end

    it "includes domain information" do
      expect(inertia.props).to include(
        domain: be_a(Hash)
      )
    end
  end

  describe "PUT update" do
    let(:params) do
      {
        user: {
          notification_endpoint: "https://example.com/webhook"
        }
      }
    end

    it "returns successful JSON response" do
      put :update, params:, format: :json

      expect(response).to be_successful
      expect(response.parsed_body["success"]).to be(true)
    end

    it "updates advanced settings" do
      put :update, params:, format: :json

      user.reload
      expect(user.notification_endpoint).to eq("https://example.com/webhook")
    end

    context "with invalid webhook URL" do
      let(:params) do
        {
          user: {
            notification_endpoint: "not-a-valid-url"
          }
        }
      end

      it "returns error for invalid URL" do
        put :update, params:, format: :json

        expect(response.parsed_body["success"]).to be(false)
      end
    end
  end
end
