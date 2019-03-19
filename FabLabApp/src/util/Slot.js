function Slot(key, href, date, start, end, autoBook) {
	this.key = key;
	this.href = href;
	this.date = date;
	this.start = start;
	this.end = end;
	this.autoBook = autoBook || false;
}

export default Slot;