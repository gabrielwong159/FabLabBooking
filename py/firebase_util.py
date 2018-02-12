import json
from firebase import firebase
from functools import partial
from slot import Slot
from webdriver_util import webdriver_book
from telegram_util import notify_message, notify_messages

with open("firebase_config.json", "r") as f:
    firebase_config = json.loads(f.read())
    auth = firebase.FirebaseAuthentication(firebase_config["secret"], firebase_config["email"], True, True)
    firebase = firebase.FirebaseApplication(firebase_config["url"], auth)

url = "http://fablab/fablabbooking/Web/index.php"
root = "/"

def get_user_credentials():
    user = firebase.get(root, "user")
    return user["username"], user["password"]

def check_bookings():
    firebase.get_async(root, "bookings", process_bookings)

def process_bookings(response):
    if response is None: return
    
    for v in response.values():
        slot = Slot.dict_to_slot(v)
        book(slot)
    firebase.put_async(root, "bookings", None)

def update_slots(slots):
    data = list(map(Slot.get_dict, slots))
    firebase.put_async(root, "slots", data, None)
    firebase.get_async(root, "subscriptions", partial(compare_subscriptions, slots))

def find_common_slots(slots, other):
    res = []
    # this order is necessary, as `slots` can have duplicates (same time, different machine)
    for item in other:
        for slot in slots:
            if item == slot:
                res.append(slot)
                break
    return res

def compare_subscriptions(slots, response):
    if response is None: return
    
    slot_set = set(slots)
    # convert dictionaries from firebase into list of slots
    subscriptions_book = map(Slot.dict_to_slot, filter(lambda v: v["autoBook"], response.values()))
    subscriptions_book = set(subscriptions_book)
    for slot in (find_common_slots(slot_set, subscriptions_book)):
        book(slot)

    subscriptions_notify = map(Slot.dict_to_slot, filter(lambda v: not v["autoBook"], response.values()))
    subscriptions_notify = set(subscriptions_notify)
    notify(find_common_slots(slot_set, subscriptions_notify))

    new_subscriptions = {k:v for k,v in response.items() if not v["autoBook"]}
    firebase.put_async(root, "subscriptions", new_subscriptions, None)

def book(slot):
    print("Booking", slot)
    
    username, password = get_user_credentials()
    booking_url = slot.get_link()
    webdriver_book(username, password, booking_url)
    
    notify_message("Booked: " + slot.pretty_print())

def notify(slots):
    data = list(map(Slot.get_dict, slots))
    print("Notify\n", data)
    messages = map(lambda slot: slot.pretty_print(), slots)
    notify_messages(messages)

if __name__ == "__main__":
    slots = map(Slot.dict_to_slot, firebase.get(root, "slots"))
    firebase.get_async(root, "subscriptions", partial(compare_subscriptions, slots))
