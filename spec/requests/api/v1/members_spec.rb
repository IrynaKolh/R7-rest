require 'swagger_helper'

RSpec.describe 'api/v1/members', type: :request do
  let!(:user) { FactoryBot.create(:user)}
  let!(:members) { FactoryBot.create_list(:member, 15, user: user)}
  let!(:member_id) { members.first.id }
  let!(:member) { FactoryBot.build(:member, user: user)}
  before(:each) do
    sign_in user
  end

  path '/api/v1/members' do

    get('list members') do
      tags 'Members'
      produces 'application/json'
      response(200, 'successful') do
        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end

    post('create member') do
      tags 'Members'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :member, in: :body, required: true, schema: {
        type: :object,
        required: %i[first_name last_name],
        properties: {
          first_name: { type: :string },
          last_name: { type: :string }
        }
      }

      response(201, 'successful') do
        
        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end
  end

  path '/api/v1/members/{id}' do
    parameter name: 'id', in: :path, type: :string, description: 'id'

    get('show member') do
      tags 'Members'
      response(200, 'successful') do
        let(:id) { member_id }

        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end

    patch('update member') do
      tags 'Members'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :member, in: :body, schema: {
        type: :object,
        properties: {
          first_name: { type: :string },
          last_name: { type: :string }
        }
      }
      response(200, 'successful') do
        let(:id) { member_id }
        let(:member) {{first_name: 'fred'}}
        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end

    put('update member') do
      tags 'Members'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :member, in: :body, schema: {
        type: :object,
        properties: {
          first_name: { type: :string },
          last_name: { type: :string }
        }
      }
      response(200, 'successful') do
        let(:id) { member_id }
        let(:member) {{first_name: 'fred'}}

        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end

    delete('delete member') do
      tags 'Members'
      response(200, 'successful') do
        let(:id) { member_id }

        after do |example|
          example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
        end
        run_test!
      end
    end
  end
end
