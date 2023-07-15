require 'rails_helper'

RSpec.describe "Categories", type: :request do
  # GET #index
  describe "GET /categories" do
    it "returns a list of categories" do
      FactoryBot.create_list(:category, 3)
      get "/categories"
      
      expect(response).to have_http_status(200)
      categories = JSON.parse(response.body)
      expect(categories.length).to eq(3)
    end
  end

  # GET #show
  describe "GET /categories/:id" do
    it "returns a specific category" do
      category = FactoryBot.create(:category)
      
      get "/categories/#{category.id}"
      
      expect(response).to have_http_status(200)
      category_response = JSON.parse(response.body)
      expect(category_response["name"]).to eq(category.name)
    end
  end

  # POST #create
  describe "POST /categories" do
    it "creates a new category" do
      category_params = FactoryBot.attributes_for(:category)

      post "/categories", params: { category: category_params }

      expect(response).to have_http_status(201)
      new_category = JSON.parse(response.body)
      expect(new_category["name"]).to eq(category_params[:name])
    end
  end

  describe "POST /categories" do
    it "does not create an invalid category because of a duplicate name" do
      existing_category = FactoryBot.create(:category, name: "Existing Category")
      category_params = FactoryBot.attributes_for(:category, name: "Existing Category")

      post "/categories", params: { category: category_params }

      expect(response).to have_http_status(422)
      invalid_category = JSON.parse(response.body)
      expect(invalid_category["name"]).to include ("has already been taken")
    end
  end

  # PATCH #update
  describe "PATCH /categories/:id" do
    it "updates an existing category" do
      category = FactoryBot.create(:category)
      category_params = FactoryBot.attributes_for(:category, name: "Updated Category")

      patch "/categories/#{category.id}", params: { category: category_params }

      expect(response).to have_http_status(200)
      updated_category = JSON.parse(response.body)
      expect(updated_category["name"]).to eq("Updated Category")
    end
  end

  describe "PATCH /categories/:id" do
    it "does not update category name because it's already taken" do
      category1 = FactoryBot.create(:category, name: "Category 1")
      category2 = FactoryBot.create(:category, name: "Category 2")
      category_params = FactoryBot.attributes_for(:category, name: "Category 1")

      patch "/categories/#{category2.id}", params: { category: category_params }

      expect(response).to have_http_status(422)
      invalid_category = JSON.parse(response.body)
      expect(invalid_category["name"]).to include ("has already been taken")
    end
  end

  # DELETE #destroy
  describe "DELETE /categories/:id" do
    it "deletes an existing category" do
      category = FactoryBot.create(:category)

      expect {
        delete "/categories/#{category.id}"
      }.to change {Category.count}.by(-1)

      expect(response).to have_http_status(204)
    end
  end
  
end
