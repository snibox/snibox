class Label < ApplicationRecord
  has_many :labelings
  has_many :snippets, through: :labelings

  validates :name, presence: true, uniqueness: true, length: { maximum: 20 }
end
