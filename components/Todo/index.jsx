import Checkbox from '../Checkbox';
import Date from './Date';
import Tags from './Tags';
import axios from 'axios';
import Cookies from 'js-cookie';
function Todo(props) {

  const handleDeleteTodo = async (e) => {
    var newTodoListData;
    const newTodoLists = props.todoLists.map(todoList => {
      if (todoList._id === props.activeListId) {
        newTodoListData = todoList.data.filter(todo => todo !== props.todo);
        return {...todoList, data: newTodoListData};
      }
      return todoList;
    })

    try { 
      const response = await axios.post('http://localhost:3000/api/updateTodo', { token: Cookies.get('token'), todo: newTodoListData, _id:  props.activeListId })
      console.log(response)
      props.setTodoLists(newTodoLists);
      e.stopPropagation();
    } catch (error) { 
      console.log(error)
    }

  }

  return (
    <div
      className="w-[35rem] h-20 px-3 rounded-lg bg-neutral-800 text-white relative
      flex items-center gap-3 cursor-pointer group"
      onClick={() => {
        props.setCreatorState('edit');
        console.log(props.todo)
        props.setDisplayedTodo(props.todo);
      }}
    >
      <button
        className="absolute right-3 top-2
        text-neutral-800 group-hover:text-neutral-300 transition z-10"
        onClick={(e) => { 
          e.stopPropagation();
          handleDeleteTodo(e);
        }}
      >
        ✕
      </button>
      <Checkbox
        todo={props.todo}
        todoLists={props.todoLists}
        setTodoLists={props.setTodoLists}
        activeListId={props.activeListId}
        checked={props.todo.checked}
        priority={props.todo.priority}
      />
      <div className="flex flex-col h-full w-full justify-center">
        <div className={`text-sm ${props.todo.checked && 'line-through'}`}>
          {props.todo.name}
        </div>
        <div className="flex flex-row w-full justify-between">
          <Date
            dateStart={props.todo.dateStart}
            dateEnd={props.todo.dateEnd}
          />
          <Tags tags={props.todo.tags} />
        </div>
      </div>
    </div>
  );
}

export default Todo;
