pragma solidity ^0.4.25;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value >= .1 ether, "Message value must be 0.1 ETH or more");
        players.push(msg.sender);
    }

    // insecure function
    function random() private view returns (uint) {
        return uint(keccak256(now));
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address[](0);
    }

    modifier restricted() {
        require(
            msg.sender == manager,
            "This function is restricted to the Manager account."
        );
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}
