class SnippetFileSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :language, :tabs
end
