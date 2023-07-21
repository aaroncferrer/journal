require 'rails_helper'

RSpec.describe User, type: :model do
  it "saves a valid user" do
    user = FactoryBot.build(:user)
    expect(user.save).to be true
  end

  it "does not save a user without a name" do
    user = FactoryBot.build(:user, :without_name)
    expect(user.save).to be false
  end

  it "does not save a user if email is taken" do
    existing_user = FactoryBot.create(:user)
    new_user = User.new(first_name: "John", last_name: "Doe", email: existing_user.email, password: "password")

    expect(new_user.save).to be false
  end

  it "does not save if passwords don't match" do
    user = User.new(first_name: "John", last_name: "Doe", email: "test@example.com", password: "password", password_confirmation: "passwords")

    expect(user.save).to be false
  end
end
