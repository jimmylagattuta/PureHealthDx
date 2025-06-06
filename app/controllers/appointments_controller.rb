# app/controllers/appointments_controller.rb
class AppointmentsController < ApplicationController
  require 'base64'
  require 'chunky_png'
  require 'stringio'
  
  def pdf
    @appointment = Appointment.find(params[:id])
    data = JSON.parse(@appointment.full_data)

    @data = data
    @patient_name = data["patientConsentForMedicalServicesPatientName"] || "Unknown"
    @date = data["patientConsentForMedicalServicesDate"]
    @notes = @appointment.notes.presence || "(No notes provided)"

    # Inline base64 images for PDF display
    @sig_patient_medical    = data["patientConsentForMedicalServicesSignature"]
    @sig_patient_hgh        = data["informedConsentForHghReplacementTherapyPatientSignature"]
    @sig_witness_hgh        = data["informedConsentForHghReplacementTherapyWitnessSignature"]
    @sig_patient_trt        = data["informedConsentForTestosteroneReplacementTherapyPatientSignature"]
    @sig_witness_trt        = data["informedConsentForTestosteroneReplacementTherapyWitnessSignature"]
    @sig_patient_controlled = data["controlledSubstanceAutoRefillConsentPatientSignature"]

    render pdf: "appointment_summary",
          template: "appointments/pdf",
          formats: [:html],
          layout: false
  end




  private

  def generate_test_signature_base64
    png = ChunkyPNG::Image.new(300, 100, ChunkyPNG::Color::WHITE)
    (20..280).step(5).each do |x|
      y = 50 + (Math.sin(x * 0.1) * 10).to_i
      png[x, y] = ChunkyPNG::Color::BLACK
    end
    io = StringIO.new
    png.write(io)
    "data:image/png;base64,#{Base64.strict_encode64(io.string)}"
  end
end
