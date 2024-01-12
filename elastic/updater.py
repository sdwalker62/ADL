import os
import zmq

from dotenv import load_dotenv
from elasticsearch import Elasticsearch

from elastic_utils import modify_entry, create_entry, delete_entry

load_dotenv("./elastic.env")



client = Elasticsearch(
    os.getenv("ES_URI"),
    ca_certs=os.getenv("HTTP_CERTIFICATE_PATH"),
    api_key=(
        os.getenv("API_KEY_ID"),
        os.getenv("API_KEY_SECRET")
    )
)




# Prepare the context and the subscriber socket
context = zmq.Context()
socket = context.socket(zmq.SUB)

# Connect to the publisher socket
HOST = "localhost"
PORT = 8096
socket.setsockopt(zmq.SUBSCRIBE, b"")
socket.connect(f"tcp://{HOST}:{PORT}")
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

            match event:
                case "MODIFY":
                    modify_entry(file, client)
                case "CREATE":
                    create_entry(file, client)
                case "DELETE":
                    delete_entry(file, client)
                case _:
                    print("Invalid message received.")

            print(f"Received {event} from {file}")

except KeyboardInterrupt:
    print("Interrupted")

finally:
    socket.close()
    context.term()
