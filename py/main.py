from threading import Timer
from web_util import refresh_slots
from firebase_util import check_bookings

def main():
    refresh_slots()
    check_bookings()
    Timer(15.0, main).start()

if __name__ == "__main__":
    main()
