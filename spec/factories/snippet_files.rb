FactoryBot.define do
  factory :snippet_file do
    title { 'snippet_file_1' }
    content { Faker::Lorem.sentence }
    language { 'plain' }
    tabs { 2 }
  end

  factory :single_snippet_file, class: SnippetFile do
    title { 'snippet_file_1' }
    content { Faker::Lorem.sentence }
    language { 'plain' }
    tabs { 2 }
    association :snippet, factory: :snippet_without_files
  end
end
