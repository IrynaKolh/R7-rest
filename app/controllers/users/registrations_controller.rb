class Users::RegistrationsController < Devise::RegistrationsController
    respond_to :json 
    skip_forgery_protection only: [:create]
  
    private
  
    def respond_with(resource, _opts = {})
      register_success && return if resource.persisted?
  
      register_failed resource
    end
  
    def register_success
      cookies["CSRF-TOKEN"] = form_authenticity_token
      response.set_header('X-CSRF-Token', form_authenticity_token)

      render json: { message: 'Signed up sucessfully.' }, status: :created
    end
  
    def register_failed resource
      render json: { message: resource.errors.full_messages }, status: :bad_request
    end
end