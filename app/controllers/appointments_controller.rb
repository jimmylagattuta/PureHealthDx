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

    # Draw a simple circle
    center_x, center_y, radius = 150, 50, 30
    (center_x - radius).upto(center_x + radius) do |x|
      (center_y - radius).upto(center_y + radius) do |y|
        if (x - center_x)**2 + (y - center_y)**2 <= radius**2
          png[x, y] = ChunkyPNG::Color::BLACK
        end
      end
    end

    io = StringIO.new
    png.write(io)
    base64 = Base64.strict_encode64(io.string)
    "data:image/png;base64,#{base64}"
  end


end