require 'rails_helper'

RSpec.describe Category, type: :model do
    before(:each) do
        @user = User.create(first_name: "John", last_name: "Doe", email: "test@example.com", password: "password")
    end

    it "saves a valid category with a name and description" do
        category = Category.new(name: "Test Category", description: "Test Description", user: @user)
        expect(category.save).to be true
    end

    it "does not save a category without a name" do
        category = Category.new(description: "Test Description", user: @user)
        expect(category.save).to be false
    end

    it "does not save a category without a description" do
        category = Category.new(name: "Test Category", user: @user)
        expect(category.save).to be false
    end

    it "returns all categories" do
        category1 = Category.create(name: "Category 1", description: "Description 1", user: @user)
        category2 = Category.create(name: "Category 2", description: "Description 2", user: @user)

        categories = Category.all

        expect(categories).to include(category1)
        expect(categories).to include(category2)
    end

    it "displays the category's details" do
        category = Category.create(name: "Test Category", description: "Test Description")

        expect(category.name).to eq("Test Category")
        expect(category.description).to eq("Test Description")
    end

    it "updates the category's details" do
        category = Category.create(name: "Test Category", description: "Test Description")
        new_name = "Updated Category"
        new_description = "Updated Description"

        category.update(name: new_name, description: new_description)
        expect(category.name).to eq(new_name)
        expect(category.description).to eq(new_description)
    end

    it "deletes associated tasks when the category is deleted" do
        category = Category.create(name: "Test Category", description: "Test Description", user: @user)
        task1 = category.tasks.create(name: "Task 1", description: "Task 1 Description", user: @user)
        task2 = category.tasks.create(name: "Task 2", description: "Task 2 Description", user: @user)
        task3 = category.tasks.create(name: "Task 3", description: "Task 3 Description", user: @user)

        expect {
            category.destroy
        }.to change { Task.count }.by(-3)
    end
end
