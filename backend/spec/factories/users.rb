FactoryBot.define do
  factory :user do
    first_name { "John" }
    last_name { "Doe" }
    sequence(:email) { |n| "email #{n}" }
    sequence(:password) { |n| "password #{n}" }
    password_confirmation { |u| u.password }

    trait :without_name do
      first_name { nil }
    end
  end
end
