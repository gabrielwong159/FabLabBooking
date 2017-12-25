from mydateutil import parse

class Slot(object):
    url_head = "fablab/fablabbooking/Web/"
    url_body = "reservation.php?rid=1&sid=1"

    def __init__(self, raw_start, raw_end):
        start_date, start_time = parse(raw_start)
        end_date, end_time = parse(raw_end)
        assert start_date == end_date, "Slot timings mismatch"

        self._rd = raw_start.split("%20")[0]
        self._sd = raw_start
        self._ed = raw_end
        self._date = start_date
        self._start = start_time
        self._end = end_time

    def __repr__(self):
        return str(self)

    def __str__(self):
        return str({"date": self._date, "start": self._start, "end": self._end})

    def get_link(self):
        return Slot.url_head + Slot.url_body + "&rd={rd}&sd={sd}&ed={ed}".format(rd=self._rd, sd=self._sd, ed=self._ed)

if __name__ == "__main__":
    raw_start = "2017-12-19%2010%3A00%3A00"
    raw_end = "2017-12-19%2010%3A30%3A00"
    slot = Slot(raw_start, raw_end)
    print(slot)
    print(slot.get_link())
