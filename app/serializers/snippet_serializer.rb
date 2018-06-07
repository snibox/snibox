class SnippetSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :language, :tabs, :label

  def label
    object.label.blank? ? { id: nil, name: '', taggings_count: 0 } : object.label
  end
end
