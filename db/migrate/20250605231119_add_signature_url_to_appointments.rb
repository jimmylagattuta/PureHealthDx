class AddSignatureUrlToAppointments < ActiveRecord::Migration[7.0]
  def change
    add_column :appointments, :signature_url, :string
  end
end
