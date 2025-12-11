# frozen_string_literal: true

require "spec_helper"
require "shared_examples/sellers_base_controller_concern"
require "inertia_rails/rspec"

describe Collaborators::IncomingsController, inertia: true do
  it_behaves_like "inherits from Sellers::BaseController"

  let(:seller) { create(:user) }

  describe "GET index" do
    before do
      sign_in seller
    end

    it "renders the incomings index template with props" do
      get :index
      expect(response).to be_successful
      expect(inertia.component).to eq("Collaborators/Incomings/Index")
      expect(inertia.props).to include(:collaborators, :collaborators_disabled_reason)
    end

    context "with incoming collaborators" do
      let(:other_seller) { create(:user) }
      let!(:collaborator) { create(:collaborator, seller: other_seller, affiliate_user: seller) }

      it "includes the incoming collaborator in props" do
        get :index
        expect(response).to be_successful
        expect(inertia.props[:collaborators]).to be_an(Array)
      end
    end
  end
end
