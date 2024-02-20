const initialState = []

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "addTodo":
      return [...state, action.payload]
    case "deleteTodo":
      return state.filter((name) => name.id !== action.payload.id)
    case "deleteTodoAll":
      return state.filter((name) => name.id === action.payload._id)
    case "saveTodo":
      return state.map((name) => {
        if (name.id === action.payload.id) {
          return { ...name, ...action.payload.newData }
        }
        return name;
      })
    case "completeTodo":
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    default:
      break;
  }
  return state;
}

export default Reducer