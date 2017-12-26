import requests
import json
from bs4 import BeautifulSoup
import firebaseutil as firebase
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
    time_start, time_end = attrs["data-start"], attrs["data-end"]
    #print(time_start, time_end, attrs["data-href"])
    return Slot(time_start, time_end)

def refresh_slots(username, password):
    reservables = get_reservables(username, password)
    slots = list(map(reservable_to_slot, reservables))
    firebase.update_slots(slots)

if __name__ == "__main__":
    username, password = firebase.get_user_credentials()
