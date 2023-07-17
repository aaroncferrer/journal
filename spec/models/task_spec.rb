require 'rails_helper'

RSpec.describe Task, type: :model do
  describe "Validation" do
    # CREATE
    it "is valid with complete attributes" do
      category = FactoryBot.create(:category)
      task = FactoryBot.build(:task, category: category)
      expect(task.save).to be true
    end

    it "is invalid without a name" do
      category = FactoryBot.create(:category)
      task = FactoryBot.build(:task, :without_name, category: category)
      expect(task.save).to be false
    end

    it "is invalid without a description" do
      category = FactoryBot.create(:category)
      task = FactoryBot.build(:task, :without_desc, category: category)
      expect(task.save).to be false
    end
  end

  describe "Other CRUD operations" do
    # READ/GET
    it "gets all tasks" do
      category = FactoryBot.create(:category)
      tasks = FactoryBot.create_list(:task, 3, category: category)
      expect(tasks.length).to eq(3) 
      
      tasks.each do |task|
        expect(task.category).to eq(category)
      end
    end

    it "gets a single task" do 
      category = FactoryBot.create(:category)
      task = Task.create(name: "Task Name", description: "Task Description", category: category)

      expect(task.name).to eq("Task Name")
      expect(task.description).to eq("Task Description")
      expect(task.category).to eq(category)
    end

    # UPDATE
    it "updates a task's details" do
      category = FactoryBot.create(:category)
      task = Task.create(name: "Task Name", description: "Task Description", category: category)
      new_name = "New Name"
      new_description = "New Description"

      task.update(name: new_name, description: new_description)
      expect(task.name).to eq(new_name)
      expect(task.description).to eq(new_description)
    end

    # DELETE
    it "deletes a task" do
      category = FactoryBot.create(:category)
      task = FactoryBot.create(:task, category: category)

      expect { task.destroy }.to change {Task.count}.by(-1)
    end
  end

  describe "Association" do 
    it "belongs to a category" do
      association = Task.reflect_on_association(:category)
      expect(association.macro).to eq(:belongs_to)
    end
  end

end
