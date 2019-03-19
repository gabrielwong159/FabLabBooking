from selenium import webdriver
from slot import Slot

login_url = "http://fablab/fablabbooking/Web/index.php"

def webdriver_book(username, password, booking_url):
    driver = webdriver.Firefox()
    driver.get(login_url)
    driver.find_element_by_name("email").send_keys(username)
    driver.find_element_by_name("password").send_keys(password)
    driver.find_elements_by_name("login")[1].click()

    driver.get(booking_url)
    #driver.find_element_by_class_name("create").click()
    print(driver.find_element_by_class_name("create"))
    #driver.close()

