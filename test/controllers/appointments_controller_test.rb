require "test_helper"

class AppointmentsControllerTest < ActionDispatch::IntegrationTest
  test "should get show_pdf" do
    get appointments_show_pdf_url
    assert_response :success
  end
end
