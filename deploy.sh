#!/bin/sh

#install needed packages for grunt
npm install
#compile css, grunt all that needs to be grunted
grunt
#add your details here, this will prompt for your password or keyphrase
scp -r jascha@jaeh.at:/home/jascha/test/ .