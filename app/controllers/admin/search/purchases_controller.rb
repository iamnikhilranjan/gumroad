# fron

class Admin::Search::PurchasesController < Admin::Search::BaseController
  include Pagy::Backend

  layout "admin_inertia"

  head_title "Purchase results"

  def index
    pagination, purchases = pagy(
      AdminSearchService.new.search_purchases(
        query: params[:query].to_s.strip,
        product_title_query: params[:product_title_query].to_s.strip,
        purchase_status: params[:purchase_status],
      ),
      limit: params[:per_page] || RECORDS_PER_PAGE,
      page: params[:page]
    )

    if purchases.one? && params[:page].blank?
      redirect_to admin_purchase_path(purchases.first)
    else
      render inertia: 'Admin/Search/Purchases/Index',
             props: inertia_props(
               purchases: purchases.includes(
                 :price,
                 :purchase_refund_policy,
                 :seller,
                 :subscription,
                 :variant_attributes,
                 link: [:product_refund_policy, :user]
               ).as_json(admin: true),
               pagination:,
               query: params[:query],
               product_title_query: params[:product_title_query],
               purchase_status: params[:purchase_status]
            )
    end
  end
end
