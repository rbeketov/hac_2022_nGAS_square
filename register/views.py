import requests
import json
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.http import JsonResponse 
from django.shortcuts import redirect


def check_login(request):
    with open('log2.json', 'r') as log:
        data = json.load(log)
    return JsonResponse(data)

@csrf_exempt
def new_register(request):
    json_data = json.loads(request.body)
    with open('log2.json', 'w') as log:
        log.write(str(json_data))
    return HttpResponse(200)


    """
    url = 'https://1411-195-19-42-150.eu.ngrok.io/api/test'
    myobj = {'login': request.POST.get(), 'password': 'sada'}
    result = requests.post(url, json = myobj)
    with open('responce.txt', 'a') as log:
        log.write(result.text)
    response = HttpResponse("hello")
    response.set_cookie(
        'ss',
        '32sss1',
        max_age=None,
        expires=None,
        domain=None,
        secure=None,
    )
   
    #set_cookie(response, 'weter', 'ertegdgfd')
    return response

    response = HttpResponse('NO!')
    response.set_cookie('ABA', 'oeiwrpoi34p')
    if request.COOKIES.get('cookie_name') is None:
        #response.set_cookie('logged_in_status', 'never_use_this_ever')
        return response
      #  with open('log_reg.txt', 'a') as log:
       #     log.write(str(request.COOKIES.get))
    else:
        return response
        #with open('log_reg.txt', 'a') as log:
          #s  log.write("NO!")
    """

# Create your views here.
