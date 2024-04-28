// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Todo {

    uint32 public idCount;
    uint32[] public taskIds;

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
        string title;
        bool completed;
    }

    mapping(uint => Task) public taskList;

    function addTask(string memory _title) public {
        taskList[idCount] = Task(_title, false);
        taskIds.push(idCount);
        emit TaskCreated(idCount, _title, false);
        idCount++;
    }
    
    function getAllTask() public view returns(Task[] memory) {
        Task[] memory tasks = new Task[](taskIds.length);
        for(uint i = 0; i < taskIds.length; i++) {
            tasks[i] = taskList[taskIds[i]];
        }
        return tasks;
    }

    function toggleTask(uint32 _taskId) public {
        require(_taskId >= 1 && _taskId < idCount, "Specified task ID not found...");
        bool currentValue = taskList[_taskId].completed;
        taskList[_taskId].completed = !currentValue;
        emit TaskToggled(_taskId, false);
    }

    function deleteTask(uint32 _taskId) public {
        require(_taskId >= 1 && _taskId < idCount, "Specified task ID not found...");
        delete(taskList[_taskId]);
        emit TaskDeleted(_taskId);
    }
    
}