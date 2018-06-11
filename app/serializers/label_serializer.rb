class LabelSerializer < ActiveModel::Serializer
  attributes :id, :name, :snippets_count
end
