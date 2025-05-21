class ContactMailer < ApplicationMailer
    default from: 'jimmy.lagattuta@gmail.com'
  
  def full_submission_email(data)
    @data = data
    mail(
      to: 'jimmy.lagattuta@gmail.com',
      subject: "New Full Appointment Submission"
    )
  end
end