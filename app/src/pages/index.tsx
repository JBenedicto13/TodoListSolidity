import { Inter } from "next/font/google";
import { TodoItem } from "@/components/todoItem";
import { useState, useEffect } from "react";
import { BrowserProvider, JsonRpcSigner, ethers } from "ethers";
import { contractABI } from "@/contractABI/contractABI";
import { contractAddress } from "@/contractABI/contractAddress";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const sampleList = [
    { id: 1, name: "Task 1", completed: false },
    { id: 2, name: "Task 2", completed: false },
    { id: 3, name: "Task 3", completed: false },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  async function handleConnect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        setIsLoading(true);
        await ethereum.request({ method: "eth_requestAccounts" }).then(()=>setIsLoading(false));
        setIsConnected(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setProvider(provider);
        setSigner(signer);
        getTasks(provider);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function getTasks(_provider: BrowserProvider | null | undefined) {
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      _provider
    );
    try {
      setIsLoading(true);
      let res = await contract.getAllTask();
      let taskListString = JSON.stringify(res, null, 2);
      let tasklist = JSON.parse(taskListString);
      let formattedTasks = tasklist.map((item: any[], index: any) => ({
        id: index,
        name: item[0],
        completed: item[1],
      }));
      setTaskList(formattedTasks);
      setIsLoading(false);
      console.log("Tasks fetched successfully!");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  async function handleAddTask(e) {
    e.preventDefault();

    if (typeof window.ethereum !== "undefined") {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      try {
        setIsLoading(true);
        await contract.addTask(name).then(()=>setIsLoading(false));
        alert("Task added successfully");
        window.location.reload();
        setName("");
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    } else {
      console.log("Please install metamask");
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      {isLoading && <div id="loading-spinner" className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>}
      <h1 className="pb-5">Todo List DApp using Amoy Testnet</h1>
      <button onClick={()=>console.log(taskList)}>Get TaskList</button>
      {hasMetamask ? (
        <>
          {isConnected ? (
            <>
              <div className="flex items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#3fe470"
                      d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                    ></path>
                  </svg>
                </span>
                <h1>Connected</h1>
              </div>
              <div className="flex justify-center border-b border-b-slate-950 w-full p-3">
                <ul>
                  {taskList.map((task: any) => (
                    <TodoItem key={task.id} {...task} signer={signer} setIsLoading={setIsLoading} isLoading={isLoading} />
                  ))}
                </ul>
              </div>
              <div className="flex items-center flex-col w-full p-3">
                <h1>Add Task</h1>
                <form
                  onSubmit={(e) => handleAddTask(e)}
                  className="flex gap-2 flex-col"
                >
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                  />
                  <div className="flex">
                    <button
                      className="border border-slate-950 bg-gray-100 p-1"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#e43f3f"
                      d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                    ></path>
                  </svg>
                </span>
                <h1>Disconnected</h1>
              </div>
              <button
                className="border border-slate-950 bg-gray-100 p-1 mt-5"
                type="submit"
                onClick={() => handleConnect()}
              >
                Connect
              </button>
            </div>
          )}
        </>
      ) : (
        <h1>Please install metamask</h1>
      )}
    </main>
  );
}
