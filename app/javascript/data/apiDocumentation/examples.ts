// API method examples - curl commands and responses

export const CURL_EXAMPLES = {
  get_products: `curl https://api.gumroad.com/v2/products \\
  -d "access_token=ACCESS_TOKEN" \\
  -X GET`,

  get_product: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA== \\
  -d "access_token=ACCESS_TOKEN" \\
  -X GET`,

  delete_product: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA== \\
  -d "access_token=ACCESS_TOKEN" \\
  -X DELETE`,

  enable_product: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/enable \\
  -d "access_token=ACCESS_TOKEN" \\
  -X PUT`,

  disable_product: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/disable \\
  -d "access_token=ACCESS_TOKEN" \\
  -X PUT`,

  create_variant_category: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "title=colors" \\
  -X POST`,

  get_variant_category: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories/mN7CdHiwHaR9FlxKvF-n-g== \\
  -d "access_token=ACCESS_TOKEN" \\
  -X GET`,

  update_variant_category: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories/mN7CdHiwHaR9FlxKvF-n-g== \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "title=sizes" \\
  -X PUT`,

  delete_variant_category: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories/mN7CdHiwHaR9FlxKvF-n-g== \\
  -d "access_token=ACCESS_TOKEN" \\
  -X DELETE`,

  get_variant_categories: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories \\
  -d "access_token=ACCESS_TOKEN" \\
  -X GET`,

  create_variant: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories/mN7CdHiwHaR9FlxKvF-n-g==/variants \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "name=red" \\
  -d "price_difference_cents=250"`,

  get_variant: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories/mN7CdHiwHaR9FlxKvF-n-g==/variants/kuaXCPHTmRuoK13rNGVbxg== \\
  -d "access_token=ACCESS_TOKEN" \\
  -X GET`,

  update_variant: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories/mN7CdHiwHaR9FlxKvF-n-g==/variants/kuaXCPHTmRuoK13rNGVbxg== \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "price_difference_cents=150" \\
  -X PUT`,

  delete_variant: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories/mN7CdHiwHaR9FlxKvF-n-g==/variants/kuaXCPHTmRuoK13rNGVbxg== \\
  -d "access_token=ACCESS_TOKEN" \\
  -X DELETE`,

  get_variants: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories/mN7CdHiwHaR9FlxKvF-n-g==/variants \\
  -d "access_token=ACCESS_TOKEN" \\
  -X GET`,

  create_offer_code: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/offer_codes \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "name=1OFF" \\
  -d "amount_off=100" \\
  -d "offer_type=cents" \\
  -X POST`,

  get_offer_code: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/offer_codes/bfi_30HLgGWL8H2wo_Gzlg== \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "name=1OFF" \\
  -d "amount_cents=100" \\
  -X GET`,

  update_offer_code: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/offer_codes/bfi_30HLgGWL8H2wo_Gzlg== \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "max_purchase_count=10" \\
  -X PUT`,

  delete_offer_code: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/offer_codes/bfi_30HLgGWL8H2wo_Gzlg== \\
  -d "access_token=ACCESS_TOKEN" \\
  -X DELETE`,

  get_offer_codes: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/offer_codes \\
  -d "access_token=ACCESS_TOKEN" \\
  -X GET`,

  create_custom_field: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/custom_fields \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "name=phone number" \\
  -d "required=true" \\
  -X POST`,

  update_custom_field: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/custom_fields/phone%20number \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "required=false" \\
  -d "name=phone number" \\
  -X PUT`,

  delete_custom_field: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/custom_fields/phone%20number \\
  -d "access_token=ACCESS_TOKEN" \\
  -X DELETE`,

  get_custom_fields: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/custom_fields \\
  -d "access_token=ACCESS_TOKEN" \\
  -X GET`,

  get_user: `curl https://api.gumroad.com/v2/user \\
  -d "access_token=ACCESS_TOKEN" \\
  -X GET`,

  create_resource_subscription: `curl https://api.gumroad.com/v2/resource_subscriptions \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "resource_name=sale" \\
  -d "post_url=https://postatmebro.com" \\
  -X PUT`,

  delete_resource_subscription: `curl https://api.gumroad.com/v2/resource_subscriptions/G_-mnBf9b1j9A7a4ub4nFQ== \\
  -d "access_token=ACCESS_TOKEN" \\
  -X DELETE`,

  get_resource_subscriptions: `curl https://api.gumroad.com/v2/resource_subscriptions \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "resource_name=sale" \\
  -X GET`,

  get_sales: `curl https://api.gumroad.com/v2/sales \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "before=2021-09-03" \\
  -d "after=2020-09-03" \\
  -d "product_id=bfi_30HLgGWL8H2wo_Gzlg==" \\
  -d "email=calvin@gumroad.com" \\
  -X GET`,

  get_sale: `curl https://api.gumroad.com/v2/sales/FO8TXN-dvxYabdavG97Y-Q== \\
  -d "access_token=ACCESS_TOKEN" \\
  -X GET`,

  mark_sale_as_shipped: `curl https://api.gumroad.com/v2/sales/A-m3CDDC5dlrSdKZp0RFhA==/mark_as_shipped \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "tracking_url=https://www.shippingcompany.com/track/t123" \\
  -X PUT`,

  refund_sale: `curl https://api.gumroad.com/v2/sales/A-m3CDDC5dlrSdKZp0RFhA==/refund \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "amount_cents=200" \\
  -X PUT`,

  resend_receipt: `curl https://api.gumroad.com/v2/sales/A-m3CDDC5dlrSdKZp0RFhA==/resend_receipt \\
  -d "access_token=ACCESS_TOKEN" \\
  -X POST`,

  get_subscribers: `curl https://api.gumroad.com/v2/products/0ssD7adjRklGBjS5cwlWPq==/subscribers \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "paginated=true" \\
  -d "email=calvin@gumroad.com" \\
  -X GET`,

  get_subscriber: `curl https://api.gumroad.com/v2/subscribers/A-m3CDDC5dlrSdKZp0RFhA== \\
  -d "access_token=ACCESS_TOKEN" \\
  -X GET`,

  verify_license: `curl https://api.gumroad.com/v2/licenses/verify \\
  -d "product_id=32-nPAicqbLj8B_WswVlMw==" \\
  -d "license_key=A1B2C3D4-E5F60718-9ABCDEF0-1234ABCD" \\
  -X POST`,

  enable_license: `curl https://api.gumroad.com/v2/licenses/enable \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "product_id=32-nPAicqbLj8B_WswVlMw==" \\
  -d "license_key=A1B2C3D4-E5F60718-9ABCDEF0-1234ABCD" \\
  -X PUT`,

  disable_license: `curl https://api.gumroad.com/v2/licenses/disable \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "product_id=32-nPAicqbLj8B_WswVlMw==" \\
  -d "license_key=A1B2C3D4-E5F60718-9ABCDEF0-1234ABCD" \\
  -X PUT`,

  decrement_uses_count: `curl https://api.gumroad.com/v2/licenses/decrement_uses_count \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "product_id=32-nPAicqbLj8B_WswVlMw==" \\
  -d "license_key=A1B2C3D4-E5F60718-9ABCDEF0-1234ABCD" \\
  -X PUT`,

  rotate_license: `curl https://api.gumroad.com/v2/licenses/rotate \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "product_id=32-nPAicqbLj8B_WswVlMw==" \\
  -d "license_key=A1B2C3D4-E5F60718-9ABCDEF0-1234ABCD" \\
  -X PUT`,

  get_payouts: `curl https://api.gumroad.com/v2/payouts \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "before=2021-09-03" \\
  -d "after=2020-09-03" \\
  -X GET`,

  get_payout: `curl https://api.gumroad.com/v2/payouts/A-m3CDDC5dlrSdKZp0RFhA== \\
  -d "access_token=ACCESS_TOKEN" \\
  -X GET`,
} as const;

export const RESPONSE_EXAMPLES = {
  products: `{
  "success": true,
  "products": [{
    "custom_permalink": null,
    "custom_receipt": null,
    "custom_summary": "You'll get one PSD file.",
    "custom_fields": [],
    "customizable_price": null,
    "description": "I made this for fun.",
    "deleted": false,
    "max_purchase_count": null,
    "name": "Pencil Icon PSD",
    "preview_url": null,
    "require_shipping": false,
    "subscription_duration": null,
    "published": true,
    "url": "http://sahillavingia.com/pencil.psd",
    "id": "A-m3CDDC5dlrSdKZp0RFhA==",
    "price": 100,
    "purchasing_power_parity_prices": {
      "US": 100,
      "IN": 50,
      "EC": 25
    },
    "currency": "usd",
    "short_url": "https://sahil.gumroad.com/l/pencil",
    "thumbnail_url": "https://public-files.gumroad.com/variants/...",
    "tags": ["pencil", "icon"],
    "formatted_price": "$1",
    "file_info": {},
    "sales_count": "0",
    "sales_usd_cents": "0",
    "is_tiered_membership": true,
    "recurrences": ["monthly"],
    "variants": [
      {
        "title": "Tier",
        "options": [
          {
            "name": "First Tier",
            "price_difference": 0,
            "purchasing_power_parity_prices": {
              "US": 200,
              "IN": 100,
              "EC": 50
            },
            "is_pay_what_you_want": false,
            "recurrence_prices": {
              "monthly": {
                "price_cents": 300,
                "suggested_price_cents": null,
                "purchasing_power_parity_prices": {
                  "US": 400,
                  "IN": 200,
                  "EC": 100
                }
              }
            }
          }
        ]
      }
    ]
  }]
}`,

  product: `{
  "success": true,
  "product": {
    "custom_permalink": null,
    "custom_receipt": null,
    "custom_summary": "You'll get one PSD file.",
    "custom_fields": [],
    "customizable_price": null,
    "description": "I made this for fun.",
    "deleted": false,
    "max_purchase_count": null,
    "name": "Pencil Icon PSD",
    "preview_url": null,
    "require_shipping": false,
    "subscription_duration": null,
    "published": true,
    "url": "http://sahillavingia.com/pencil.psd",
    "id": "A-m3CDDC5dlrSdKZp0RFhA==",
    "price": 100,
    "purchasing_power_parity_prices": {
      "US": 100,
      "IN": 50,
      "EC": 25
    },
    "currency": "usd",
    "short_url": "https://sahil.gumroad.com/l/pencil",
    "thumbnail_url": "https://public-files.gumroad.com/variants/...",
    "tags": ["pencil", "icon"],
    "formatted_price": "$1",
    "file_info": {},
    "sales_count": "0",
    "sales_usd_cents": "0"
  }
}`,

  product_deleted: `{
  "success": true,
  "message": "The product has been deleted successfully."
}`,

  disabled_product: `{
  "success": true,
  "product": {
    "id": "A-m3CDDC5dlrSdKZp0RFhA==",
    "name": "Pencil Icon PSD",
    "published": false
  }
}`,

  variant_category: `{
  "success": true,
  "variant_category": {
    "id": "mN7CdHiwHaR9FlxKvF-n-g==",
    "title": "colors"
  }
}`,

  variant_category_deleted: `{
  "success": true,
  "message": "The variant_category has been deleted successfully."
}`,

  variant_categories: `{
  "success": true,
  "variant_categories": [{
    "id": "mN7CdHiwHaR9FlxKvF-n-g==",
    "title": "colors"
  }, {...}, {...}]
}`,

  variant: `{
  "success": true,
  "variant": {
    "id": "l5C1XQfr2TG3WXcGY7YrUg==",
    "max_purchase_count": null,
    "name": "red",
    "price_difference_cents": 100
  }
}`,

  variant_deleted: `{
  "success": true,
  "message": "The variant has been deleted successfully."
}`,

  variants: `{
  "success": true,
  "variants": [{
    "id": "l5C1XQfr2TG3WXcGY7YrUg==",
    "max_purchase_count": null,
    "name": "red",
    "price_difference_cents": 100
  }, {...}, {...}]
}`,

  offer_code: `{
  "success": true,
  "offer_code": {
    "id": "mN7CdHiwHaR9FlxKvF-n-g==",
    "name": "1OFF",
    "amount_cents": 100,
    "max_purchase_count": null,
    "times_used": 1
  }
}`,

  update_offer_code: `{
  "success": true,
  "offer_code": {
    "id": "mN7CdHiwHaR9FlxKvF-n-g==",
    "name": "1OFF",
    "amount_cents": 100,
    "max_purchase_count": 10,
    "universal": false
  }
}`,

  offer_code_deleted: `{
  "success": true,
  "message": "The offer_code has been deleted successfully."
}`,

  offer_codes: `{
  "success": true,
  "offer_codes": [{
    "id": "mN7CdHiwHaR9FlxKvF-n-g==",
    "name": "1OFF",
    "amount_cents": 100,
    "max_purchase_count": null,
    "universal": false,
    "times_used": 1
  }, {
    "id": "l5C1XQfr2TG3WXcGY7-r-g==",
    "name": "HALFOFF",
    "percent_off": 50,
    "max_purchase_count": null,
    "universal": false,
    "times_used": 1
  }, {...}, {...}]
}`,

  custom_field: `{
  "success": true,
  "custom_field": {
    "name": "phone number",
    "required": "false"
  }
}`,

  custom_field_deleted: `{
  "success": true,
  "message": "The custom_field has been deleted successfully."
}`,

  custom_fields: `{
  "success": true,
  "custom_fields": [{
    "name": "phone number",
    "required": "false"
  }, {...}, {...}]
}`,

  user: `{
  "success": true,
  "user": {
    "bio": "a sailor, a tailor",
    "name": "John Smith",
    "twitter_handle": null,
    "user_id": "G_-mnBf9b1j9A7a4ub4nFQ==",
    "email": "johnsmith@gumroad.com",
    "url": "https://gumroad.com/sailorjohn"
  }
}`,

  resource_subscription: `{
  "success": true,
  "resource_subscription": {
    "id": "G_-mnBf9b1j9A7a4ub4nFQ==",
    "resource_name": "sale",
    "post_url": "https://postatmebro.com"
  }
}`,

  resource_subscription_deleted: `{
  "success": true,
  "message": "Resource subscription deleted"
}`,

  resource_subscriptions: `{
  "success": true,
  "resource_subscriptions": [{
    "id": "G_-mnBf9b1j9A7a4ub4nFQ==",
    "resource_name": "sale",
    "post_url": "https://postatmebro.com"
  }, {...}, {...}]
}`,

  sales: `{
  "success": true,
  "next_page_url": "/v2/sales?page_key=20230119081040000000-123456&before=2021-09-03&after=2020-09-03&email=calvin%40gumroad.com",
  "next_page_key": "20230119081040000000-123456",
  "sales": [
    {
      "id": "B28UKN-dvxYabdavG97Y-Q==",
      "email": "calvin@gumroad.com",
      "seller_id": "kL0paVL2SdmJSYsNs-OCMg==",
      "timestamp": "about 2 months ago",
      "daystamp": " 5 Jan 2021 11:38 AM",
      "created_at": "2021-01-05T19:38:56Z",
      "product_name": "Pencil Icon PSD",
      "product_has_variants": true,
      "price": 1000,
      "gumroad_fee": 60,
      "subscription_duration": "monthly",
      "formatted_display_price": "$10 a month",
      "formatted_total_price": "$10 a month",
      "currency_symbol": "$",
      "amount_refundable_in_currency": "0",
      "product_id": "32-nPainqpLj1B_WIwVlMw==",
      "product_permalink": "XCBbJ",
      "partially_refunded": false,
      "chargedback": false,
      "purchase_email": "calvin@gumroad.com",
      "zip_code": "625003",
      "paid": false,
      "has_variants": true,
      "variants": {
        "Tier": "Premium"
      },
      "variants_and_quantity": "(Premium)",
      "has_custom_fields": true,
      "custom_fields": {"Twitter handle": "@gumroad"},
      "order_id": 524459995,
      "is_product_physical": false,
      "purchaser_id": "5530311507811",
      "is_recurring_billing": true,
      "can_contact": true,
      "is_following": false,
      "disputed": false,
      "dispute_won": false,
      "is_additional_contribution": false,
      "discover_fee_charged": false,
      "is_gift_sender_purchase": false,
      "is_gift_receiver_purchase": false,
      "referrer": "https://www.facebook.com",
      "card": {
        "visual": null,
        "type": null
      },
      "product_rating": null,
      "reviews_count": 0,
      "average_rating": 0,
      "subscription_id": "GazW4_NBcQy-o7Gjjng7lw==",
      "cancelled": false,
      "ended": false,
      "recurring_charge": false,
      "license_key": "83DB262A-C19D3B06-A5235A6B-8C079166",
      "license_id": "bEtKQ3Zu9SgNopem0-ZywA==",
      "license_disabled": false,
      "affiliate": {
        "email": "affiliate@example.com",
        "amount": "$2.50"
      },
      "quantity": 1
    }, {...}, {...}
  ]
}`,

  sale: `{
  "success": true,
  "sale": {
    "id": "FO8TXN-dvxYabdavG97Y-Q==",
    "email": "calvin@gumroad.com",
    "seller_id": "kL0paVL2SdmJSYsNs-OCMg==",
    "timestamp": "about 2 months ago",
    "daystamp": " 5 Jan 2021 11:38 AM",
    "created_at": "2021-01-05T19:38:56Z",
    "product_name": "Pencil Icon PSD",
    "product_has_variants": true,
    "price": 1000,
    "gumroad_fee": 60,
    "subscription_duration": "monthly",
    "formatted_display_price": "$10 a month",
    "formatted_total_price": "$10 a month",
    "currency_symbol": "$",
    "amount_refundable_in_currency": "0",
    "product_id": "32-nPainqpLj1B_WIwVlMw==",
    "product_permalink": "XCBbJ",
    "partially_refunded": false,
    "chargedback": false,
    "purchase_email": "calvin@gumroad.com",
    "zip_code": "625003",
    "paid": false,
    "has_variants": true,
    "variants": {
      "Tier": "Premium"
    },
    "variants_and_quantity": "(Premium)",
    "has_custom_fields": false,
    "custom_fields": {},
    "order_id": 524459995,
    "is_product_physical": false,
    "purchaser_id": "5530311507811",
    "is_recurring_billing": true,
    "can_contact": true,
    "is_following": false,
    "disputed": false,
    "dispute_won": false,
    "is_additional_contribution": false,
    "discover_fee_charged": false,
    "is_gift_sender_purchase": false,
    "is_gift_receiver_purchase": false,
    "referrer": "direct",
    "card": {
      "visual": null,
      "type": null
    },
    "product_rating": null,
    "reviews_count": 0,
    "average_rating": 0,
    "subscription_id": "GazW4_NBcQy-o7Gjjng7lw==",
    "cancelled": false,
    "ended": false,
    "recurring_charge": false,
    "license_key": "83DB262A-C19D3B06-A5235A6B-8C079166",
    "license_id": "bEtKQ3Zu9SgNopem0-ZywA==",
    "license_disabled": false,
    "affiliate": {
      "email": "affiliate@example.com",
      "amount": "$2.50"
    },
    "offer_code": {
      "name": "FLAT50",
      "displayed_amount_off": "50%"
    },
    "quantity": 1
  }
}`,

  sale_shipped: `{
  "success": true,
  "sale": {
    "id": "A-m3CDDC5dlrSdKZp0RFhA==",
    "email": "calvin@gumroad.com",
    "seller_id": "RkCCaDkPPciPd9155vcaJg==",
    "timestamp": "about 1 month ago",
    "daystamp": "23 Jan 2021 12:23 PM",
    "created_at": "2021-01-23T20:23:21Z",
    "product_name": "classic physical product",
    "product_has_variants": true,
    "price": 2200,
    "gumroad_fee": 217,
    "formatted_display_price": "$22",
    "formatted_total_price": "$22",
    "currency_symbol": "$",
    "amount_refundable_in_currency": "22",
    "product_id": "CCQadnagaqfmKxdHaG5AKQ==",
    "product_permalink": "KHc",
    "refunded": false,
    "partially_refunded": false,
    "chargedback": false,
    "purchase_email": "calvin@gumroad.com",
    "full_name": "Sample Name",
    "street_address": "Sample street",
    "city": "New York",
    "state": "NY",
    "zip_code": "10001",
    "country": "United States",
    "country_iso2": "US",
    "paid": true,
    "has_variants": true,
    "variants": {
      "Format": "Premium"
    },
    "variants_and_quantity": "(Premium)",
    "has_custom_fields": false,
    "custom_fields": {},
    "order_id": 292372715,
    "is_product_physical": true,
    "purchaser_id": "6225273416381",
    "is_recurring_billing": false,
    "can_contact": true,
    "is_following": false,
    "disputed": false,
    "dispute_won": false,
    "is_additional_contribution": false,
    "discover_fee_charged": false,
    "is_gift_sender_purchase": false,
    "is_gift_receiver_purchase": false,
    "referrer": "direct",
    "card": {
      "visual": "**** **** **** 4242",
      "type": "visa"
    },
    "product_rating": null,
    "reviews_count": 0,
    "average_rating": 0,
    "shipped": true,
    "tracking_url": "https://www.shippingcompany.com/track/t123",
    "license_key": "740A36FE-80134D88-9998290C-1B30910C",
    "license_id": "mN7CdHiwHaR9FlxKvF-n-g==",
    "license_disabled": false,
    "sku_id": "6Oo2MGSSagZU5naeWaDaNQ==",
    "sku_external_id": "6Oo2MGSS1gaU5a5eWaDaNQ==",
    "affiliate": {
      "email": "affiliate@example.com",
      "amount": "$2.50"
    },
    "quantity": 1
  }
}`,

  sale_refunded: `{
  "success": true,
  "sale": {
    "id": "A-m3CDDC5dlrSdKZp0RFhA==",
    "email": "calvin@gumroad.com",
    "seller_id": "RkCCODaPPciPd9155vcQJg==",
    "timestamp": "about 1 month ago",
    "daystamp": "23 Jan 2021 10:24 AM",
    "created_at": "2021-01-23T18:24:07Z",
    "product_name": "Pencil Icon PSD",
    "product_has_variants": false,
    "price": 1000,
    "gumroad_fee": 115,
    "formatted_display_price": "$10",
    "formatted_total_price": "$10",
    "currency_symbol": "$",
    "amount_refundable_in_currency": "8",
    "product_id": "e7xqFa2WL0E-qJlQ4WYJxA==",
    "product_permalink": "RSE",
    "refunded": false,
    "partially_refunded": true,
    "chargedback": false,
    "purchase_email": "calvin@gumroad.com",
    "street_address": "",
    "city": "",
    "state": "AA",
    "zip_code": "67600",
    "paid": true,
    "has_variants": false,
    "variants_and_quantity": "",
    "has_custom_fields": false,
    "custom_fields": {},
    "order_id": 343932147,
    "is_product_physical": false,
    "is_recurring_billing": false,
    "can_contact": true,
    "is_following": false,
    "disputed": false,
    "dispute_won": false,
    "is_additional_contribution": false,
    "discover_fee_charged": false,
    "is_gift_sender_purchase": false,
    "is_gift_receiver_purchase": false,
    "referrer": "direct",
    "card": {
      "visual": "**** **** **** 4242",
      "type": "visa"
    },
    "product_rating": null,
    "reviews_count": 0,
    "average_rating": 0,
    "affiliate": {
      "email": "affiliate@example.com",
      "amount": "$2.50"
    },
    "quantity": 1
  }
}`,

  receipt_resent: `{
  "success": true,
  "message": "Receipt resent"
}`,

  subscribers: `{
  "success":true,
  "next_page_url": "/v2/products/0ssD7adjRklGBjS5cwlWPq==/subscribers?page_key=20241004235318372406-857093235&email=calvin%40gumroad.com",
  "next_page_key": "20241004235318372406-857093235",
  "subscribers": [{
    "id": "P5ppE6H8XIjy2JSCgUhbAw==",
    "product_id": "0ssD7adjRklGBjS5cwlWPq==",
    "product_name":"Pencil Icon PSD",
    "user_id": "3523953790232",
    "user_email":"calvin@gumroad.com",
    "purchase_ids": ["O4pjE6H8XNjy2JSCgKhbAw=="],
    "created_at": "2015-06-30T17:38:04Z",
    "user_requested_cancellation_at": null,
    "charge_occurrence_count": null,
    "recurrence": "monthly",
    "cancelled_at": null,
    "ended_at": null,
    "failed_at": null,
    "free_trial_ends_at": null,
    "license_key": "85DB562A-C11D4B06-A2335A6B-8C079166",
    "status": "alive"
  }]
}`,

  subscriber: `{
  "success":true,
  "subscribers": {
    "id": "P5ppE6H8XIjy2JSCgUhbAw==",
    "product_id": "0ssD7adjRklGBjS5cwlWPq==",
    "product_name":"Pencil Icon PSD",
    "user_id": "3523953790232",
    "user_email":"calvin@gumroad.com",
    "purchase_ids": ["O4pjE6H8XNjy2JSCgKhbAw=="],
    "created_at": "2015-06-30T17:38:04Z",
    "user_requested_cancellation_at": null,
    "charge_occurrence_count": null,
    "recurrence": "monthly",
    "cancelled_at": null,
    "ended_at": null,
    "failed_at": null,
    "free_trial_ends_at": null,
    "license_key": "85DB562A-C11D4B06-A2335A6B-8C079166",
    "status": "alive"
  }
}`,

  license: `{
  "success": true,
  "uses": 3,
  "purchase": {
    "seller_id": "kL0psVL2admJSYRNs-OCMg==",
    "product_id": "32-nPAicqbLj8B_WswVlMw==",
    "product_name": "licenses demo product",
    "permalink": "QMGY",
    "product_permalink": "https://sahil.gumroad.com/l/pencil",
    "email": "customer@example.com",
    "price": 0,
    "gumroad_fee": 0,
    "currency": "usd",
    "quantity": 1,
    "discover_fee_charged": false,
    "can_contact": true,
    "referrer": "direct",
    "card": {
      "visual": null,
      "type": null
    },
    "order_number": 524459935,
    "sale_id": "FO8TXN-dbxYaBdahG97Y-Q==",
    "sale_timestamp": "2021-01-05T19:38:56Z",
    "purchaser_id": "5550321502811",
    "subscription_id": "GDzW4_aBdQc-o7Gbjng7lw==",
    "variants": "",
    "license_key": "85DB562A-C11D4B06-A2335A6B-8C079166",
    "is_multiseat_license": false,
    "ip_country": "United States",
    "recurrence": "monthly",
    "is_gift_receiver_purchase": false,
    "refunded": false,
    "disputed": false,
    "dispute_won": false,
    "id": "FO8TXN-dvaYbBbahG97a-Q==",
    "created_at": "2021-01-05T19:38:56Z",
    "custom_fields": [],
    "chargebacked": false,
    "subscription_ended_at": null,
    "subscription_cancelled_at": null,
    "subscription_failed_at": null
  }
}`,

  payouts: `{
  "success": true,
  "next_page_url": "/v2/payouts?page_key=20240709081040000000-fEGTaE&before=2021-09-03&after=2020-09-03",
  "next_page_key": "20240709081040000000-fEGTaE",
  "payouts": [
    {
      "id": null,
      "amount": "75.00",
      "currency": "USD",
      "status": "payable",
      "created_at": "2021-01-14T00:00:00Z",
      "processed_at": null,
      "payment_processor": "stripe",
      "bank_account_visual": "******1234",
      "paypal_email": null
    },
    {
      "id": "fEGTaEpuKDsnDvf_MfecTA==",
      "amount": "150.00",
      "currency": "USD",
      "status": "completed",
      "created_at": "2021-01-05T19:38:56Z",
      "processed_at": "2021-01-06T10:15:30Z",
      "payment_processor": "stripe",
      "bank_account_visual": "******1234",
      "paypal_email": null
    },
    {
      "id": "32-nPainqpLj1B_WIwVlMw==",
      "amount": "275.50",
      "currency": "USD",
      "status": "pending",
      "created_at": "2021-01-04T14:22:10Z",
      "processed_at": null,
      "payment_processor": "paypal",
      "bank_account_visual": null,
      "paypal_email": "test@example.com"
    },
    {
      "id": "GazW4_NBcQy-o7Gjjng7lw==",
      "amount": "89.99",
      "currency": "EUR",
      "status": "failed",
      "created_at": "2021-01-03T09:45:32Z",
      "processed_at": null,
      "payment_processor": "stripe",
      "bank_account_visual": "******1234",
      "paypal_email": null
    }
  ]
}`,

  payout: `{
  "success": true,
  "payout": {
    "id": "fEGTaEpuKDsnDvf_MfecTA==",
    "amount": "150.00",
    "currency": "USD",
    "status": "completed",
    "created_at": "2021-01-05T19:38:56Z",
    "processed_at": "2021-01-06T10:15:30Z",
    "payment_processor": "stripe"
  }
}`,
} as const;
