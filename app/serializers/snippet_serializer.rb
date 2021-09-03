class SnippetSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :labels, :snippet_files, :snippet_files_count

  def labels
    object.labels.blank? ? [{ id: nil, name: '', snippets_count: 0 }] : object.labels
  end
end
