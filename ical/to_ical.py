from icalendar import Calendar, Event, vCalAddress, vText
from datetime import datetime
from pathlib import Path
import os
import pytz
import json

# init the calendar

cal = Calendar()


with open('log2.json', 'r') as log:
    data = json.load(log)


for i in data['data']:
    event = Event()
    event.add('SUMMARY', i['subj'])
    event.add('description', i['desc'])
    event.add('dtstart', datetime(i['year'], i['month'], i['day'], i['hour'] - 1, i['min'], 0, tzinfo=pytz.utc))
    event.add('dtend', datetime(i['year'], i['month'], i['day'], i['hour'], i['min'], 0, tzinfo=pytz.utc))
    cal.add_component(event)

# Write to disk
directory = Path.cwd() / 'MyCalendar'
try:
   directory.mkdir(parents=True, exist_ok=False)
except FileExistsError:
   print("Folder already exists")
else:
   print("Folder was created")
 
f = open(os.path.join(directory, 'calendar.ics'), 'wb')
f.write(cal.to_ical())
f.close()