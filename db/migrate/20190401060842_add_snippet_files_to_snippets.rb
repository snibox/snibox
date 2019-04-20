class AddSnippetFilesToSnippets < ActiveRecord::Migration[5.2]
  def change
    add_column :snippets, :description, :text
    add_column :snippets, :snippet_files_count, :integer, null: false, default: 0

    create_table :snippet_files do |t|
      t.string :title
      t.text :content
      t.string :language
      t.integer :tabs, limit: 2
      t.belongs_to :snippet

      t.timestamps
    end
  end
end
