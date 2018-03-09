class SnippetSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :language, :tabs, :tags, :tag_list
end
