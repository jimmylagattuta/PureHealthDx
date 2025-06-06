# app/controllers/appointments_controller.rb
class AppointmentsController < ApplicationController
  require 'base64'
  require 'chunky_png'
  require 'stringio'

  def pdf
    appointment_data = params[:appointment] || {}
    @patient_name = appointment_data[:patient_name] || "Unknown Patient"
    @signature_url = appointment_data[:signature_url]
    @notes = appointment_data[:notes] || "(No notes provided)"
    @date = appointment_data[:date] || Time.current.to_date

    # fallback: generate dummy signature if none was provided
    signature_data = @signature_url.presence || generate_test_signature_base64
    base64_data = signature_data.sub(/^data:image\/png;base64,/, '')
    decoded = Base64.decode64(base64_data)

    @signature_path = Rails.root.join("tmp", "sig_inline.png").to_s
    File.open(@signature_path, "wb") { |f| f.write(decoded) }

    render pdf: "appointment_summary",
           template: "appointments/pdf",
           formats: [:html],
           layout: false
  ensure
    File.delete(@signature_path) if File.exist?(@signature_path)
  end

  private

  def generate_test_signature_base64
    png = ChunkyPNG::Image.new(300, 100, ChunkyPNG::Color::WHITE)
    (20..280).step(5).each do |x|
      y = 50 + (Math.sin(x * 0.1) * 10).to_i
      png[x, y] = ChunkyPNG::Color::BLACK
    end
    io = StringIO.new
    png.write(io)
    "data:image/png;base64,#{Base64.strict_encode64(io.string)}"
  end
end
