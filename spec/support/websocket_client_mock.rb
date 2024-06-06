class WebSocketClientMock
    attr_reader :messages
  
    def initialize(url)
      @url = url
      @messages = []
    end
  
    def send_message(room, message)
      @messages << { room: room, message: message }
    end
  end
  