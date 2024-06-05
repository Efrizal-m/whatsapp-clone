class MessagesController < ApplicationController
  def index
    chatroom = Chatroom.find(params[:chatroom_id])
    messages = chatroom.messages
    render json: messages
  end

  def create
    chatroom = Chatroom.find(params[:message][:chatroom_id])
    user = User.find_or_create_by(username: params[:message][:username]) 
    message = chatroom.messages.create!(message_params.merge(user: user))
    ChatroomChannel.broadcast_to(chatroom, message)
    render json: message
  end

  private

  def message_params
    params.require(:message).permit(:content, :chatroom_id, :username)
  end
end
