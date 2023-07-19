class AddColumnToCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :categories, :task_count, :integer
  end
end
