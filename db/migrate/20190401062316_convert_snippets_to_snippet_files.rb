class ConvertSnippetsToSnippetFiles < ActiveRecord::Migration[5.2]
  def change
    Snippet.all.each do |snippet|
      snippet_file = SnippetFile.new
      snippet_file.update(
        title: snippet.title,
        content: snippet.content,
        language: snippet.language,
        tabs: snippet.tabs,
        snippet: snippet
      )
      snippet_file.save!
    end

    remove_column :snippets, :title
    remove_column :snippets, :content
    remove_column :snippets, :language
    remove_column :snippets, :tabs
  end
end
