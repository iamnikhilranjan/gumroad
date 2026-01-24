# frozen_string_literal: true

require "spec_helper"

describe CareersController do
  render_views

  describe "GET index" do
    it "renders successfully" do
      get :index

      expect(response).to be_successful
      expect(assigns(:title)).to eq("Careers at Gumroad - Build the road with us")
      expect(assigns(:hide_layouts)).to be(true)
      expect(assigns(:jobs)).to eq(JOBS)
    end
  end

  describe "GET show" do
    it "renders successfully for a valid job slug" do
      get :show, params: { slug: "ai-engineer-team-lead" }

      expect(response).to be_successful
      expect(assigns(:job)[:slug]).to eq("ai-engineer-team-lead")
      expect(assigns(:job)[:title]).to eq("AI Engineer and Team Lead")
      expect(assigns(:title)).to eq("AI Engineer and Team Lead - Gumroad Careers")
      expect(assigns(:hide_layouts)).to be(true)
    end

    it "raises not found for an invalid job slug" do
      expect { get :show, params: { slug: "invalid-job-slug" } }
        .to raise_error(ActionController::RoutingError, "Not Found")
    end
  end
end
