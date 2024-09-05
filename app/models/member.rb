class Member < ApplicationRecord
  belongs_to :user
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :user_id, presence: true
  has_many :facts
end