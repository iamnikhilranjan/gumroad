# frozen_string_literal: true

class Exports::Payouts::Api < Exports::Payouts::Base
  include CurrencyHelper
  def initialize(payment)
    @payment = payment
  end

  def perform
    payout_data
  end
end
