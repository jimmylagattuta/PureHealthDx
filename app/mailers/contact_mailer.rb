# app/mailers/contact_mailer.rb
class ContactMailer < ApplicationMailer
  default from: 'jimmy.lagattuta@gmail.com'

  def full_submission_email(data)
    @data = data

    attach_signature(data["patientConsentForMedicalServicesSignature"], "sig_patient_medical", "image/png")
    attach_signature(data["informedConsentForHghReplacementTherapyPatientSignature"], "sig_patient_hgh", "image/png")
    attach_signature(data["informedConsentForHghReplacementTherapyWitnessSignature"], "sig_witness_hgh", "image/png")
    attach_signature(data["informedConsentForTestosteroneReplacementTherapyPatientSignature"], "sig_patient_trt", "image/png")
    attach_signature(data["informedConsentForTestosteroneReplacementTherapyWitnessSignature"], "sig_witness_trt", "image/png")
    attach_signature(data["controlledSubstanceAutoRefillConsentPatientSignature"], "sig_patient_controlled", "image/png")

    mail(
      to: 'jimmy.lagattuta@gmail.com',
      subject: "New Full Appointment Submission"
    )
  end

  private

  def attach_signature(data_uri, cid, mime_type)
    return unless data_uri.present?
    base64 = data_uri.sub(/^data:image\/png;base64,/, '')
    attachments.inline[cid] = {
      mime_type: mime_type,
      content_id: cid, # Explicit content ID
      content: Base64.decode64(base64)
    }
  end
end
