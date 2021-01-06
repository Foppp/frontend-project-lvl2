install: install-deps

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npx -n --experimental-vm-modules jest --coverage

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test