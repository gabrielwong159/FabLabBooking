from my_date_util import string_to_date, parse

class Slot(object):
    url_head = "http://fablab/fablabbooking/Web/"

    def dict_to_slot(d):
        day, month, year = d["date"].split("-")
        date = "-".join((year, month, day))
        start = "%3A".join((d["start"][:2], d["start"][2:], "00"))
        end = "%3A".join((d["end"][:2], d["end"][2:], "00"))

        raw_start = "%20".join((date, start))
        raw_end = "%20".join((date, end))
        return Slot(d["href"], raw_start, raw_end)

    def __init__(self, href, raw_start, raw_end):
        start_date, start_time = parse(raw_start)
        end_date, end_time = parse(raw_end)
        assert start_date == end_date, "Slot timings mismatch"

        self._href = href
        self._rd = raw_start.split("%20")[0]
        self._sd = raw_start
        self._ed = raw_end
        self._date = start_date
        self._start = start_time
        self._end = end_time

    def get_dict(self):
        return {"href": self._href, "date": self._date, "start": self._start, "end": self._end}

    def get_link(self):
        return Slot.url_head + self._href + "&sd={sd}&ed={ed}".format(sd=self._sd, ed=self._ed)

    def __repr__(self):
        return str(self)

    def __str__(self):
        return str(self.get_dict())

    def __lt__(self, other):
        return string_to_date(self._sd) < string_to_date(other._sd)

    def __eq__(self, other):
        checks = [self._rd == other._rd,
                  self._sd == other._sd,
                  self._ed == other._ed]
        return all(checks)

    def __hash__(self):
        return hash((self._rd, self._sd, self._ed))

    def pretty_print(self):
        return "Slot on {}, {} - {}".format(self._date, self._start, self._end)
    
if __name__ == "__main__":
    href = "reservation.php?rid=1&sid=1&rd=2017-12-19"
    raw_start = "2017-12-19%2010%3A00%3A00"
    raw_end = "2017-12-19%2010%3A30%3A00"
    slot = Slot(href, raw_start, raw_end)
    print(slot.get_link())
    assert str(slot) == "{'href': 'reservation.php?rid=1&sid=1&rd=2017-12-19', 'date': '19-12-2017', 'start': '1000', 'end': '1030'}", "Error with Slot.__str__"
    assert slot.get_dict() == {'href': 'reservation.php?rid=1&sid=1&rd=2017-12-19', 'date': '19-12-2017', 'start': '1000', 'end': '1030'}, "Error with Slot.get_dict"
    assert slot.get_link() == "http://fablab/fablabbooking/Web/reservation.php?rid=1&sid=1&rd=2017-12-19&sd=2017-12-19%2010%3A00%3A00&ed=2017-12-19%2010%3A30%3A00", "Error with Slot.get_link"

    test_dict = {'href': 'reservation.php?rid=1&sid=1&rd=2017-12-19', 'date': '19-12-2017', 'start': '1000', 'end': '1030'}
    test_slot = Slot.dict_to_slot(test_dict)
    assert test_slot.get_dict() == test_dict, "Error with Slot.dict_to_slot"
