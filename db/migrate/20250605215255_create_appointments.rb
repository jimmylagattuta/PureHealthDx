class CreateAppointments < ActiveRecord::Migration[7.0]
  def change
    create_table :appointments do |t|
      t.string :patient_name
      t.datetime :date
      t.text :notes

      t.timestamps
    end
  end
end
