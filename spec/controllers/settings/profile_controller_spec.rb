# frozen_string_literal: true

require "spec_helper"
require "inertia_rails/rspec"

describe Settings::ProfileController, type: :controller, inertia: true do
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
      expect(inertia.component).to eq("Settings/Profile")
    end

    it "includes settings pages" do
      expect(inertia.props[:settings_pages]).to be_an(Array)
      expect(inertia.props[:settings_pages]).not_to be_empty
    end

    it "includes profile settings" do
      expect(inertia.props).to include(
        profile_settings: be_a(Hash)
      )
    end

    it "includes profile data" do
      expect(inertia.props).to include(
        creator_profile: be_a(Hash),
        sections: be_an(Array),
        tabs: be_an(Array)
      )
    end
  end

  describe "PUT update" do
    let(:params) do
      {
        user: {
          name: "New Name"
        }
      }
    end

    it "returns successful JSON response" do
      put :update, params:, format: :json

      expect(response).to be_successful
      expect(response.parsed_body).to have_key("success")
    end

    it "updates user profile" do
      put :update, params:, format: :json

      user.reload
      expect(user.name).to eq("New Name")
    end

    context "when user is not confirmed" do
      let(:user) { create(:user, confirmed_at: nil) }

      it "returns error" do
        put :update, params:, format: :json

        expect(response).to be_successful
        expect(response.parsed_body["success"]).to be(false)
        expect(response.parsed_body["error_message"]).to include("confirm your email")
      end
    end
  end
end
