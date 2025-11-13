# frozen_string_literal: true

require "spec_helper"
require "inertia_rails/rspec"

describe Settings::MainController, type: :controller, inertia: true do
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
      expect(inertia.component).to eq("Settings/Main")
    end

    it "includes settings pages" do
      expect(inertia.props[:settings_pages]).to be_an(Array)
      expect(inertia.props[:settings_pages]).not_to be_empty
    end

    it "includes user account information" do
      expect(inertia.props[:user]).to be_a(Hash)
      expect(inertia.props[:user]).to include(
        email: user.form_email,
        timezone: user.timezone,
        currency_type: user.currency_type
      )
      expect(inertia.props[:user]).to have_key(:seller_refund_policy)
    end

    it "includes notification settings" do
      expect(inertia.props[:user]).to include(
        enable_payment_email: be_in([true, false]),
        enable_payment_push_notification: be_in([true, false]),
        enable_recurring_subscription_charge_email: be_in([true, false])
      )
    end

    it "includes purchasing power parity settings" do
      expect(inertia.props[:user]).to include(
        purchasing_power_parity_enabled: be_in([true, false])
      )
      expect(inertia.props[:user][:purchasing_power_parity_limit]).to(
        be_nil.or be_a(Numeric)
      )
    end

    it "includes product level support emails" do
      expect(inertia.props[:user]).to have_key(:product_level_support_emails)
      expect(inertia.props[:user][:product_level_support_emails]).to(
        be_nil.or be_an(Array)
      )
    end

    it "includes timezones and currencies data" do
      expect(inertia.props).to include(
        timezones: be_an(Array),
        currencies: be_an(Array)
      )
    end
  end

  describe "PUT update" do
    let(:params) do
      {
        user: {
          email: user.email,
          enable_payment_email: !user.enable_payment_email,
          purchasing_power_parity_excluded_product_ids: [],
          product_level_support_emails: []
        }
      }
    end

    it "returns successful JSON response" do
      put :update, params:, format: :json

        expect(response).to be_successful
      expect(response.parsed_body).to have_key("success")
    end

    it "updates user settings" do
      new_value = !user.enable_payment_email

      put :update, params:, format: :json

      user.reload
      expect(user.enable_payment_email).to eq(new_value)
    end
  end

  describe "POST resend_confirmation_email" do
    context "when user has unconfirmed email" do
      let(:user) { create(:user, unconfirmed_email: "pending@example.com") }

      it "resends confirmation email and returns success" do
        post :resend_confirmation_email, format: :json

        expect(response).to be_successful
        expect(response.parsed_body["success"]).to be(true)
      end
    end

    context "when user is already confirmed and has no pending email" do
      it "returns failure" do
        post :resend_confirmation_email, format: :json

        expect(response).to be_successful
        expect(response.parsed_body["success"]).to be(false)
      end
    end
  end
end
