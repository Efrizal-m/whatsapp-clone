require 'rails_helper'

RSpec.describe Message, type: :model do
  let(:chatroom) { create(:chatroom) }
  let(:message) { build(:message, chatroom: chatroom) }

  before do
    allow(ChatroomChannel).to receive(:broadcast_to)
  end

  it 'is valid with valid attributes' do
    expect(message).to be_valid
  end

  it 'is not valid without content' do
    message.content = nil
    expect(message).to_not be_valid
  end

  it 'belongs to a chatroom' do
    expect(message.chatroom).to eq(chatroom)
  end

  it 'broadcasts to the correct chatroom after creation' do
    message.save!
    expect(ChatroomChannel).to have_received(:broadcast_to).with(chatroom, message)
  end
end
