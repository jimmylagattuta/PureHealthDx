module Api
    class ContactsController < ApplicationController
    skip_before_action :authenticate_user, only: [:create]
    skip_before_action :verify_authenticity_token  # Disables CSRF protection for API requests

    # def create
    #     contact_params = params.require(:contact).permit(:firstName, :lastName, :email, :phone, :message)
    #     puts "Attempting to send email with params: #{contact_params.inspect}"
    #     ContactMailer.contact_email(contact_params).deliver_now
    #     puts "Email sent successfully"
    #     render json: { success: true, message: 'Email sent successfully' }, status: :ok
    # rescue StandardError => e
    #     puts "Error sending email: #{e.message}"
    #     render json: { success: false, message: 'Error sending email', error: e.message }, status: :unprocessable_entity
    # end
    # end
    def create
      puts "=" * 80
      puts "🚀 Incoming Appointment Form Submission"
      puts params[:appointment].inspect
      puts "=" * 80

      permitted = params.require(:appointment).permit!  # ✅ PERMIT EVERYTHING for now

      appointment = Appointment.create!(
        patient_name: permitted["patientConsentForMedicalServicesPatientName"],
        date: Date.today,
        notes: "Step 3 Test Submission",
        signature_url: permitted["patientConsentForMedicalServicesSignature"]
      )

      ContactMailer.full_submission_email(permitted.to_h).deliver_now

      render json: { success: true, id: appointment.id, message: 'Appointment saved and email sent' }, status: :ok
    rescue => e
      puts "❌ Error processing appointment: #{e.message}"
      render json: { success: false, message: 'Failed to submit appointment', error: e.message }, status: :unprocessable_entity
    end


  end
end