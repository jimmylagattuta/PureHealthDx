class ContactMailer < ApplicationMailer
  default from: 'jimmy.lagattuta@gmail.com'

  def full_submission_email(data)
    @data = data

    attach_signature(data["patientConsentForMedicalServicesSignature"], "sig_patient_medical.png")
    attach_signature(data["informedConsentForHghReplacementTherapyPatientSignature"], "sig_patient_hgh.png")
    attach_signature(data["informedConsentForHghReplacementTherapyWitnessSignature"], "sig_witness_hgh.png")
    attach_signature(data["informedConsentForTestosteroneReplacementTherapyPatientSignature"], "sig_patient_trt.png")
    attach_signature(data["informedConsentForTestosteroneReplacementTherapyWitnessSignature"], "sig_witness_trt.png")
    attach_signature(data["controlledSubstanceAutoRefillConsentPatientSignature"], "sig_patient_controlled.png")

    mail(
      to: 'jimmy.lagattuta@gmail.com',
      subject: "New Full Appointment Submission"
    )
  end

  private

  def attach_signature(data_uri, cid_filename)
    return unless data_uri.present?
    base64 = data_uri.sub(/^data:image\/png;base64,/, '').strip
    attachments.inline[cid_filename] = {
      mime_type: 'image/png',
      content: Base64.decode64(base64)
    }
  end

end
