class ApplicationController < ActionController::API
  before_action :check_auth

  def check_auth
    token = request.headers['Authorization']&.split(' ')&.last
    if token
      begin
        decoded_token = JwtAuth.decode(token)
        user_id = decoded_token['user_id']
        @current_user = User.find(user_id)
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound
        render json: { error: 'Invalid token or user not found' }, status: :unauthorized
      end
    else
      render json: { error: 'Authorization token missing' }, status: :unauthorized
    end
  end
end