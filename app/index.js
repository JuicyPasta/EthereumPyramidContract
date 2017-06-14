//var Web3 = require('web3');

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
    var contractAddress = "0xb978A5F4854274bc5196bC2a4633863CB3A0a6b7";
    var blockCreated = '3869896';

    $.get("https://api.etherscan.io/api",
        {
            module: 'logs',
            action: 'getLogs',
            fromBlock: blockCreated,
            toBlock: 'latest',
            address:contractAddress,
            apikey: apiKey,
        }, function(data) {
            if (data.message === "OK") {
                $.each(data.result, function (item) {
                    var result = data.result[item];
                    console.log(result.data)
                    var _entries = +result.data.substring(2, 66);
                    for (var i = 0; i < _entries; i++)
                        counter.increment();

                })
            }
        });


    $('.get-position').click(function(event) {
        $('.spinner').show();

        var address = $('#inputAddress').val();

        $.get("https://api.etherscan.io/api",
            {
                module: 'logs',
                action: 'getLogs',
                fromBlock: blockCreated,
                toBlock: 'latest',
                address:contractAddress,
                topic1:"0x000000000000000000000000" + address.substring(2).toLowerCase(),
                apikey: apiKey,
            }, function(data) {

                $(".no-data").hide();
                $('.position-response').empty()

                if (data.message === "OK" && data.result.length > 0) {
                    $.each(data.result, function (item) {
                        var result = data.result[item];
                        console.log(result.data)
                        var _entries = + result.data.substring(2, 66);
                        var _paybackNum = + result.data.substring(66);
                        _paybackNum = _paybackNum - _entries * 2;

                        var newElm = $('<li/>')
                        .addClass('position')
                        .innerHTML = ("<div class='position'> entries: " + _entries + '<br> start getting paid back at: ' + _paybackNum + "</div>");

                        $('.position-response').append(newElm)

                    })
                }else {
                    $(".no-data").show();
                }
                $('.spinner').hide();
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

