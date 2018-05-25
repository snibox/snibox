class SnippetSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :language, :tabs, :tags, :label

  # TODO: legacy support for tags
  def tags
    object.label.blank? ? [] : [object.label]
  end
end
