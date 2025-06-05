# app/controllers/appointments_controller.rb
class AppointmentsController < ApplicationController
  require 'base64'
  require 'tempfile'

  def pdf
    @appointment = Appointment.find(params[:id])
    render pdf: "appointment_#{@appointment.id}",
          template: "appointments/pdf",
          formats: [:html],
          layout: false
  end


end