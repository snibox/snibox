class Snippet < ApplicationRecord
  # Due to current core counter_cache issues let's use quick update_snippets_count callback for counter cache.
  # At some point it make sense to switch again to this association:
  # belongs_to :label, optional: true, counter_cache: true
  belongs_to :label, optional: true

  accepts_nested_attributes_for :label

  validates :title, presence: true
  validates :content, presence: true, length: { maximum: 10000 }
  validates :language, presence: true, inclusion: { in: Editor.languages.keys.map(&:to_s) }
  validates :tabs, numericality: { only_integer: true }, inclusion: { in: [2, 4, 8] }

  after_commit :remove_unused_labels
  after_commit :update_snippets_count

  private

  def update_snippets_count
    Label.all.each { |label| label.update(snippets_count: Snippet.where(label: label).count) }
  end

  def remove_unused_labels
    Label.where('snippets_count < 1').destroy_all
  end
end
