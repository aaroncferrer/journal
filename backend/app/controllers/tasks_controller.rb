require 'jwt_auth'

class TasksController < ApplicationController
    before_action :check_auth
    before_action :set_category
    before_action :set_task, only: [:show, :update, :destroy]

    def index
        tasks = @category.tasks
        render json: tasks, status: :ok
    end

    def show
        render json: @task, status: :ok
    end

    def create
        task = @category.tasks.build(task_params)
        task.user = @current_user

        if task.save
            render json: task, status: :created
        else
            render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        if @task.update(task_params)
            render json: @task, status: :ok
        else
            render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @task.destroy
        head :no_content
    end

    private

    def set_category
        @category = @current_user.categories.find(params[:category_id])
    end

    def task_params
        params.require(:task).permit(:name, :description)
    end

    def set_task
        @task = @category.tasks.find(params[:id])
        @task.user = @current_user
    end
end