class CreateForms < ActiveRecord::Migration
  def change
    create_table :forms do |t|
      t.string :title
      t.text :fields
      t.text :view

      t.timestamps
    end
  end
end
