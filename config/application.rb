require_relative "boot"

require "rails/all"
# require_relative "../lib/middleware/force_www"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module LightningSEODev
  class Application < Rails::Application
    config.load_defaults 7.0

    # config.middleware.use ForceWWW

    config.api_only = true
    config.middleware.use Rack::Deflater

    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore

    config.action_dispatch.cookies_same_site_protection = :strict # ensures that cookies are only shared on the same domain.
  end
end
