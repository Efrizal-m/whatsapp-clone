module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :username

    def connect
      self.username = request.params[:username]
      reject_unauthorized_connection unless username.present?
    end
  end
end
