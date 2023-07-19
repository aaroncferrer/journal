require 'rails_helper'

RSpec.describe "Tasks", type: :request do
  before(:each) do
    @category = FactoryBot.create(:category)
  end

  # GET index
  describe "GET /categories/:category_id/tasks" do
    it "returns a list of tasks" do
      FactoryBot.create_list(:task, 3, category: @category )
      get "/categories/#{@category.id}/tasks"

      expect(response).to have_http_status(200)
      tasks = JSON.parse(response.body)
      expect(tasks.length).to eq(3)
    end
  end

  # GET show
  describe "GET /categories/:category_id/tasks/:id" do
    it "returns a specific task" do
      task = FactoryBot.create(:task, category: @category)
      get "/categories/#{@category.id}/tasks/#{task.id}"

      expect(response).to have_http_status(200)
      task_response = JSON.parse(response.body)
      expect(task_response["name"]).to eq(task.name)
    end
  end

  # POST create
  describe "POST /categories/:category_id/tasks" do
    it "creates a new task" do
      task_params = FactoryBot.attributes_for(:task)

      post "/categories/#{@category.id}/tasks", params: { task: task_params }

      expect(response).to have_http_status(201)
      new_task = JSON.parse(response.body)
      expect(new_task["name"]).to eq(task_params[:name])
    end

    it "does not create an invalid task because of a duplicate name" do
      existing_task = FactoryBot.create(:task, name: "Existing task", category: @category)
      task_params = FactoryBot.attributes_for(:task, name: "Existing task")

      post "/categories/#{@category.id}/tasks", params: { task: task_params }

      expect(response).to have_http_status(422)
      invalid_task = JSON.parse(response.body)
      expect(invalid_task["name"]).to include("has already been taken")
    end
  end

  #PATCH update
  describe "PATCH /categories/:category_id/tasks/:id" do
    it "updates an existing task" do 
      task = FactoryBot.create(:task, category: @category)
      task_params = FactoryBot.attributes_for(:task, name: "Updated Task")

      patch "/categories/#{@category.id}/tasks/#{task.id}", params: { task: task_params }

      expect(response).to have_http_status(200)
      updated_task = JSON.parse(response.body)
      expect(updated_task["name"]).to eq("Updated Task")
    end

    it "does not update task name because it's already taken" do
      task1 = FactoryBot.create(:task, name: "Task 1", category: @category)
      task2 = FactoryBot.create(:task, name: "Task 2", category: @category)
      task_params = FactoryBot.attributes_for(:task, name: "Task 1")

      patch "/categories/#{@category.id}/tasks/#{task2.id}", params: { task: task_params }

      expect(response).to have_http_status(422)
      invalid_task = JSON.parse(response.body)
      expect(invalid_task["name"]).to include("has already been taken")
    end
  end

  # DELETE destroy
  describe "DELETE /categories/:category_id/tasks/:id" do
    it "deletes an existing task" do
      task = FactoryBot.create(:task, category: @category)

      expect {
        delete "/categories/#{@category.id}/tasks/#{task.id}"
      }.to change { Task.count }.by(-1)

      expect(response).to have_http_status(204)
    end
  end
end
