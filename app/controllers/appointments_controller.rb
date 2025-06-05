# app/controllers/appointments_controller.rb
class AppointmentsController < ApplicationController
  def pdf
    @appointment = Appointment.find(params[:id])

    respond_to do |format|
      format.pdf do
        render pdf: "appointment_#{@appointment.id}",
               template: "appointments/pdf",
               formats: [:html]
      end
    end
  end
end