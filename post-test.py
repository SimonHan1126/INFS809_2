#!/usr/bin/env python

#==================================================

'''

To make this work, send an HTTP POST request like this in python:

#--------------------------------------------------

#--------------------------------------------------

'''

#==================================================

from requests import post
import json

#==================================================

_DEBUG_ = True

server_ip = "192.168.1.50"
server_port = "5000"
server_endpoint = "articles"

uri = "http://{}:{}/{}".format(server_ip, server_port, server_endpoint)
headers = {'content-type': 'application/json'}

#==================================================

def send_data(data):
	if data is not None:
		if _DEBUG_:
			print("sending: {}".format(data))
		try:
			res = post(uri, data=json.dumps(data), headers=headers)
			if _DEBUG_:
				print("Response: {}".format(res))
		except Exception as e:
			print(e)

#==================================================

def main():
	title = 'Problem solving : some educational issues.'
	author = 'Jim Buchan'
	year = '1994'
	
	send_data({'title': title, 'author': author, 'year': year})

#==================================================

if __name__ == "__main__":
	main()

#==================================================
