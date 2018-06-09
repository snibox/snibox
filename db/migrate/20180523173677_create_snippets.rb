class CreateSnippets < ActiveRecord::Migration[5.1]
  def change
    create_table :snippets do |t|
      t.string :title
      t.text :content
      t.string :language
      t.integer :tabs, limit: 2
      t.belongs_to :label

      t.timestamps
    end
  end
end
