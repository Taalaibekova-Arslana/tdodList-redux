import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import scss from "./TodoItem.module.scss";
import { useSelector } from "react-redux";

const TodoItem = () => {
	const todos = useSelector((state) => state);
	const dispatch = useDispatch();
	const [edit, setEdit] = useState(null);
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [photo, setPhoto] = useState("");
	const [_, setIsCompleted] = useState(false);
	// const [completed, setCompleted] = useState(false);

	const deleteTodo = (id) => {
		dispatch({
			type: "deleteTodo",
			payload: { id },
		});
	};

	const editTodo = (item) => {
		setName(item.name);
		setAge(item.age);
		setPhoto(item.photo);
		setEdit(item.id);
	};
	const saveTodo = (id) => {
		dispatch({
			type: "saveTodo",
			payload: {
				id: id,
				newData: { name: name, age: age, photo: photo, completed: false },
			},
		});
		setEdit(null);
	};
	const cancelTodo = () => {
		setEdit(null);
	};

	const completedTodo = (id) => {
		dispatch({
			type: "completeTodo",
			payload: { id },
		});
		setIsCompleted((prevState) => !prevState);
	};

	return (
		<div className={scss.cards}>
			{todos.map((item, index) => (
				<div key={index} className={scss.card}>
					{edit === item.id ? (
						<>
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
								value={photo}
								onChange={(e) => setPhoto(e.target.value)}
							/>
							<Button variant="contained" onClick={() => saveTodo(item.id)}>
								Save
							</Button>
							<Button variant="contained" onClick={cancelTodo}>
								Cancel
							</Button>
						</>
					) : (
						<>
							<h1
								style={
									item.completed
										? { textDecoration: "line-through", color: "blue" }
										: { textDecoration: "none" }
								}>
								{item.name}
							</h1>
							<p>{item.age}</p>
							<img
								style={{ filter: item.completed ? "grayscale(100%)" : "none" }}
								src={item.photo}
								alt={item.name}
							/>
							<Button variant="outlined" onClick={() => deleteTodo(item.id)}>
								Delete
							</Button>
							<Button variant="outlined" onClick={() => editTodo(item)}>
								Edit
							</Button>
							<Button
								style={
									item.completed
										? { textDecoration: "line-through", color: "blue" }
										: { textDecoration: "none" }
								}
								variant="outlined"
								onClick={() => completedTodo(item.id)}>
								{item.completed ? "Uncompleted" : "Completed"}
							</Button>
						</>
					)}
				</div>
			))}
		</div>
	);
};

export default TodoItem;
