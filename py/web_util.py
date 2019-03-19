import requests
import json
from bs4 import BeautifulSoup

import firebase_util as firebase
from slot import Slot

login_url = "https://edbooking.sutd.edu.sg/fablabbooking/Web/"
booking_url = "https://edbooking.sutd.edu.sg/fablabbooking/Web/schedule.php?sid=1"

def get_reservables(username, password):
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {"email": username, "password": password, "userType": "Student", "login": "submit", "resume": ""}

    sess = requests.session()
    r = sess.post(login_url, headers=headers, data=data, verify=False)
    assert "Sign Out" in r.text, "Possibly not logged in"
    r = sess.get(booking_url)
    assert "Laser Machine-Day" in r.text, "Not on laser cutter page"
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
