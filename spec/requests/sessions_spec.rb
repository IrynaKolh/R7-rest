require 'swagger_helper'

describe 'sessions API' do
  #Creates swagger for documentaion for login
  path '/users/sign_in' do

    post 'Creates a session' do
      let(:user1) { FactoryBot.create(:user) }
      tags 'sessions'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :user, in: :body, required: true, schema: {
        type: :object,
        properties: { user: { properties: {
          email: { type: :string },
          password: { type: :string}
        }}},
        required: [ 'email', 'password' ]
      }

      response '201', 'session established' do
        let(:user) do
          { user: {
              email: user1.email,
              password: user1.password
          }}
        end
        run_test!
      end

      response '401', 'Unauthorized' do
        let(:user) do
          { user: {
              email: user1.email,
              password: ""
          } }
        end
        run_test!
      end
    end
  end


  path '/users/sign_out' do

    delete 'End user session' do
      before(:context) do
        # let(:user) { FactoryBot.create(:user) }
        sign_in FactoryBot.create(:user)
      end
      tags 'sessions'
      consumes 'application/json'
      produces 'application/json'

        response '200', 'session ended' do
          run_test!
        end
      # This one fails, as the user is no longer logged on
      response '401', 'no user logged on' do
        run_test!
      end
    end
  end
end