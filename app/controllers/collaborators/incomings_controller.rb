# frozen_string_literal: true

class Collaborators::IncomingsController < Collaborators::BaseController
  skip_before_action :authorize_user, only: [:accept, :decline]
  prepend_before_action :set_collaborator, only: [:accept, :decline, :destroy]
  before_action :set_invitation!, only: [:accept, :decline]

  def index
    render_incomings_index_props
  end

  def accept
    authorize @invitation, :accept?

    @invitation.accept!

    flash[:notice] = "Invitation accepted"
    render_incomings_index_props
  end

  def decline
    authorize @invitation, :decline?

    @invitation.decline!

    flash[:notice] = "Invitation declined"
    render_incomings_index_props
  end

  def destroy
    super do
      flash[:notice] = "Collaborator removed"
      render_incomings_index_props
    end
  end

  private
    def set_invitation!
      raise ActiveRecord::RecordNotFound unless @collaborator.present?
      @invitation = @collaborator.collaborator_invitation || e404
    end

    def render_incomings_index_props
      @title = "Collaborations"
      render inertia: "Collaborators/Incoming/Index", props: IncomingCollaboratorsPresenter.new(seller: current_seller).index_props
    end
end
