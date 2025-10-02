# frozen_string_literal: true

require "spec_helper"
require "shared_examples/admin_base_controller_concern"

describe Admin::Compliance::CardsController do
  it_behaves_like "inherits from Admin::BaseController"

  before do
    @admin_user = create(:admin_user)
    sign_in @admin_user
  end

  describe "GET index" do
    let(:card_type) { "other" }
    let(:limit) { 10 }
    let(:transaction_date) { "02/22/2022" }

    before do
      stub_const("Admin::Compliance::CardsController::MAX_RESULT_LIMIT", limit)
      @purchase_visa = create(:purchase,
                              card_type: "visa",
                              card_visual: "**** **** **** 1234",
                              created_at: Time.zone.local(2019, 1, 17, 1, 2, 3),
                              price_cents: 777,
                              card_expiry_year: 2022,
                              card_expiry_month: 10)
    end

    after do
      expect(response).to be_successful
    end

    it "assigns purchases to instance variable" do
      expect_any_instance_of(AdminSearchService).to receive(:search_purchases).with(card_type:, transaction_date: "2022-02-22", limit:).and_return(Purchase.none)
      get :index, params: { card_type:, transaction_date: }

      expect(assigns(:purchases)).to eq([])
    end

    context "when transaction_date is invalid" do
      let(:transaction_date) { "02/22" }

      it "shows error flash message and no purchases" do
        expect_any_instance_of(AdminSearchService).to_not receive(:search_purchases)
        get :index, params: { card_type:, transaction_date: "12/31" }

        assert_response :success
        expect(flash[:alert]).to eq("Please enter the date using the MM/DD/YYYY format.")
        expect(assigns(:purchases)).to eq([])
      end
    end

    context "when there is no results" do
      it "assigns empty arrays to instance variables" do
        expect_any_instance_of(AdminSearchService).to receive(:search_purchases).with(card_type:, limit:).and_return(Purchase.none)
        get :index, params: { card_type: }

        assert_response :success
        expect(assigns(:purchases)).to eq([])
      end
    end

    context "when a purchase is found" do
      it "assigns purchases to instance variable" do
        card_type = "visa"
        expect_any_instance_of(AdminSearchService).to receive(:search_purchases).with(card_type:, limit:).and_return([@purchase_visa])
        get :index, params: { card_type: }

        expect(assigns(:purchases)).to eq([@purchase_visa])
      end
    end
  end

  describe "POST refund" do
    context "when stripe_fingerprint is blank" do
      it "returns an error" do
        post :refund
        expect(response.parsed_body["success"]).to eq(false)
      end
    end

    context "when stripe_fingerprint is not blank" do
      let(:stripe_fingerprint) { "FakeFingerprint" }
      let!(:successful_purchase) { create(:purchase, stripe_fingerprint:, purchase_state: "successful") }
      let!(:failed_purchase) { create(:purchase, stripe_fingerprint:, purchase_state: "failed") }
      let!(:disputed_purchase) { create(:purchase, stripe_fingerprint:, chargeback_date: Time.current) }
      let!(:refunded_purchase) { create(:refunded_purchase, stripe_fingerprint:) }

      it "enqueues jobs" do
        post :refund, params: { stripe_fingerprint: }

        expect(RefundPurchaseWorker).to have_enqueued_sidekiq_job(successful_purchase.id, @admin_user.id, Refund::FRAUD)
        expect(RefundPurchaseWorker).to_not have_enqueued_sidekiq_job(failed_purchase.id, @admin_user.id, Refund::FRAUD)
        expect(RefundPurchaseWorker).to_not have_enqueued_sidekiq_job(disputed_purchase.id, @admin_user.id, Refund::FRAUD)
        expect(RefundPurchaseWorker).to_not have_enqueued_sidekiq_job(refunded_purchase.id, @admin_user.id, Refund::FRAUD)

        expect(response.parsed_body["success"]).to eq(true)
      end
    end
  end
end
