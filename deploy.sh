#!/bin/sh

#install needed packages for grunt
npm install


#remove build dir
rm -rf ./build

#compile css, html, js, grunt all that needs to be grunted
grunt --rootPathUrl=$1

#add your details here, this will prompt for your password or keyphrase
#scp -r jascha@jaeh.at:/home/jascha/test/ .