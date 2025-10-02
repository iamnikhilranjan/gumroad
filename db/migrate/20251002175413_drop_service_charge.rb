class DropServiceCharge < ActiveRecord::Migration[7.1]
  def change
    remove_reference :disputes, :service_charge, foreign_key: false, index: true, type: :integer
    remove_reference :events, :service_charge, foreign_key: false, index: true, type: :integer

    drop_table "service_charges", id: :integer, charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
      t.datetime "created_at", precision: nil
      t.datetime "updated_at", precision: nil
      t.integer "user_id"
      t.integer "recurring_service_id"
      t.integer "charge_cents"
      t.string "charge_cents_currency", limit: 191, default: "usd"
      t.string "state", limit: 191
      t.datetime "succeeded_at", precision: nil
      t.integer "credit_card_id"
      t.integer "card_expiry_month"
      t.integer "card_expiry_year"
      t.string "card_data_handling_mode", limit: 191
      t.string "card_bin", limit: 191
      t.string "card_type", limit: 191
      t.string "card_country", limit: 191
      t.string "card_zip_code", limit: 191
      t.string "card_visual", limit: 191
      t.string "charge_processor_id", limit: 191
      t.integer "charge_processor_fee_cents"
      t.string "charge_processor_fee_cents_currency", limit: 191, default: "usd"
      t.string "charge_processor_transaction_id", limit: 191
      t.string "charge_processor_fingerprint", limit: 191
      t.string "charge_processor_card_id", limit: 191
      t.string "charge_processor_status", limit: 191
      t.string "charge_processor_error_code", limit: 191
      t.boolean "charge_processor_refunded", default: false, null: false
      t.datetime "chargeback_date", precision: nil
      t.string "json_data", limit: 191
      t.string "error_code", limit: 191
      t.integer "merchant_account_id"
      t.string "browser_guid", limit: 191
      t.string "ip_address", limit: 191
      t.string "ip_country", limit: 191
      t.string "ip_state", limit: 191
      t.string "session_id", limit: 191
      t.integer "flags", default: 0, null: false
      t.string "discount_code", limit: 100
      t.string "processor_payment_intent_id"
      t.index ["card_type", "card_visual", "charge_processor_fingerprint"], name: "index_service_charges_on_card_type_visual_fingerprint"
      t.index ["card_type", "card_visual", "created_at", "charge_processor_fingerprint"], name: "index_service_charges_on_card_type_visual_date_fingerprint"
      t.index ["created_at"], name: "index_service_charges_on_created_at"
      t.index ["recurring_service_id"], name: "index_service_charges_on_recurring_service_id"
      t.index ["user_id"], name: "index_service_charges_on_user_id"
    end
  end
end
