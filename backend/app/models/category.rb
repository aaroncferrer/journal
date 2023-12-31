class Category < ApplicationRecord
    belongs_to :user
    has_many :tasks, dependent: :destroy
    
    validates :name, presence: true, uniqueness: true
    validates :description, presence: true, uniqueness: true

    def task_count
        tasks.count
    end
end
