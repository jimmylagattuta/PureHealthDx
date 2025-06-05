PDFKit.configure do |config|
  config.default_options = {
    page_size: 'Letter',
    print_media_type: true
  }

  config.wkhtmltopdf = Rails.root.join('bin', 'wkhtmltopdf').to_s
end

# Enable PDFKit middleware for inline rendering
Rails.application.config.middleware.use PDFKit::Middleware