import { useState } from "react";
import { useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { TextField, Button } from "@mui/material";
import scss from "./TodoList.module.scss";

const TodoList = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [photo, setPhoto] = useState("");

	const addTodo = () => {
		if (name === "" || age === "" || photo === "") {
			alert("Please enter");
		} else {
			dispatch({
				type: "addTodo",
				payload: {
					id: Math.random(),
					name: name,
					age: age,
					photo: photo,
					completed: false,
				},
			});
		}
		setName("");
		setAge("");
		setPhoto("");
	};
	const deleteTodo = (id) => {
		dispatch({
			type: "deleteTodoAll",
			payload: { id },
		});
	};
	return (
		<div className={scss.TodoList}>
			<h1>TodoList</h1>
			<div className={scss.inputs}>
				<TextField
					id="standard-basic"
					label="Name"
					variant="standard"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<TextField
					id="standard-basic"
					label="Age"
					variant="standard"
					value={age}
					onChange={(e) => setAge(e.target.value)}
				/>
				<TextField
					id="standard-basic"
					label="image"
					variant="standard"
					// type="date"
					value={photo}
					onChange={(e) => setPhoto(e.target.value)}
				/>
				<Button variant="outlined" onClick={addTodo}>
					Add
				</Button>
				<Button variant="outlined" onClick={deleteTodo}>
					Delete All
				</Button>
			</div>
			<TodoItem />
		</div>
	);
};

export default TodoList;
