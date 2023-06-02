import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 300,
});

/**
* This is the initial todo state.
* Instead of loading this data on every reload,
* we should save the todo state to local storage,
* and restore on page load. This will give us
* persistent storage.
*/
// const initialData: Todo[] = [
//   {
//     id: uuid(),
//     label: "Buy groceries",
//     checked: false,
//   },
//   {
//     id: uuid(),
//     label: "Reboot computer",
//     checked: false,
//   },
//   {
//     id: uuid(),
//     label: "Ace CoderPad interview",
//     checked: true,
//   },
// ];

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((label: string) => {
    if (!label.trim()) {
      return
    }
    const updatedTodos: Todo[] = [
      {
        id: uuid(),
        label,
        checked: false,
        createdAt: new Date(),
        completedAt: null,
      },
      ...todos,
    ];
    setTodos(updatedTodos);
  }, [todos.length]);

  useEffect(() => {
    const initialData: Todo[] = JSON.parse(localStorage.getItem('todoList'));
    if (initialData?.length) {
      setTodos(initialData);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todos));
  }, [todos]);

  const handleChange = useCallback((id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id == id) {
        return {
          ...todo,
          checked: !todo.checked,
          completedAt: todo.checked ? null : new Date()
        }
      }
      return todo;
    })
    setTodos(updatedTodos);
  }, [todos]);

  const handleCrossClick = useCallback((id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos);
  }, [todos]);

  const renderList = () => {
    const checkedList = todos.filter((todo) => todo.checked);
    const unCheckedList = todos.filter((todo) => !todo.checked);
    checkedList.sort((a, b) => {
      const aTime = a.completedAt instanceof Date ? a.completedAt.getTime() : 0;
      const bTime = b.completedAt instanceof Date ? b.completedAt.getTime() : 0;
      return aTime - bTime;
    });

    return (
      <>
        {unCheckedList.map((todo) => (
          <TodoItem {...todo} onChange={handleChange} key={todo.id} onCrossClick={handleCrossClick} />
        ))}
        {checkedList.map((todo) => (
          <TodoItem {...todo} onChange={handleChange} key={todo.id} onCrossClick={handleCrossClick} />
        ))}
      </>
    );
  }
  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {renderList()}
      </TodoList>
    </Wrapper>
  );
}

export default App;
