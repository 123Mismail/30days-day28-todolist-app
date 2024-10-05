"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
type Todos = {
  id: number;
  name: string;
  isCompleted: boolean;
};
const TodoListApp = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [updateTodos, setUpdateTodos] = useState<string>("");
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [isMounte, setMount] = useState<boolean>(false);

  //handel add todo


 
  // useEffect(()=>{
  //   if(todos){
  //     setMount(true)
  //     const localStoredTodo= localStorage.getItem("todos");
  //     if(localStoredTodo) 
  //     try {
  //       console.log(localStoredTodo ,"checking locall data ")
  //     setTodos(JSON.parse(localStoredTodo) as Todos[])
        
  //     } catch (error) {
  //       console.log(error,"error is this")
  //     }
  //   }
  
  // },[todos]);
 
  // useEffect(()=>{
  //   if(isMounte){
  //     localStorage.setItem("todos" ,JSON.stringify(todos) )
  //   }
  //    console.log(localStorage)
  // },[todos,isMounte])


  const handelAddTodo = () => {
    if (newTask.trim() !== "") {
      setTodos((todos) => [
        ...todos,
        { id: Date.now(), name: newTask, isCompleted: false },
      ]);
    }
    setNewTask("");
  };
  // handel edit todo
  const handelEdit = (id: number, name: string) => {
    if (name.trim() !== "") {
      setUpdateId(id);
      setUpdateTodos(name);
    }
  };

  //   handel updating todos

  const updateTodo = () => {
    if (updateTodos.trim() !== "") {
      setTodos((todos) =>
        todos.map((todo) =>
          todo.id == updateId
            ? { ...todo, id: Date.now(), name: updateTodos, isCompleted: false }
            : todo
        )
      );
    }
    setUpdateId(null);
    setUpdateTodos("");
  };
  //   handel delete btn

  const handelDelete = (id: number) => {
    setTodos((todos) => todos.filter((item) => item.id !== id));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-[550px] w-full">
        <CardHeader>
          <CardTitle className="test-center text-3xl font-semibold">
            Todo List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex gap-2">
              <Input
                id="name"
                className="rounded-xl text-base font-medium opacity-80"
                placeholder="Name of your todos "
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <Button
                className="bg-gray-900 text-white rounded-xl w-1/4"
                variant="outline"
                onClick={handelAddTodo}
              >
                Add
              </Button>
            </div>
          </div>
        </CardContent>

        {todos.length > 0 &&
          todos.map((todo, indx) => (
            <CardFooter
              className="flex justify-between space-x-3 max-h-[200px] "
              key={indx}
            >
              {todo.id == updateId && updateTodos && (
                <Input
                  id="name"
                  value={updateTodos}
                  onChange={(e) => setUpdateTodos(e.target.value)}
                  className="rounded-xl text-base font-medium opacity-80"
                  placeholder="Name of your todos "
                />
              )}
              <span className="w-4/6"> {todo.name} </span>
              {updateTodos !== "" && (
                <Button
                  className="rounded-xl bg-gray-700 text-white"
                  variant="outline"
                  onClick={updateTodo}
                >
                  Save
                </Button>
              )}
              {updateTodos === "" && (
                <Button
                  className="rounded-xl bg-gray-700 text-white"
                  variant="outline"
                  onClick={() => handelEdit(todo.id, todo.name)}
                >
                  Edit
                </Button>
              )}

              <Button
                variant="outline"
                className="bg-red-500 text-white rounded-xl "
                onClick={() => handelDelete(todo.id)}
              >
                Delete
              </Button>
            </CardFooter>
          ))}
      </Card>
    </div>
  );
};

export default TodoListApp;
