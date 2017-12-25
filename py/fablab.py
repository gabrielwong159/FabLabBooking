import requests
import json
from bs4 import BeautifulSoup
from slot import Slot

url = "http://fablab/fablabbooking/Web/index.php"

def login(username, password):
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {"email": username, "password": password, "userType": "Student", "login": "submit", "resume": ""}
    r = requests.post(url, headers=headers, data=data)
    assert "Sign Out" in r.text, "Possibly not logged in"
    soup = BeautifulSoup(r.text, "html.parser")

    reservables = soup.find_all("td", attrs={"class": "reservable"})
    assert len(reservables) > 0, "No available slot"
    return reservables

if __name__ == "__main__":
    with open("user_config.json", "r") as f:
        config = json.loads(f.read())
        username, password = config["username"], config["password"]
    print(username, password)
    reservables = login(username, password)
    for slot in reservables:
        attrs = slot.attrs
        time_start, time_end = attrs["data-start"], attrs["data-end"]
        print(time_start, time_end, attrs["data-href"])
