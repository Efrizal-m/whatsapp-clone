class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    stream_for Chatroom.find(params[:chatroom_id])
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    # Handle incoming data
    chatroom = Chatroom.find(data["chatroom_id"])
    message = chatroom.messages.create!(content: data["message"], username: data["username"])
    ChatroomChannel.broadcast_to(chatroom, message)
  end
end
