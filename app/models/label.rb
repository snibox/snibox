class Label < ApplicationRecord
  has_many :snippets

  validates :name, presence: true, length: { maximum: 20 }
end
