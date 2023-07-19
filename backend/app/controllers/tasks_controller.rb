class TasksController < ApplicationController
    before_action :set_category
    before_action :set_task, only: [:show, :update, :destroy]

    # GET /categories/:category_id/tasks
    def index
        tasks = @category.tasks
        render json: tasks
    end

    # GET /categories/:category_id/tasks/:id
    def show
        render json: @task
    end

    # POST /categories/:category_id/tasks
    def create
        task = @category.tasks.build(task_params)

        if task.save
            render json: task, status: :created
        else 
            render json: task.errors, status: :unprocessable_entity
        end
    end

    # PATCH /categories/:category_id/tasks
    def update
        if @task.update(task_params)
            render json: @task
        else 
            render json: @task.errors, status: :unprocessable_entity
        end
    end

    # DELETE /categories/:category_id/tasks/:id
    def destroy
        @task.destroy
        head :no_content
    end

    private
    def set_category
        @category = Category.find(params[:category_id])
    end

    def set_task
        @task = @category.tasks.find(params[:id])
    end

    def task_params
        params.require(:task).permit(:name, :description)
    end
end
