<<<<<<< HEAD
import json
from firebase import firebase
from functools import partial
from selenium import webdriver
from slot import Slot
from telegram_util import notify_message, notify_messages

with open("firebase_config.json", "r") as f:
    firebase_config = json.loads(f.read())
    auth = firebase.FirebaseAuthentication(firebase_config["secret"], firebase_config["email"], True, True)
    firebase = firebase.FirebaseApplication(firebase_config["url"], auth)

url = "https://edbooking.sutd.edu.sg/fablabbooking/Web/"
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
    data = [Slot.get_dict(slot) for slot in slots]
    print('Update slots', len(data))
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
    print('Found subscriptions', len(response))
    if response is None: return
    
    slot_set = set(slots)
    # convert dictionaries from firebase into list of slots
    subscriptions_book = map(Slot.dict_to_slot, filter(lambda v: v["autoBook"], response.values()))
    subscriptions_book = set(subscriptions_book)
    common_slots = find_common_slots(slot_set, subscriptions_book)
    for slot in common_slots:
        book(slot)

    subscriptions_notify = map(Slot.dict_to_slot, filter(lambda v: not v["autoBook"], response.values()))
    subscriptions_notify = set(subscriptions_notify)
    notify(find_common_slots(slot_set, subscriptions_notify))

    # new_subscriptions = {k:v for k,v in response.items() if not v["autoBook"]}
    # firebase.put_async(root, "subscriptions", new_subscriptions, None)

def book(slot):
    print("Booking", slot)
    
    username, password = get_user_credentials()
    driver = webdriver.Chrome()
    driver.get(url)
    driver.find_element_by_name("email").send_keys(username)
    driver.find_element_by_name("password").send_keys(password)
    driver.find_elements_by_name("login")[1].click()

    booking_url = slot.get_link()
    driver.get(booking_url)
    driver.find_element_by_class_name("create").click()
    driver.close()
    
    notify_message("Booked: " + slot.pretty_print())

def notify(slots):
    data = list(map(Slot.get_dict, slots))
    print("Notify\n", data)
    messages = map(lambda slot: slot.pretty_print(), slots)
    notify_messages(messages)

def load_fake_info():
    l = []
    l.append({"href": "reservation.php?rid=1&sid=1&rd=2017-12-19", "date": "19-12-2017", "start": "1630", "end": "1700", "autoBook": True})
    l.append({"href": "reservation.php?rid=1&sid=1&rd=2017-12-19", "date": "19-12-2017", "start": "1530", "end": "1600", "autoBook": False})
    firebase.put(root, "subscriptions", l)
                       
if __name__ == "__main__":
    # load_fake_info()
    slots = map(Slot.dict_to_slot, firebase.get(root, "slots"))
    firebase.get_async(root, "subscriptions", partial(compare_subscriptions, slots))
    # print(firebase.get(root, "subscriptions"))
