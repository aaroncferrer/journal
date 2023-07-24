require 'jwt_auth'

class AuthController < ApplicationController
  skip_before_action :check_auth

  def signup
    user = User.new(user_params)
    if user.save
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = JwtAuth.encode({ user_id: user.id })
      render json: { token: token, user: user.as_json(only: [:id, :first_name, :last_name, :email]) }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

end
