require 'rails_helper'

RSpec.describe Category, type: :model do
    it "saves a valid category with a name and description" do
        category = Category.new(name: "Test Category", description: "Test Description")
        expect(category.save).to be true
    end

    it "does not save a category without a name" do
        category = Category.new(description: "Test Description")
        expect(category.save).to be false
    end

    it "does not save a category without a description" do
        category = Category.new(name: "Test Category")
        expect(category.save).to be false
    end

    it "deletes associated tasks when the category is deleted" do
        category = Category.create(name: "Test Category", description: "Test Description")
        task1 = category.tasks.create(name: "Task 1")
        task2 = category.tasks.create(name: "Task 2")

        expect {
            category.destroy
        }.to change { Task.count }.by(-2)
    end
end
