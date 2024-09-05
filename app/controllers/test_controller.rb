class TestController < ApplicationController
    include AuthenticationCheck
  
    before_action :is_user_logged_in
  
    def show
      render json: { message: "If you see this, you're logged in!" },
        status: :ok
    end
end
