class AddSignatureToAppointments < ActiveRecord::Migration[7.0]
  def change
    add_column :appointments, :signature, :text
  end
end
