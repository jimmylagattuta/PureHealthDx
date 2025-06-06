# app/mailers/contact_mailer.rb
class ContactMailer < ApplicationMailer
  default from: 'jimmy.lagattuta@gmail.com'

  def full_submission_email(appointment)
    puts "📬 Entered full_submission_email"
    @appointment = appointment

    if @appointment.nil?
      puts "❌ Appointment is nil"
      return
    end

    puts "📝 Appointment ID: #{@appointment.id}"
    puts "📦 Raw full_data: #{@appointment.full_data.inspect}"

    begin
      data = JSON.parse(@appointment.full_data)
      puts "✅ Parsed data keys: #{data.keys}"
    rescue => e
      puts "❌ JSON parse error: #{e.message}"
      raise e
    end

    # Attach each signature with debug
    attach_signature(data["patientConsentForMedicalServicesSignature"], "sig_patient_medical", "image/png")
    attach_signature(data["informedConsentForHghReplacementTherapyPatientSignature"], "sig_patient_hgh", "image/png")
    attach_signature(data["informedConsentForHghReplacementTherapyWitnessSignature"], "sig_witness_hgh", "image/png")
    attach_signature(data["informedConsentForTestosteroneReplacementTherapyPatientSignature"], "sig_patient_trt", "image/png")
    attach_signature(data["informedConsentForTestosteroneReplacementTherapyWitnessSignature"], "sig_witness_trt", "image/png")
    attach_signature(data["controlledSubstanceAutoRefillConsentPatientSignature"], "sig_patient_controlled", "image/png")

    puts "📧 Preparing to send mail..."
    mail(
      to: 'jimmy.lagattuta@gmail.com',
      cc: 'kenneth@purehealthdx.com',
      subject: "Pure Health: New Appointment Submission"
    )
    puts "✅ Mail triggered"
  end

  private

  def attach_signature(data_uri, cid, mime_type)
    puts "📎 Attaching signature for CID: #{cid}"
    if data_uri.blank?
      puts "⚠️ Signature missing for #{cid}, skipping"
      return
    end

    begin
      base64 = data_uri.sub(/^data:image\/png;base64,/, '')
      decoded = Base64.decode64(base64)
      attachments.inline[cid] = {
        mime_type: mime_type,
        content_id: cid,
        content: decoded
      }
      puts "✅ Attached signature for #{cid}"
    rescue => e
      puts "❌ Failed to attach signature for #{cid}: #{e.message}"
    end
  end
end
