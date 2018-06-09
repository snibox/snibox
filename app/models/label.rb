class Label < ApplicationRecord
  has_many :snippets

  validates :name, presence: true, uniqueness: true, length: { maximum: 20 }
end
