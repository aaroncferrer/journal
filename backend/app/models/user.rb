class User < ApplicationRecord
  has_many :categories, dependent: :destroy
  has_many :tasks, through: :categories

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, confirmation: true
  has_secure_password
end
