require 'swagger_helper'

RSpec.describe 'user/registrations', type: :request do
  path '/users' do
    post 'create user' do
      tags 'Registrations'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :user, in: :body, required: true, schema: {
        type: :object,
        required: %i[email password],
        properties: { user: { properties: {
          email: { type: :string },
          password: { type: :string }
        }}}
      }
      response(201, 'successful') do
        let(:user1) { FactoryBot.attributes_for(:user) }
        let(:user) do
          { user: {
              email: user1[:email],
              password: user1[:password]
          }}
        end
        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end
  end
end