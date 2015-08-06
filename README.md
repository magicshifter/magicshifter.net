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
# this allows you to open the build/index.html file from the local filesystem
# it will also start grunt-contrib-watch and livereload.
make

# build for server deployment
# (rootPath is set to "/" by default)
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
