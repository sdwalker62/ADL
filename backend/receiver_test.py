import zmq

# Prepare the context and the subscriber socket
context = zmq.Context()
socket = context.socket(zmq.SUB)

# Connect to the publisher socket
HOST = "localhost"
PORT = 8096
socket.setsockopt(zmq.SUBSCRIBE, b"")
socket.connect("tcp://localhost:8096")
print(f"Listening to tcp://{HOST}:{PORT}")

# # Subscribe to all messages
# # You can change the string to subscribe to a specific topic
# socket.setsockopt_string(zmq.SUBSCRIBE, "")

try:
    while True:
        msg = socket.recv()
        msg = msg.decode("utf-8")
        if msg[0:12] == "HEALTH_CHECK":
            print("Sentinel is alive")
        else:
            msg_split = msg.split(",")
            file = msg_split[0]
            event = msg_split[1]
            print(f"Received {event} from {file}")

except KeyboardInterrupt:
    print("Interrupted")

finally:
    socket.close()
    context.term()
