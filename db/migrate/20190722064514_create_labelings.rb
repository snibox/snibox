class CreateLabelings < ActiveRecord::Migration[5.2]
  def change
    create_table :labelings do |t|
      t.belongs_to :label, foreign_key: true
      t.belongs_to :snippet, foreign_key: true

      t.timestamps
    end
  end
end
