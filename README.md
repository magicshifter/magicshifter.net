magicshifter.net
================

the page at magicshifter.net

comes with a makescript
	
	//install needed dependencies (grunt and grunt-contrib packages)
	make install

	//make build for local preview (rootPath is set to "file:///" + process.cwd()  by default)
	make

	//make build for server deployment (rootPath is set to "/" by default)
	make deploy

	//delete the build directory
	make clean

	//delete node_modules, grunt-cli
	make uninstall