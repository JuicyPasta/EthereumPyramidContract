pragma solidity ^0.4.0;


contract Pyramid {
    address master;

    address[] memberQueue;
    uint queueFront;

    event Joined(address memberNew);

    modifier onlymaster { if (msg.sender == master) _; }

    function Pyramid() {
        master = msg.sender;
        memberQueue.push(master);
        queueFront = 0;
    }

    // triggers on simple payments, unfortunately it doesnt work to call join here (mentioned below)
    function(){}

    // NOTE: do not use a fallback function to call this, it will fail because send() is only allotted
    // 2300 gas (hardcoded value), you actually have to call join() with enough gas to execute
    function join() payable {
        require(msg.value >= 100 finney);

        memberQueue.push(msg.sender);

        if (memberQueue.length % 2 == 1) {
            address memberToPay = memberQueue[queueFront];
            queueFront += 1;

            // pay the person next in line in the pyramid
            // the contract will automatically keep the remainder
            memberToPay.send(180 finney); // does NOT throw on fail(returns)
        }

        Joined(msg.sender);

        // return any extra money
        if (msg.value > 100 finney) {
            msg.sender.send(msg.value - 100 finney);
        }
    }

    function withdrawFee() onlymaster {
        master.transfer(this.balance);
    }

    function setMaster(address _master) onlymaster {
        master = _master;
    }

}


