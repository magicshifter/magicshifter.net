magicshifter.net
================

the page at magicshifter.net

comes with a makescript
```bash
# install needed dependencies
make install

# build for local preview
# (rootPath is set to "file:///" + process.cwd()  by default)
make

# build for server deployment
# (rootPath is set to "/" by default)
make deploy

#delete the build directory
make clean

#delete node_modules
make uninstall

```
