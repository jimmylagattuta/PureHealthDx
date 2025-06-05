# config/initializers/wicked_pdf.rb
WickedPdf.config ||= {}
WickedPdf.config.merge!(
  exe_path: Gem.bin_path('wkhtmltopdf-heroku', 'wkhtmltopdf-linux-amd64')
)