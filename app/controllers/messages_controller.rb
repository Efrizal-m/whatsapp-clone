class MessagesController < ApplicationController
  def index
    chatroom = Chatroom.find(params[:chatroom_id])
    messages = chatroom.messages
    render json: messages
  end

  def create
    message = Message.new(message_params)
    if message.save
      render json: message, status: :created
    else
      render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :chatroom_id)
  end
end
