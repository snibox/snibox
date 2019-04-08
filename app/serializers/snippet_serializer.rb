class SnippetSerializer < ActiveModel::Serializer
  attributes :id, :description, :label, :snippet_files

  def label
    object.label.blank? ? { id: nil, name: '', snippets_count: 0 } : object.label
  end
end
