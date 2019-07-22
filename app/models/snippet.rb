class Snippet < ApplicationRecord
  has_many :labelings
  has_many :snippet_files
  has_many :labels, through: :labelings

  # counter_culture :label

  accepts_nested_attributes_for :labels
  accepts_nested_attributes_for :snippet_files, allow_destroy: true

  validates :title, presence: true, length: { maximum: 40 }
  validates :description, length: { maximum: 2000 }

  after_commit :remove_unused_labels

  private

  def remove_unused_labels
    Label.where('snippets_count < 1').destroy_all
  end
end
