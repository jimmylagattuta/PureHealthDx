# app/mailers/contact_mailer.rb
class ContactMailer < ApplicationMailer
  default from: 'kenneth@purehealthdx.com'

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
    if @appointment.full_data.present?
      data = JSON.parse(@appointment.full_data)
      puts "✅ Parsed full_data keys: #{data.keys}"
    else
      raise "full_data is empty or nil"
    end
  rescue => e
    puts "❌ Error parsing full_data JSON: #{e.message}"
    raise e
  end

  # Assign @data so it can be used in views if needed
  @data = data

  # Safely attach signatures
  %w[
    patientConsentForMedicalServicesSignature
    informedConsentForHghReplacementTherapyPatientSignature
    informedConsentForHghReplacementTherapyWitnessSignature
    informedConsentForTestosteroneReplacementTherapyPatientSignature
    informedConsentForTestosteroneReplacementTherapyWitnessSignature
    controlledSubstanceAutoRefillConsentPatientSignature
  ].each do |key|
    attach_signature(data[key], "sig_#{key.underscore}", "image/png")
  end

  mail(
    to: 'kenneth@purehealthdx.com',
    cc: 'jimmy.lagattuta@gmail.com',
    subject: "Pure Health: New Appointment Submission"
  )
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
