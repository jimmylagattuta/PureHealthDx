class AddFullDataToAppointments < ActiveRecord::Migration[7.0]
  def change
    add_column :appointments, :full_data, :text
  end
end
