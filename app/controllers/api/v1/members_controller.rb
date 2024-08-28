class Api::V1::MembersController < ApplicationController
    include AuthenticationCheck
  
    before_action :is_user_logged_in
    before_action :set_member, only: [:show, :update, :destroy]
  
    # GET /members
    def index
      @members = Member.where(user_id: current_user.id)
      render json: {members: @members}
    end
  
    # GET /members/:id
    def show
      if check_access
        render json: @member, status: 200
      end
    end
  
    # POST /members
    def create
      @member = Member.new(member_params)
      @member.user_id = current_user.id
      if @member.save
        render json: @member, status: 201
      else
        render json: { error:
          "Unable to create member: #{@member.errors.full_messages.to_sentence}"},
          status: 400
      end
    end
  
    # PUT /members/:id
    def update
      if check_access
        if @member.update(member_params)
            render json: @member, status: 200
          else
            render json: { error: "Unable to update member: #{@member.errors.full_messages.to_sentence}" }, status: :bad_request
        end
      end
    end
  
    # DELETE /members/:id
    def destroy
      if check_access
        @member.destroy
        render json: { message: 'Member record successfully deleted.'}, status: 200
      end
    end
  
    private
  
    def member_params
      params.require(:member).permit(:first_name, :last_name)
    end
  
    def set_member
      @member = Member.find(params[:id])
    end
  
    def check_access
      if (@member.user_id != current_user.id) 
        render json: { message: "The current user is not authorized for that data."}, status: :unauthorized
        return false
      end
      true
    end
  end
