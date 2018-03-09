FactoryBot.define do
  factory :tag do
    title { Faker::Hacker.abbreviation }
    description { 'here could be some description' }
  end
end