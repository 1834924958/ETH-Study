pragma solidity ^0.5.0;

contract Ches
{
    string greeting;
    
    constructor (string memory _greeting) public 
    {
        greeting = _greeting;
    } 

    function greets () public view  returns (string memory){
        return greeting;
    }
    function setGreeting (string memory  _newgreeting) public 
    {
        greeting = _newgreeting;
    }
}