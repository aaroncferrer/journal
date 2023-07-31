require 'rails_helper'

RSpec.describe "Auths", type: :request do
  # POST signup
  describe "POST /signup" do
    it "creates a new user" do
      user_params = FactoryBot.attributes_for(:user)

      post "/signup", params: { user: user_params }

      expect(response).to have_http_status(201)
      user = JSON.parse(response.body)
      expect(user["email"]).to eq(user_params[:email])
    end

    it "doesn't create a new user if email is already taken" do
      existing_user = FactoryBot.create(:user, email: "taken@mail.com")
      user_params = FactoryBot.attributes_for(:user, email: "taken@mail.com")

      post "/signup", params: { user: user_params }

      expect(response).to have_http_status(422)
      invalid_user = JSON.parse(response.body)
      expect(invalid_user["errors"]).to include("Email has already been taken")
    end

    it "doesn't create a new user if passwords don't match" do
      user_params = FactoryBot.attributes_for(:user, password: "user123", password_confirmation: "user1234")

      post "/signup", params: { user: user_params }

      expect(response).to have_http_status(422)
      invalid_user = JSON.parse(response.body)
      expect(invalid_user["errors"]).to include("Password confirmation doesn't match Password")
    end
  end

  # POST login
  describe "POST /login" do
    before(:each) do
      @user = FactoryBot.create(:user, email: "test@example.com", password: "password")
    end

    it "returns JWT token on successful login" do
      login_params = {
        email: "test@example.com",
        password: "password"
      }
      post "/login", params: login_params

      expect(response).to have_http_status(200)
      expect(response.body).to include("token")
    end

    it "returns an error on failed login" do
      login_params = {
        email: "test@example.com",
        password: "wrong_password"
      }
      post "/login", params: login_params

      expect(response).to have_http_status(401)
      expect(response.body).to include("Invalid email or password")
    end
    
  end
end
