import Calendar from "./Calendar";
import { AuthContext } from "../lib/AuthContext.js";
import { useContext } from "react";

function RightContainer(props) {
  const today = new Date();
  const isLoggedIn = useContext(AuthContext);
  today.setHours(0, 0, 0, 0);

  return (
    <div
      className="hidden xl:block fixed right-0 top-0 w-80 h-full bg-neutral-800"
    >
      <Calendar
        date={today}
        todoLists={props.todoLists}
        setTodoLists={props.setTodoLists}
        activeListId={props.activeListId}
      />
      <div className="w-full flex justify-around">
        <button 
          className="text-white bg-neutral-700 hover:bg-neutral-600 transition rounded-md p-1"
          onClick={() => {
            const newTodoLists = props.todoLists.map(todoList => {
              if (todoList.id == props.activeListId) {
                return {...todoList, filter: null};
              }
              return todoList;
            })
            props.setTodoLists(newTodoLists)
          }}
        >
          Clear Filter
        </button>
      </div>

      <div>
        {/* // add a button to log out  */}
        { isLoggedIn ? <button
          className="text-white bg-red-600 hover:bg-red-500 transition rounded-md p-1"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }} 
        >
          Log Out
        </button> : null }
      </div>
    </div>
  );
}

export default RightContainer;
