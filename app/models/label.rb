class Label < ApplicationRecord
  has_many :snippets

  validates :name, presence: true, uniqueness: true, length: { maximum: 20 }

  after_commit :remove_unused_labels

  private

  def remove_unused_labels
    Label.where('taggings_count < 1').destroy_all
  end
end
