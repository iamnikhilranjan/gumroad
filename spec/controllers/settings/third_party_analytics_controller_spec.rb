# frozen_string_literal: true

require "spec_helper"
require "inertia_rails/rspec"

describe Settings::ThirdPartyAnalyticsController, type: :controller, inertia: true do
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
      expect(inertia.component).to eq("Settings/ThirdPartyAnalytics")
    end

    it "includes settings pages" do
      expect(inertia.props[:settings_pages]).to be_an(Array)
      expect(inertia.props[:settings_pages]).not_to be_empty
    end

    it "includes third party analytics configuration" do
      expect(inertia.props).to include(
        third_party_analytics: be_a(Hash),
        products: be_an(Array)
      )
    end

    it "includes analytics settings" do
      expect(inertia.props[:third_party_analytics]).to include(
        disable_third_party_analytics: be_in([true, false]),
        google_analytics_id: be_a(String),
        facebook_pixel_id: be_a(String),
        snippets: be_an(Array)
      )
    end

    context "when user has products" do
      let!(:product) { create(:product, user:) }

      it "includes products for analytics configuration" do
        get :show
        expect(inertia.props[:products]).not_to be_empty
      end
    end
  end

  describe "PUT update" do
    let(:params) do
      {
        user: {
          disable_third_party_analytics: false,
          snippets: []
        }
      }
    end

    it "returns successful JSON response" do
      put :update, params:, format: :json

      expect(response).to be_successful
      expect(response.parsed_body).to have_key("success")
    end

    it "updates analytics settings" do
      put :update, params: { user: { disable_third_party_analytics: true } }, format: :json

      user.reload
      expect(user.disable_third_party_analytics).to be(true)
    end

    context "with Google Analytics ID" do
      let(:params) do
        {
          user: {
            google_analytics_id: "G-12345678"
          }
        }
      end

      it "updates Google Analytics ID" do
        put :update, params:, format: :json

        user.reload
        expect(user.google_analytics_id).to eq("G-12345678")
      end
    end
  end
end
