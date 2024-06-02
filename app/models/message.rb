class Message < ApplicationRecord
  belongs_to :chatroom
  after_create_commit { broadcast_append_to "chatroom_#{self.chatroom_id}_messages" }
end
