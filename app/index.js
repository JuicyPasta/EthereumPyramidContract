var Web3 = require('web3');

var showdown = require('showdown');


$(document).ready(function() {
    var text = document.getElementById('markdown').value,
    target = document.getElementById('markdown-html'),
    converter = new showdown.Converter(),
    html = converter.makeHtml(text);
    target.innerHTML = html;


    // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


    var counter = new FlipClock($('.clock'), 0, {
        clockFace: 'Counter'
    });
    // counter.setValue(x);
    // counter.increment();



    var apiKey = "18NSMDUY6IBA9QQYQVB8X4B8WFBCDYYJ16";

    $.get("https://api.etherscan.io/api",
        {
            module: 'logs',
            action: 'getLogs',
            fromBlock: '2000000',
            toBlock: 'latest',
            address:"0xa3cd526795430E251b66bdbD067E4B4AA9C1acbe",
            apikey: apiKey,
        }, function(data) {
            if (data.message === "OK") {
                for (var i = 0; i < data.result.length; i++) {
                    counter.increment();
                }
            }
        });


    $('.get-position').click(function(event) {
        $('.spinner').show();

        var address = $('.address').val();

        $.get("https://api.etherscan.io/api",
            {
                module: 'logs',
                action: 'getLogs',
                fromBlock: '2000000',
                toBlock: 'latest',
                address:"0xa3cd526795430E251b66bdbD067E4B4AA9C1acbe",
                apikey: apiKey,
            }, function(data) {
                console.log(data)
                console.log(data)
                console.log(data)
                if (data.message === "OK") {
                    $.each(data.result, function (item) {
                        var result = data.result[item];
                        console.log(result)
                        if (result.address === address) {
                            var newElm = $('<li/>')
                            .addClass('position')
                            .text('entries: ' + result.args._entries.c[0] + ' paid back by: ' + item.args._paybackStartNum.c[0])

                            $('position-response').append(newElm)

                            $('.spinner').hide();
                        }
                    })
                }
            });


        // pyramid.Joined({_member: address}, {fromBlock: 0, toBlock:'latest'}).watch(function(err, result) {
        //     if (err) return;
        //
        //     var newElm = $('<li/>')
        //     .addClass('position')
        //     .text('entries: ' + result.args._entries.c[0] + ' paid back by: ' + result.args._paybackStartNum.c[0])
        //
        //     $('position-response').append(newElm)
        //
        //
        //     $('.spinner').hide();
        //
        //     console.log(result.args)
        //     $(".position-response").append(newElm)
        //
        // });
    });

})

