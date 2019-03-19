import datetime

def string_to_date(s):
    return datetime.datetime.strptime(s, "%Y-%m-%d%%20%H%%3A%M%%3A%S")

def date_to_string(d):
    return (d.strftime("%d-%m-%G"), d.strftime("%H%M"))

def parse(s):
    return date_to_string(string_to_date(s))

if __name__ == "__main__":
    print(parse("2017-12-19%2010%3A00%3A00"))
