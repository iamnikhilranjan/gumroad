# frozen_string_literal: true

require "spec_helper"
require "inertia_rails/rspec"

describe Settings::PaymentsController, type: :controller, inertia: true do
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
      expect(inertia.component).to eq("Settings/Payments")
    end

    it "includes settings pages" do
      expect(inertia.props[:settings_pages]).to be_an(Array)
      expect(inertia.props[:settings_pages]).not_to be_empty
    end

    it "includes payment configuration" do
      expect(inertia.props).to include(
        countries: be_a(Hash),
        bank_account_details: be_a(Hash),
        stripe_connect: be_a(Hash),
        paypal_connect: be_a(Hash),
        fee_info: be_a(Hash)
      )
    end

    it "includes user payment details" do
      expect(inertia.props[:user]).to be_a(Hash)
      expect(inertia.props[:user]).to have_key(:country_supports_native_payouts)
      expect(inertia.props[:user]).to have_key(:payout_currency)
    end

    it "includes compliance information" do
      expect(inertia.props).to include(
        compliance_info: be_a(Hash)
      )
    end

    it "includes payout settings" do
      expect(inertia.props).to include(
        payout_threshold_cents: be_an(Integer),
        payout_frequency: be_a(String)
      )
    end
  end
end
