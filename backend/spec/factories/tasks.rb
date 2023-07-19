FactoryBot.define do
  factory :task do
    sequence(:name) { |n| "Task #{n}" }
    sequence(:description) { |n| "Description #{n}" }
    category

    trait :without_name do
      name { nil }
    end

    trait :without_desc do
      description { nil }
    end
  end
end
