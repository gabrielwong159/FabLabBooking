function Slot(key, date, start, end, autoBook) {
	this.key = key;
	this.date = date;
	this.start = start;
	this.end = end;
	this.autoBook = autoBook || false;
}

export default Slot;