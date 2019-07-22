class Labeling < ApplicationRecord
  belongs_to :label
  belongs_to :snippet
  counter_culture :label, column_name: "snippets_count"
end
