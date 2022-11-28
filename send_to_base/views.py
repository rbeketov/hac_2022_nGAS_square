from django.shortcuts import render
from icalendar import Calendar, Event, vCalAddress, vText
from django.http import HttpResponse
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect
from pathlib import Path
import requests
import json
import os
import pytz

def send_data(request):
    url = 'http://127.0.0.1/new/new_rec/'

    myobj = {"sessionId": "403d93fc67420f3bf82da0de4edc4ca4b5ac448a12418114ff209ac03bcafb5e", "title": "fromVAVASTO", "desc": "qweqwr", "year": 2022, "month": 11, "day": 28, "hour": 16, "min": 20, "subj": "Fizzzz", "exam": "0", "mark": 9}
    requests.post(url, json = myobj)
    return HttpResponse('Ok')

@csrf_exempt
def make_cal(request):
    json_data = json.loads(request.body)
    with open('log.txt', 'w') as log:
        log.write(str(json_data))
    cal = Calendar()


    for i in json_data['data']:
        event = Event()
        event.add('SUMMARY', i['subj'])
        event.add('description', i['desc'])
        event.add('dtstart', datetime(int(i['year']), int(i['month']), int(i['day']), int(i['hour']) - 1, int(i['min']), 0, tzinfo=pytz.utc))
        event.add('dtend', datetime(int(i['year']), int(i['month']), int(i['day']), int(i['hour']), int(i['min']), 0, tzinfo=pytz.utc))
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
    return HttpResponse(200)



# Create your views here.
