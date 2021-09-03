FactoryBot.define do
  factory :snippet, class: Snippet do
    title { 'snippet_1' }
    description { Faker::Lorem.sentence }
    snippet_files { build_list :snippet_file, 3 }
    after(:create) { |snippet|
      snippet.labels << FactoryBot.create(:label)
    }
  end

  factory :snippet_without_tag, class: Snippet do
    title { 'snippet_1' }
    description { Faker::Lorem.sentence }
    snippet_files { build_list :snippet_file, 3 }
  end

  factory :snippet_without_files, class: Snippet do
    title { 'snippet_1' }
    description { Faker::Lorem.sentence }
  end
end
