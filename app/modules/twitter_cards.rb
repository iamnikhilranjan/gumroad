# frozen_string_literal: true

module TwitterCards
  TWITTER_CARD_DOMAIN = "Gumroad"

  module_function

  def twitter_post_card(post)
    # No information from pundit_user is needed to generate the card
    # TODO: use a dedicated presenter for this that encapulates the logic below to build the Hash
    post_presenter = PostPresenter.new(
      pundit_user: SellerContext.logged_out,
      post:,
      purchase_id_param: nil
    )

    post_properties = {
      title: post.name,
      domain: TWITTER_CARD_DOMAIN,
      description: post_presenter.snippet
    }

    image_properties = if post_presenter.social_image.present?
      {
        card: "summary_large_image",
        image: post_presenter.social_image.url,
        'image:alt': post_presenter.social_image.caption
      }
    else
      {
        card: "summary"
      }
    end

    card_properties = post_properties.merge(image_properties)

    card_properties.map do |name, value|
      twitter_meta_tag(name, value)
    end.join("\n") + "\n"
  end

  def twitter_meta_tag(name, value)
    value = value.to_s.html_safe? ? value.to_s : CGI.escapeHTML(value.to_s)
    value = %("#{value}")
    "<meta property=\"twitter:#{name}\" value=#{value} />"
  end
end
