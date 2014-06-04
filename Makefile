#!/bin/sh

all:
	#install needed packages for grunt
	npm install;

	#remove build dir
	rm -rf ./build;

	#compile css, grunt all that needs to be grunted
	grunt --rootPathUrl=$1;

deploy:
	#install needed packages for grunt
	npm install;

	#remove build dir
	rm -rf ./build;

	#compile css, grunt all that needs to be grunted
	grunt --rootPathUrl=$1;

	#add your details here, this will prompt for your password or keyphrase
	#dont actually do it yet.
	#scp -r name@hostname:/var/www/html/ .