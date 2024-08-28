# app/controllers/concerns/exception_handler.rb
module ExceptionHandler
    # provides the more graceful `included` method
    extend ActiveSupport::Concern
  
    included do
      rescue_from ActiveRecord::RecordNotFound do |e|
        render json: { error: e.message }, status: :not_found
      end
  
      rescue_from ActiveRecord::RecordInvalid do |e|
        render json: { error: e.message }, status: :unprocessable_entity
      end
  
      rescue_from ActionController::ParameterMissing do |e|
        render json: { error: e.message }, status: :unprocessable_entity
      end
    end
  end
  