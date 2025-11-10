# frozen_string_literal: true

require "spec_helper"
require "inertia_rails/rspec"

describe Settings::PasswordController, type: :controller, inertia: true do
  render_views

  let(:user) { create(:user, password: "oldpassword123") }

  before do
    sign_in user
  end

  describe "GET show" do
    before do
      get :show
    end

    it "returns successful response with Inertia page data" do
      expect(response).to be_successful
      expect(inertia.component).to eq("Settings/Password")
    end

    it "includes settings pages" do
      expect(inertia.props[:settings_pages]).to be_an(Array)
      expect(inertia.props[:settings_pages]).not_to be_empty
    end

    it "includes password requirement flag" do
      expect(inertia.props[:require_old_password]).to be_in([true, false])
    end

    context "when user signed up with password" do
      it "requires old password" do
        get :show
        expect(inertia.props[:require_old_password]).to be(true)
      end
    end

    context "when user signed up with OAuth" do
      let(:user) { create(:user, provider: "google") }

      it "does not require old password" do
        get :show
        expect(inertia.props[:require_old_password]).to be(false)
      end
    end
  end

  describe "PUT update" do
    let(:params) do
      {
        user: {
          password: "oldpassword123",
          new_password: "newpassword456"
        }
      }
    end

    it "returns successful JSON response" do
      put :update, params:, format: :json

      expect(response).to be_successful
      expect(response.parsed_body["success"]).to be(true)
    end

    it "updates password successfully" do
      put :update, params:, format: :json

      user.reload
      expect(user.valid_password?("newpassword456")).to be(true)
    end

    context "with incorrect old password" do
      let(:params) do
        {
          user: {
            password: "wrongpassword",
            new_password: "newpassword456"
          }
        }
      end

      it "returns error response" do
        put :update, params:, format: :json

        expect(response.parsed_body["success"]).to be(false)
        expect(response.parsed_body["error"]).to include("Incorrect password")
      end

      it "does not change password" do
        put :update, params:, format: :json

        user.reload
        expect(user.valid_password?("oldpassword123")).to be(true)
      end
    end

    context "when user signed up with OAuth" do
      let(:user) { create(:user, provider: "google") }
      let(:params) do
        {
          user: {
            new_password: "newpassword456"
          }
        }
      end

      it "allows setting password without old password" do
        put :update, params:, format: :json

        expect(response).to be_successful
        expect(response.parsed_body["success"]).to be(true)
      end
    end
  end
end
