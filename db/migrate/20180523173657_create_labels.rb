class CreateLabels < ActiveRecord::Migration[5.2]
  def change
    create_table :labels do |t|
      t.string :name
      t.integer :snippets_count, default: 0, null: false
    end

    add_index :labels, :name, unique: true
  end
end
