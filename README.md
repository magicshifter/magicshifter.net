magicshifter.net
================

the page at magicshifter.net


developing
===

comes with a makescript
```bash
# install needed dependencies
make install

# build for local preview
# rootPath is set to "file:///" + process.cwd()  by default
# this allows you to just open the build/index.html file locally
make

# build for server deployment
# (rootPath is set to "/" by default)
make deploy

# make deploy's last line is commented, if you want to be able to
# just run make deploy and upload to the server automagically,
# uncomment the line and insert your server authentication credentials
# then run
make deploy

#delete the build directory
make clean

#delete node_modules and build directory
make uninstall

```


If make does not make:
```
# install needed dependencies
sudo npm install -g grunt
npm install

# build for local preview
# rootPath is set to "file:///" + process.cwd()  by default
# this allows you to just open the build/index.html file locally
grunt

# build for server deployment
grunt --root='/'

```
