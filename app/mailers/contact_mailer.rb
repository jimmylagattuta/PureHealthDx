class ContactMailer < ApplicationMailer
  default from: 'jimmy.lagattuta@gmail.com'

  def full_submission_email(data)
    @data = data

    # Attach signatures if present
    attach_base64_image(data["patientConsentForMedicalServicesSignature"], 'patient_signature.png')
    attach_base64_image(data["informedConsentForHghReplacementTherapyPatientSignature"], 'hgh_patient_signature.png')
    attach_base64_image(data["informedConsentForHghReplacementTherapyWitnessSignature"], 'hgh_witness_signature.png')
    attach_base64_image(data["informedConsentForTestosteroneReplacementTherapyPatientSignature"], 'trt_patient_signature.png')
    attach_base64_image(data["informedConsentForTestosteroneReplacementTherapyWitnessSignature"], 'trt_witness_signature.png')
    attach_base64_image(data["controlledSubstanceAutoRefillConsentPatientSignature"], 'controlled_signature.png')

    mail(to: 'jimmy.lagattuta@gmail.com', subject: "New Full Appointment Submission")
  end

  private

  def attach_base64_image(data_uri, filename)
    return unless data_uri.present?

    image_data = data_uri.sub(/^data:image\/png;base64,/, '')
    attachments.inline[filename] = {
      mime_type: 'image/png',
      content: Base64.decode64(image_data)
    }
  end
end
