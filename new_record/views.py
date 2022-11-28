import json
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse 
from django.views.decorators.csrf import csrf_exempt
import datetime 
import joblib
import pandas as pd
import requests

@csrf_exempt
def new_rec(request):
    json_data = json.loads(request.body)
   # json_data =  {"id": "1", "title": "example1", "desc": "типарь по физике", "year": 2022, "month": 11, "day": 28, "hour": 16, "min": 20, "subj": "Физика", "exam": "1", "mark": 9}
    marked_data = add_mark(json_data)
    myobj_str = str(json.dumps(marked_data))
    myobj_str_comb = "{\"data\":["  + str(myobj_str) 
    myobj_str_comb += "]}"
    url = 'https://dde0-195-19-42-150.eu.ngrok.io/api/user/addtask'
    #url = 'http://localhost/make_calendar/'
   
    with open('log.txt', 'w') as log:
        log.write(myobj_str_comb)
   
    requests.post(url, data = myobj_str_comb)
    return HttpResponse(myobj_str_comb)


def add_mark(accept_json_dict):

    date_now = datetime.datetime.now()
    deadline = datetime.datetime(int(accept_json_dict["year"]), 
                                 int(accept_json_dict["month"]), 
                                 int(accept_json_dict["day"]),
                                 int(accept_json_dict["hour"]),
                                 int(accept_json_dict["min"]))

    dif = deadline - date_now
    hour = dif.days*24

    action = [accept_json_dict["subj"], hour, accept_json_dict["exam"]]
    mark = get_mark(action)

    accept_json_dict["year"] = int(accept_json_dict["year"])
    accept_json_dict["month"] = int(accept_json_dict["month"])
    accept_json_dict["day"] = int(accept_json_dict["day"])
    accept_json_dict["hour"] = int(accept_json_dict["hour"])
    accept_json_dict["min"] = int(accept_json_dict["min"])
    
    
    accept_json_dict["mark"] = mark[0]
    
    return accept_json_dict

model = joblib.load("model.pkl")

def get_mark(action):
    if (type(action) != list):
        return float('inf')
    if (len(action) != 3):
        return float('inf')

    action_frame = pd.DataFrame({'subj': [], 
                     'deadline': [],
                     'exam': [] })
    
    action_frame.loc[len(action_frame.index)] = action
    y_pred = model.predict(action_frame)

    return y_pred

def view(request):
    responce = ""
    responce += "<div id="
    responce += '"'
    responce += str(978745)
    responce += '">'
    with open('log.txt', 'r') as log:
        lines = log.readlines()
    for i in lines:
        responce += i
    responce += "</div>"
    responce += "<form action = http://195.19.62.96/new> <button>Add new</button> </form>"
    return HttpResponse(responce)

def newview(request):
    x = {
        "data": [
         {"title": "fdg", "text": "fdv", "main": "dfv"},
         {"title": "fqweg", "text": "fdqwe", "main": "dewrv"}   
        ]
    }
    return JsonResponse(x, content_type = "application/json")
# Create your views here.
