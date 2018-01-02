import json
from selenium import webdriver
from firebase import firebase
from functools import partial
from slot import Slot
from telegram_util import notify

with open("firebase_config.json", "r") as f:
    firebase_config = json.loads(f.read())
    auth = firebase.FirebaseAuthentication(firebase_config["secret"], firebase_config["email"], True, True)
    firebase = firebase.FirebaseApplication(firebase_config["url"], auth)

root = "/"

def get_user_credentials():
    user = firebase.get(root, "user")
    return user["username"], user["password"]

def check_bookings():
    firebase.get_async(root, "bookings", process_bookings)

def process_bookings(response):
    for d in response:
        slot = Slot.dict_to_slot(d)
        book(slot)
    check_bookings()

def update_slots(slots):
    data = list(map(Slot.get_dict, slots))
    firebase.put_async(root, "slots", data, None)
    firebase.get_async(root, "subscriptions", partial(compare_subscriptions, slots))

def compare_subscriptions(slots, response):
    slot_set = set(slots)   
    # convert dictionaries from firebase into list of slots
    subscriptions_book = map(Slot.dict_to_slot, filter(lambda d: d["autoBook"], response))
    for slot in (slot_set & set(subscriptions_book)):
        book(slot)
        
    subscriptions_notify = map(Slot.dict_to_slot, filter(lambda d:  not d["autoBook"], response))
    notify(slot_set & set(subscriptions_notify))

def book(slot):
    print("Booking", slot)
    
    login_url = "http://fablab/fablabbooking/Web/index.php"
    username, password = get_user_credentials()
    driver = webdriver.Chrome()
    driver.get(login_url)
    driver.find_element_by_name("email").send_keys(username)
    driver.find_element_by_name("password").send_keys(password)
    driver.find_elements_by_name("login")[1].click()

    booking_url = slot.get_link()
    driver.get(booking_url)
    driver.find_element_by_class_name("create").click()
    #driver.quit()

def notify(slots):
    data = list(map(Slot.get_dict, slots))
    print("Notify\n", data)
    #firebase.put_async(root, "notifications", data)
    messages = map(str, slots)
    notify(messages)

def load_fake_info():
    l = []
    l.append({"href": "reservation.php?rid=1&sid=1&rd=2017-12-19", "date": "19-12-2017", "start": "1630", "end": "1700", "autoBook": True})
    l.append({"href": "reservation.php?rid=1&sid=1&rd=2017-12-19", "date": "19-12-2017", "start": "1530", "end": "1600", "autoBook": False})
    firebase.put(root, "subscriptions", l)
                       
if __name__ == "__main__":
    load_fake_info()
    slots = map(Slot.dict_to_slot, firebase.get(root, "slots"))
    firebase.get_async(root, "subscriptions", partial(compare_subscriptions, slots))
