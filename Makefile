#!/bin/bash

all:
	#remove build dir
	rm -rf ./build

	#grunt all that needs to be grunted
	grunt --root=${p}

install:
	sudo npm install -g grunt-cli
	#install needed packages for grunt
	npm install

uninstall:
	#install needed packages for grunt
	rm -rf ./node_modules
	rm -rf ./build

deploy:
	#remove build dir
	rm -rf ./build

	#compile css, grunt all that needs to be grunted
	grunt --root=${p} --deploy="true"

	# This is the last part of the deploy task in the Makefile.
	# You add your name, hostname and serverside rootpath here,
	# this will prompt for your password or keyphrase everytime.
	# DO NOT ADD YOUR KEYPHRASE OR PASSWORD HERE!
	#scp -r name@hostname:/var/www/html/ ./build/*

clean:
	rm -rf ./build
