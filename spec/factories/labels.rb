FactoryBot.define do
  factory :label do
    name { Faker::Hacker.abbreviation }
  end
end
