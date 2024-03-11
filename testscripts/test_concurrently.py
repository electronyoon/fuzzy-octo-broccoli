from google.cloud import pubsub_v1
from uuid import uuid4
import json
from multiprocessing.dummy import Pool

TOPIC_PATH = 'YOUR TOPIC HERE'
publisher = pubsub_v1.PublisherClient()

print("Generating data")
events = []
for i in range(20):
  data = {
    'run': i,
    'requestId': str(uuid4())
  }
  events.append(data)

def publishEvent(event):
  data = json.dumps(event).encode("utf-8")
  future = publisher.publish(TOPIC_PATH, data)
  print(future.result(), data)

print("Starting to send")
pool = Pool(5) # Number of concurrent threads
asyncresponse = pool.map(publishEvent, events)
pool.close()
pool.join()
print("Done")
