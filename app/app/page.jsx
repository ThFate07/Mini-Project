'use client';

import { useState, useEffect, useContext } from 'react';
import TodoCreator from '../../components/TodoCreator/index';
import LeftContainer from '../../components/LeftContainer';
import MidContainer from '../../components/MidContainer';
import RightContainer from '../../components/RightContainer';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const initTodo = {
  name: '',
  priority: 'low',
  dateStart: '',
  dateEnd: '',
  tags: [],
  checked: false
};

const initTodoList = () => (
  {
    id: nanoid(),
    name: 'New List',
    data: [],
    sort: null,
    filter: null,
  }
);

function App() {
  const [creatorState, setCreatorState] = useState('hidden');
  const [todoLists, setTodoLists] = useState([initTodoList()]);
  const [activeListId, setActiveListId] = useState(todoLists[0].id);
  const [displayedTodo, setDisplayedTodo] = useState(initTodo);
  const [username, setUsername] = useState("");


  useEffect(() => { 
    const username = Cookies.get('username');
    setUsername(username);
  }, []);

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setCreatorState('hidden');
      setDisplayedTodo(initTodo);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, [creatorState]);

  const todoCreatorProps = {
    todoLists,
    setTodoLists,
    activeListId,
    creatorState,
    setCreatorState,
    displayedTodo,
    setDisplayedTodo,
  };

  const leftContainerProps = {
    todoLists,
    username,
    setTodoLists,
    activeListId,
    setActiveListId,
  };

  const midContainerProps = {
    todoLists,
    setTodoLists,
    creatorState,
    setCreatorState,
    setDisplayedTodo,
    activeListId
  };

  const rightContainerProps = {
    todoLists,
    setTodoLists,
    activeListId,
  };

  return (
    <div className="font-sans w-screen min-h-screen h-full bg-neutral-900">
      {creatorState!=='hidden' && <TodoCreator {...todoCreatorProps} />}
      <LeftContainer {...leftContainerProps} />
      <MidContainer {...midContainerProps} />
      <RightContainer {...rightContainerProps} />
    </div>
  );
}

export default App;
