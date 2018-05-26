FactoryBot.define do
  factory :snippet_with_tag, class: Snippet do
    title 'snippet_1'
    content { Faker::Lorem.sentence }
    language 'plain'
    tabs 2
    label_attributes { { name: 'tag_1' } }
  end

  factory :snippet_without_tag, class: Snippet do
    title 'snippet 2'
    content { Faker::Lorem.sentence }
    language 'plain'
    tabs 2
  end
end
