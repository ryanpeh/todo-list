class TodosController < ApplicationController
  protect_from_forgery with: :null_session
  def index
    todos = Todo.order("created_at DESC")
    render json: todos
  end

  def create
    todo = Todo.create(todo_param)
    render json: todo
  end

  def update
    todo = Todo.find(params[:id])
    todo.update(todo_param)
    render json: todo
  end

  def show
    todo = Todo.find(params[:id])
    render json: todo
  end

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy
    head :no_content, status: :ok
  end
  
  private
    def todo_param
      params.require(:todo).permit(:title, :description, :tags, :completed, :due_date)
    end
end