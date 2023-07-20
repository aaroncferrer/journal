FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "email #{n}" }
    sequence(:password) { |n| "password #{n}" }
  end
end
