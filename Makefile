#!/bin/sh

all:
	#install needed packages for grunt
	npm install;

	#remove build dir
	rm -rf ./build;

	#compile css, grunt all that needs to be grunted
	grunt --rootPathUrl=$1;
