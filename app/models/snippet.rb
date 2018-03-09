class Snippet < ApplicationRecord
  acts_as_taggable

  validates :title, presence: true, uniqueness: true
  validates :content, presence: true, length: { maximum: 10000 }
  validates :language, presence: true, inclusion: { in: Editor.languages.keys.map(&:to_s) }
  validates :tabs, numericality: { only_integer: true }, inclusion: { in: [2, 4, 8] }
  validates :tag_list, length: { maximum: 1, message: 'is too big. Maximum tags amount is 1' }
  validate :label_length

  def label_length
    unless tag_list.blank?
      tags = tag_list.first
      errors[:tag_list] << 'is too big. Maximum characters allowed is 20' if tags.length > 20
    end
  end
end
