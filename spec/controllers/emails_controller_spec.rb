# frozen_string_literal: true

require "spec_helper"
require "shared_examples/authorize_called"
require "shared_examples/sellers_base_controller_concern"

describe EmailsController do
  it_behaves_like "inherits from Sellers::BaseController"

  render_views

  let(:seller) { create(:user) }

  include_context "with user signed in as admin for seller"

  describe "GET index" do
    it_behaves_like "authorize called for action", :get, :index do
      let(:record) { Installment }
    end

    it "redirects to the published tab" do
      get :index

      expect(response).to redirect_to("/emails/published")
    end

    it "redirects to the scheduled tab if there are scheduled installments" do
      create(:installment, seller:, ready_to_publish: true)

      get :index

      expect(response).to redirect_to("/emails/scheduled")
    end
  end

  describe "GET published", inertia: true do
    it_behaves_like "authorize called for action", :get, :published do
      let(:record) { Installment }
    end

    it "renders the Published component" do
      get :published
      expect_inertia.to render_component("Emails/Published")
    end
  end

  describe "GET scheduled", inertia: true do
    it_behaves_like "authorize called for action", :get, :scheduled do
      let(:record) { Installment }
    end

    it "renders the Scheduled component" do
      get :scheduled
      expect_inertia.to render_component("Emails/Scheduled")
    end
  end

  describe "GET drafts", inertia: true do
    it_behaves_like "authorize called for action", :get, :drafts do
      let(:record) { Installment }
    end

    it "renders the Drafts component" do
      get :drafts
      expect_inertia.to render_component("Emails/Drafts")
    end
  end

  describe "GET new", inertia: true do
    it_behaves_like "authorize called for action", :get, :new do
      let(:record) { Installment }
    end

    it "renders the EmailForm component" do
      get :new
      expect_inertia.to render_component("EmailsPage/EmailForm")
    end
  end

  describe "GET edit", inertia: true do
    let(:installment) { create(:installment, seller:) }

    it_behaves_like "authorize called for action", :get, :edit do
      let(:params) { { id: installment.id } }
      let(:record) { installment }
    end

    it "renders the EmailForm component" do
      get :edit, params: { id: installment.id }
      expect_inertia.to render_component("EmailsPage/EmailForm")
    end
  end

  describe "POST create" do
    let(:params) { { installment: { name: "New Email", message: "Hello" } } }

    it_behaves_like "authorize called for action", :post, :create do
      let(:params) { super().merge(this_params) }
      let(:record) { Installment }
      let(:this_params) { params }
    end

    it "creates a new installment" do
      expect {
        post :create, params: params
      }.to change(Installment, :count).by(1)
    end

    it "redirects to the edit page" do
      post :create, params: params
      expect(response).to redirect_to(edit_email_path(Installment.last))
    end
  end

  describe "PATCH update" do
    let(:installment) { create(:installment, seller:) }
    let(:params) { { id: installment.id, installment: { name: "Updated Name" } } }

    it_behaves_like "authorize called for action", :patch, :update do
      let(:params) { super().merge(this_params) }
      let(:record) { installment }
      let(:this_params) { params }
    end

    it "updates the installment" do
      patch :update, params: params
      expect(installment.reload.name).to eq("Updated Name")
    end

    it "redirects to the edit page" do
      patch :update, params: params
      expect(response).to redirect_to(edit_email_path(installment))
    end
  end

  describe "DELETE destroy" do
    let!(:installment) { create(:installment, seller:) }

    it_behaves_like "authorize called for action", :delete, :destroy do
      let(:params) { { id: installment.id } }
      let(:record) { installment }
    end

    it "deletes the installment" do
      expect {
        delete :destroy, params: { id: installment.id }
      }.to change(Installment, :count).by(-1)
    end

    it "redirects to the drafts page" do
      delete :destroy, params: { id: installment.id }
      expect(response).to redirect_to(drafts_emails_path)
    end
  end
end
