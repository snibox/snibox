class Snippet < ApplicationRecord
  belongs_to :label, optional: true
  has_many :snippet_files

  counter_culture :label

  accepts_nested_attributes_for :label
  accepts_nested_attributes_for :snippet_files

  validates :description, presence: true, length: { maximum: 2000 }

  after_commit :remove_unused_labels

  private

  def remove_unused_labels
    Label.where('snippets_count < 1').destroy_all
  end
end
