class User < ApplicationRecord
  has_many :categories, dependent: :destroy
  has_many :tasks, through: :categories

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, confirmation: true
  has_secure_password
end
