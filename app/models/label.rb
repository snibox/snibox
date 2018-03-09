class Label < ActsAsTaggableOn::Tag
  validates :name, presence: true, length: { maximum: 20 }
end
