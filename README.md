# FabLabApp
The `FabLabApp` is an Android app that allows me to automatically book a laser cutting slot when available. This helps me to mitigate the issue of last minute slot cancelling, rendering a slot available but unused.

## About
The project has three major components:
* Android app - user interface
* Python backend - controls the booking via Selenium, and notification via Telegram bot
* Firebase - database to store and relay information between the app and backend

### Android App
The app allows the user to view all currently available slots. Through this screen, they are able to instantaneously select and book an available slot.

In the event that a desired slot is unavailable, the user can choose to subscribe to a particular timeslot. When the slot becomes available, the user will receive a message via Telegram. By opting for an `autoBook` option, the user can also automatically book the slot once it becomes available.

### Python backend
A Python script periodically checks subscriptions against available slots, and carries out the message notification or booking accordingly. Direct bookings are also checked and executed.

Due to the nature of the website, a webdriver was necessary to execute the booking. As such, Selenium on Python with PhantomJS was used.

Notification was carried out via Telegram bot, as I do not have an Android phone, and an Android app notification would go to nobody (my emulator).

### Firebase
Database

## Installation
React Native was used for the development of the Android app. All necessary packages are listed in the `package.json` file.

Python dependencies are listed in the `requirements.txt` file. They can be installed with `pip install -r requirements.txt`.

## Disclaimer
This app was developed for my own use. It is unoptimized for multiple simultaneous users or it might otherwise defeat the purpose of the app in the first place.
