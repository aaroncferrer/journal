class Task < ApplicationRecord
  belongs_to :category

  validates :name, presence: true, uniqueness: true
  validates :description, presence: true, uniqueness: true

  attribute :done, :boolean, default: false
end
