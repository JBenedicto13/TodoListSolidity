export const contractABI = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "addTask",
    inputs: [{ name: "_title", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },    
  {
    type: "function",
    name: "deleteTask",
    inputs: [{ name: "_taskId", type: "uint32", internalType: "uint32" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAllTask",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct Todo.Task[]",
        components: [
          { name: "title", type: "string", internalType: "string" },
          { name: "completed", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "idCount",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "taskIds",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "taskList",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "title", type: "string", internalType: "string" },
      { name: "completed", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "toggleTask",
    inputs: [{ name: "_taskId", type: "uint32", internalType: "uint32" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "TaskCreated",
    inputs: [
      { name: "id", type: "uint32", indexed: false, internalType: "uint32" },
      {
        name: "title",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "completed",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TaskDeleted",
    inputs: [
      { name: "id", type: "uint32", indexed: false, internalType: "uint32" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TaskToggled",
    inputs: [
      { name: "id", type: "uint32", indexed: false, internalType: "uint32" },
      {
        name: "completed",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
];
