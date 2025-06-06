# app/controllers/appointments_controller.rb
class AppointmentsController < ApplicationController
  require 'base64'
  require 'tempfile'

  def pdf
    @appointment = Appointment.find(params[:id])
    @signature_path = Rails.root.join("tmp", "sig_#{@appointment.id}.png").to_s

    signature_data = @appointment.signature_url.presence || generate_test_signature_base64
    puts "✅ Using dummy signature? #{signature_data.starts_with?('data:image')}"
    base64_data = signature_data.sub(/^data:image\/png;base64,/, '')
    decoded = Base64.decode64(base64_data)
    puts "✅ Decoded signature bytes: #{decoded.bytesize}"
    puts "✅ Writing to: #{@signature_path}"

    begin
      File.open(@signature_path, "wb") { |f| f.write(decoded) }
      puts "✅ File written successfully"
    rescue => e
      puts "🔥 ERROR writing file: #{e.class} - #{e.message}"
      raise
    end

    # Build inline base64 string for direct embedding
    @signature_inline = "data:image/png;base64,#{Base64.strict_encode64(decoded)}"

    render pdf: "appointment_#{@appointment.id}",
           template: "appointments/pdf",
           formats: [:html],
           layout: false
  ensure
    File.delete(@signature_path) if File.exist?(@signature_path)
  end

  def generate_test_signature_base64
    require 'chunky_png'
    require 'base64'
    require 'stringio'

    png = ChunkyPNG::Image.new(300, 100, ChunkyPNG::Color::WHITE)

    # Simulate a visible squiggly signature
    (20..280).step(5).each do |x|
      y = 50 + (Math.sin(x * 0.1) * 10).to_i
      png[x, y] = ChunkyPNG::Color::BLACK
    end

    io = StringIO.new
    png.write(io)
    base64 = Base64.strict_encode64(io.string)
    "data:image/png;base64,#{base64}"
  end
end