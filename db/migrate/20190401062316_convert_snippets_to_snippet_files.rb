class ConvertSnippetsToSnippetFiles < ActiveRecord::Migration[5.2]
  def change
    Snippet.all.each do |snippet|
      SnippetFile.create!(
        title: 'main',
        content: snippet.content,
        language: snippet.language,
        tabs: snippet.tabs,
        snippet: snippet
      )
    end

    remove_column :snippets, :content
    remove_column :snippets, :language
    remove_column :snippets, :tabs
  end
end
