class Message < ApplicationRecord
  belongs_to :chatroom
  belongs_to :user
  after_create_commit { broadcast_to_chatroom }
  validates :content, presence: true

  private

  def broadcast_to_chatroom
    ChatroomChannel.broadcast_to(chatroom, self)
  end
end
