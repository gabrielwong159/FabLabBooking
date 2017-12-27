import json
from selenium import webdriver
from firebase import firebase
from functools import partial
from slot import Slot

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
    data = list(map(lambda s: s.get_dict(), slots))
    firebase.put_async(root, "slots", data, None)
    firebase.get_async(root, "subscriptions", partial(compare_subscriptions, slots))

def compare_subscriptions(slots, response):
    # convert dictionaries from firebase into list of slots
    subscriptions = list(map(Slot.dict_to_slot, response))
    common_slots = set(slots) & set(subscriptions)
    for slot in common_slots:
        book(slot)

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

def load_fake_info():
    l = []
    l.append({"date": "19-12-2017", "start": "1630", "end": "1700"})
    l.append({"date": "19-12-2017", "start": "1530", "end": "1600"})
    firebase.put(root, "subscriptions", l)
                       
if __name__ == "__main__":
    load_fake_info()
    firebase.get_async(root, "subscriptions", partial(compare_subscriptions, []))
