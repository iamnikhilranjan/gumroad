# frozen_string_literal: true

class Settings::BaseController < Sellers::BaseController
  layout "inertia"

  inertia_share do
    {
      settings_pages: -> { settings_presenter.pages }
    }
  end

  protected
    def settings_presenter
      @settings_presenter ||= SettingsPresenter.new(pundit_user:)
    end

    def set_default_page_title
      set_page_title("Settings")
    end
end
