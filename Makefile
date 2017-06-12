
solidity:
	solc -o solidity/bin --overwrite --optimize --abi --bin --ast --asm solidity/pyramid.sol

bundle:
	./node_modules/.bin/webpack app/index.js dist/bundle.js
