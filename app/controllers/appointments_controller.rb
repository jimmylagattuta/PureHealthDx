# app/controllers/appointments_controller.rb
class AppointmentsController < ApplicationController
  require 'base64'
  require 'tempfile'

  def pdf
    @appointment = Appointment.find(params[:id])

    if @appointment.signature.present?
      base64_data = @appointment.signature.split(',')[1]
      decoded_image = Base64.decode64(base64_data)
      
      tmp_file = Tempfile.new(["signature_#{@appointment.id}", ".png"], binmode: true)
      tmp_file.write(decoded_image)
      tmp_file.rewind

      @signature_path = "file://#{tmp_file.path}"
    else
      @signature_path = nil
    end

    render pdf: "appointment_#{@appointment.id}",
          template: "appointments/pdf",
          formats: [:html],
          layout: false

  end

end