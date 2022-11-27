from get_mark import get_mark
import json
import pandas as pd
import datetime 


def add_mark(accept_json_dict):

    date_now = datetime.datetime.now()
    deadline = datetime.datetime(accept_json_dict["year"], 
                                 accept_json_dict["month"], 
                                 accept_json_dict["day"],
                                 accept_json_dict["hour"],
                                 accept_json_dict["min"])

    dif = deadline - date_now
    hour = dif.days*24

    action = [accept_json_dict["subj"], hour, accept_json_dict["exam"]]
    mark = get_mark(action)

    accept_json_dict["mark"] = mark[0]
    
    return accept_json_dict

