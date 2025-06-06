# app/controllers/appointments_controller.rb
class AppointmentsController < ApplicationController
  require 'base64'
  require 'tempfile'

  def pdf
    @appointment = Appointment.find(params[:id])

    # Decode base64 to tmp file
    if @appointment.signature_url&.start_with?("data:image")
      base64_data = @appointment.signature_url.sub(/^data:image\/png;base64,/, '')
      decoded = Base64.decode64(base64_data)
      @signature_path = "/tmp/sig_#{@appointment.id}.png"
      File.open(@signature_path, "wb") { |f| f.write(decoded) }
    end

    render pdf: "appointment_#{@appointment.id}",
          template: "appointments/pdf",
          formats: [:html],
          layout: false
  ensure
    File.delete(@signature_path) if @signature_path && File.exist?(@signature_path)
  end



end