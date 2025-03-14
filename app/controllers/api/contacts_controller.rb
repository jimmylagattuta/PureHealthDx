module Api
    class ContactsController < ApplicationController
    skip_before_action :authenticate_user, only: [:create]
    skip_before_action :verify_authenticity_token  # Disables CSRF protection for API requests

    def create
        contact_params = params.require(:contact).permit(:firstName, :lastName, :email, :phone, :message)
        puts "Attempting to send email with params: #{contact_params.inspect}"
        ContactMailer.contact_email(contact_params).deliver_now
        puts "Email sent successfully"
        render json: { success: true, message: 'Email sent successfully' }, status: :ok
    rescue StandardError => e
        puts "Error sending email: #{e.message}"
        render json: { success: false, message: 'Error sending email', error: e.message }, status: :unprocessable_entity
    end
    end
end