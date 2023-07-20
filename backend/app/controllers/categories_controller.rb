require 'jwt_auth'

class CategoriesController < ApplicationController
  before_action :check_auth
  before_action :set_category, only: [:show, :update, :destroy]

  def index
    categories = @current_user.categories
    render json: categories, status: :ok
  end

  def show
    render json: @category, status: :ok
  end

  def create
    category = @current_user.categories.build(category_params)
    if category.save
      render json: category, status: :created
    else
      render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @category.update(category_params)
      render json: @category, status: :ok
    else
      render json: { errors: @category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @category.destroy
    head :no_content
  end

  private

  def category_params
    params.require(:category).permit(:name, :description)
  end

  def set_category
    @category = @current_user.categories.find(params[:id])
  end
  
end