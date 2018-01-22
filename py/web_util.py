import requests
import json
from bs4 import BeautifulSoup

import firebase_util as firebase
from slot import Slot

url = "http://fablab/fablabbooking/Web/index.php"

def get_reservables(username, password):
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {"email": username, "password": password, "userType": "Student", "login": "submit", "resume": ""}
    r = requests.post(url, headers=headers, data=data)
    assert "Sign Out" in r.text, "Possibly not logged in"
    soup = BeautifulSoup(r.text, "html.parser")

    return soup.find_all("td", attrs={"class": "reservable"})

def reservable_to_slot(reservable):
    attrs = reservable.attrs
    href, time_start, time_end = attrs["data-href"], attrs["data-start"], attrs["data-end"]
    return Slot(href, time_start, time_end)

def refresh_slots():
    username, password = firebase.get_user_credentials()
    reservables = get_reservables(username, password)
    slots = list(map(reservable_to_slot, reservables))
    print(len(slots), "slots found")
    firebase.update_slots(slots)
