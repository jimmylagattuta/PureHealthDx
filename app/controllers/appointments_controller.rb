# app/controllers/appointments_controller.rb
class AppointmentsController < ApplicationController
  require 'base64'
  require 'chunky_png'
  require 'stringio'
  def pdf
    appointment = Appointment.find(params[:id])
    data = JSON.parse(appointment.full_data)

    @patient_name = data["patient_name"]
    @signature_url = data["signature_url"]
    @notes = data["notes"]
    @date = data["date"]

    # Handle signature
    base64_data = @signature_url.to_s.sub(/^data:image\/png;base64,/, '')
    @signature_inline = "data:image/png;base64,#{base64_data}"

    render pdf: "appointment_summary",
          template: "appointments/pdf",
          formats: [:html],
          layout: false
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
