# frozen_string_literal: true

require "spec_helper"
require "shared_examples/admin_base_controller_concern"

describe Admin::LinksController do
  render_views

  it_behaves_like "inherits from Admin::BaseController"

  let(:admin_user) { create(:admin_user) }
  let(:draft) { true }
  let(:deleted_at) { nil }
  let(:purchase_disabled_at) { Time.current }
  let(:product) { create(:product, draft:, deleted_at:, purchase_disabled_at:) }

  before do
    sign_in admin_user
  end

  describe "POST restore" do
    let(:deleted_at) { Time.current }

    before do
      post :restore, params: { id: product.unique_permalink }
      product.reload
    end

    it "restores the product" do
      expect(product.deleted_at?).to be(false)
      expect(JSON.parse(response.body)).to eq({ "success" => true })
    end
  end
end
