class Fact < ApplicationRecord
  validates :fact_text, presence: true
  validates :likes, presence: true
  validates :member_id, presence: true
  validates_associated :member
  belongs_to :member
end