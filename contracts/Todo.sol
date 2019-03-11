pragma solidity ^0.4.24;

contract Todo {
    string[] tasks;
    event Foo(string description);

    // Read-only function (i.e will not trigger a transaction)
    function getTask(uint i) public view returns(string) {
        return tasks[i];
    }

    // Write function (i.e Will create a transaction)
    function addTask(string taskname) public {
        tasks.push(taskname);
    }

    
}