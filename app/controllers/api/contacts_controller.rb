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

      # Optionally, send to mailer
      ContactMailer.full_submission_email(params[:appointment]).deliver_now

      render json: { success: true, message: 'Appointment submitted successfully' }, status: :ok
    rescue => e
      puts "❌ Error processing appointment: #{e.message}"
      render json: { success: false, message: 'Failed to submit appointment', error: e.message }, status: :unprocessable_entity
    end
  end
end