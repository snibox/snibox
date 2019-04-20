FactoryBot.define do
  factory :snippet_with_tag, class: Snippet do
    description { 'snippet_1' }
    label_attributes { { name: 'tag_1' } }
    snippet_files { build_list :snippet_file, 3 }
  end

  factory :snippet_without_tag, class: Snippet do
    description { 'snippet_1' }
    snippet_files { build_list :snippet_file, 3 }
  end

  factory :snippet_without_files, class: Snippet do
    description { 'snippet_1' }
  end
end
