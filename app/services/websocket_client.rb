require 'websocket-client-simple'

class WebSocketClient
  def initialize(url)
    @ws = WebSocket::Client::Simple.connect(url)

    @ws.on :message do |msg|
      puts "Received message: #{msg.data}"
    end

    @ws.on :open do
      puts 'Connected'
    end

    @ws.on :close do |e|
      puts 'Closed'
      p e
    end

    @ws.on :error do |e|
      puts 'Error'
      p e
    end
  end

  def send_message(room, message)
    @ws.send({ room: room, message: message }.to_json)
  end
end
