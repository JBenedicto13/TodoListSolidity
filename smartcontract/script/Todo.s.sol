// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Todo} from "src/Todo.sol";

contract TodoScript is Script {
    function setUp() public {}

    function run() public {
        // uint privatekey = vm.envUint("DEV_PRIVATE_KEY");
        // address account = vm.addr(privatekey);

        // console.log("Account: ", account);

        vm.startBroadcast();
        new Todo();
        vm.stopBroadcast();
    }
}
