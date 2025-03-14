class FallbackController < ActionController::Base
  def index
    render file: Rails.public_path.join("index.html"), layout: false
  end
end
