import json
from firebase import firebase

with open("firebase_config.json", "r") as f:
    firebase_config = json.loads(f.read())
    auth = firebase.FirebaseAuthentication(firebase_config["secret"], firebase_config["email"], True, True)
    firebase = firebase.FirebaseApplication(firebase_config["url"], auth)

def load_fake_info():
    l = []
    l.append({"date": "2017-12-19", "start": "1630", "end": "1700"})
    l.append({"date": "2017-12-19", "start": "1530", "end": "1600"})
    firebase.put("/", "subscriptions", l)

if __name__ == "__main__":
    load_fake_info()
