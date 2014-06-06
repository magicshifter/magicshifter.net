#!/bin/bash

all:
	#remove build dir
	rm -rf ./build

	#grunt all that needs to be grunted
	grunt --rootPathUrl=${p}

install:
	sudo npm install -g grunt-cli
	#install needed packages for grunt
	npm install

uninstall:
	sudo npm remove -g grunt-cli
	#install needed packages for grunt
	rm -rf ./node_modules
	rm -rf ./build

deploy:
	#install needed packages for grunt
	npm install

	#remove build dir
	rm -rf ./build

	#compile css, grunt all that needs to be grunted
	grunt --rootPathUrl=${p} --deploy="true"

	#add your details here, this will prompt for your password or keyphrase
	#dont actually do it yet.
	#scp -r name@hostname:/var/www/html/ ./build/*

clean:
	rm -rf ./build