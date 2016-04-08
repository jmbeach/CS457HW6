all: run
run:
	mongo CS457 < commands.js
	./logerr.sh
search: 
	open /Applications/Google\ Chrome.app/ "http://www.google.com/search?q= $1"
