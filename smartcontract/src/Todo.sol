// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Todo {

    uint32 public idCount;

    constructor() {
        idCount = 1;
    }

    event TaskCreated (
        uint32 id,
        string title,
        bool completed
    );

    event TaskToggled (
        uint32 id,
        bool completed
    );

    event TaskDeleted (
        uint32 id
    );

    struct Task {
        uint32 id;
        string title;
        bool completed;
    }

    Task[] public taskList;

    function addTask(string memory _title) public {
        taskList.push(Task(idCount, _title, false));
        emit TaskCreated(idCount, _title, false);
        idCount++;
    }
    
    function getAllTask() public view returns(Task[] memory) {
        Task[] memory tasks = new Task[](taskList.length);
        for(uint i = 0; i < taskList.length; i++) {
            tasks[i] = taskList[i];
        }
        return tasks;
    }

    function toggleTask(uint32 _taskId) public {
        require(_taskId >= 1 && _taskId < idCount, "Specified task ID not found...");
        for (uint32 i = 0; i < taskList.length; i++) {
            if (taskList[i].id == _taskId) {
                bool currentValue = taskList[i].completed;
                taskList[i].completed = !currentValue;
                emit TaskToggled(i, false);
            }
        }       
    }

    function deleteTask(uint32 _taskId) public returns(string memory result) {
        require(_taskId >= 1 && _taskId < idCount, "Specified task ID not found...");
        
        for (uint32 i = 0; i < taskList.length; i++) {
            if (taskList[i].id == _taskId) {
                taskList[i] = taskList[taskList.length - 1];
                taskList.pop();
                emit TaskDeleted(_taskId);
                return "Task Deleted Successfully!";
            }
        }
    }
    
}