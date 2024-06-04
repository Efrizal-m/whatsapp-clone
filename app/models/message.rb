class Message < ApplicationRecord
  belongs_to :chatroom
  after_create_commit { broadcast_to_chatroom }

  private

  def broadcast_to_chatroom
    ChatroomChannel.broadcast_to(chatroom, self)
  end
end
