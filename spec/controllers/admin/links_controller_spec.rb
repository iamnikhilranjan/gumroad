# frozen_string_literal: true

require "spec_helper"
require "shared_examples/admin_base_controller_concern"

describe Admin::LinksController do
  render_views

  it_behaves_like "inherits from Admin::BaseController"
end
