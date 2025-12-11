# frozen_string_literal: true

class Collaborators::IncomingsController < Sellers::BaseController
  layout "inertia"

  def index
    authorize Collaborator

    render inertia: "Collaborators/Incomings/Index", props: {
      collaborators: -> { incoming_collaborators_props },
      collaborators_disabled_reason:,
    }
  end

  private
    def set_title
      @title = "Collaborators"
    end

    def collaborators_disabled_reason
      current_seller.has_brazilian_stripe_connect_account? ? "Collaborators with Brazilian Stripe accounts are not supported." : nil
    end

    def incoming_collaborators_props
      scoped_incoming_collaborators.map do |collaborator|
        {
          id: collaborator.external_id,
          seller_email: collaborator.seller.email,
          seller_name: collaborator.seller.display_name(prefer_email_over_default_username: true),
          seller_avatar_url: collaborator.seller.avatar_url,
          apply_to_all_products: collaborator.apply_to_all_products,
          affiliate_percentage: collaborator.affiliate_percentage,
          dont_show_as_co_creator: collaborator.dont_show_as_co_creator,
          invitation_accepted: collaborator.invitation_accepted?,
          products: collaborator.product_affiliates.map do |product_affiliate|
            {
              id: product_affiliate.product.external_id,
              url: product_affiliate.product.long_url,
              name: product_affiliate.product.name,
              affiliate_percentage: product_affiliate.affiliate_percentage,
              dont_show_as_co_creator: product_affiliate.dont_show_as_co_creator,
            }
          end
        }
      end
    end

    def scoped_incoming_collaborators
      Collaborator
        .alive
        .where(affiliate_user: current_seller)
        .includes(
          :collaborator_invitation,
          :seller,
          product_affiliates: :product
        )
    end
end
