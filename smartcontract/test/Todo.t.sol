// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Todo} from "../src/Todo.sol";

contract TodoTest is Test {
    Todo public todo;

    function testAddTask() public {
        uint initialIdCount = todo.idCount();
        string memory testTitle = "Test Title";
        todo.addTask(testTitle);
        assertEq(todo.idCount(), initialIdCount+1);
        emit log_named_string("Task added: ", testTitle);
    }

}
