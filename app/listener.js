var Web3 = require('web3')
var web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'))

var abi = JSON.parse(fs.readFileSync('bin/Pyramid.abi'))
var Pyramid = web3.eth.contract(abi);
var pyramid = Pyramid.at("0xa3cd526795430e251b66bdbd067e4b4aa9c1acbe");

//console.log(pyramid)
var event = pyramid.Joined();

web3.eth.getBlock(48, function(err, res) {
console.log(err)
console.log(res)
})

event.watch(function(error, result){
    if (!error)
        console.log(result);
});

