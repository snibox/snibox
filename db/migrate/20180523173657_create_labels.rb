class CreateLabels < ActiveRecord::Migration[5.2]
  def change
    create_table :labels do |t|
      t.string :title
    end

    add_index :labels, :title, unique: true
  end
end
