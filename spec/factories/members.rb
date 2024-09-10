require 'faker'

FactoryBot.define do
  factory :member do 
    first_name { Faker::Name.name }
    last_name { Faker::Lorem.word }
    user
  end
end