pragma solidity ^0.4.25;

contract Messenger {
  string public message;

  function Messenger(string initialMessage) public {
    message = initialMessage;
  }

  function setMessage(string newMessage) public {
    message = newMessage;
  }
}
