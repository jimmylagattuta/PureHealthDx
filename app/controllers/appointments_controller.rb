class AppointmentsController < ApplicationController
  def show_pdf
    @appointment = Appointment.find(params[:id])
    respond_to do |format|
      format.pdf do
        render pdf: "appointment_#{@appointment.id}",
               template: "appointments/pdf",
               layout: 'pdf.html.erb' # optional
      end
    end
  end
end
