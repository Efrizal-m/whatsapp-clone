FactoryBot.define do
    factory :message do
      content { Faker::Lorem.sentence }
      association :chatroom
    end
  end
  