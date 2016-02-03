NODE_MODULES=node_modules/.bin
GULP=${NODE_MODULES}/gulp

.PHONY: \
	all \
	build \
	help \
	dev

all: dev

dev:
	@echo "starting development environment"
	@${GULP}

build:
	@echo "starting production build"

	@NODE_ENV='production'; \
	@${GULP} server

	@echo "build finished"

help:
	@echo "\n\
	make tasks: \n\
	make       - starts development mode \n\
	make build - builds production files \n\
	"
