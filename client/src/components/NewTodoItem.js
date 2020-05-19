import React, { useState } from "react";

export default function NewTodoItem({ onSubmit, onCancel }) {
	const [label, setLabel] = useState("New todo item");
	const [isCompleted, setCompleted] = useState(false);

	const submit = (e) => {
		e.preventDefault();
		onSubmit({ label, isCompleted });
	};

	const cancel = (e) => {
		e.preventDefault();
		onCancel();
	};

	return (
		<div>
			<h1>New TodoItem</h1>
			<div>
				<form onSubmit={submit}>
					<input
						type="text"
						placeholder="Entet todo item label"
						value={label}
						onChange={(e) => setLabel(e.target.value)}
						required
					/>
					<label htmlFor="completed">
						Completed?
						<input
							type="checkbox"
							name="completed"
							checked={isCompleted}
							onChange={(e) => setCompleted(e.target.checked)}
						/>
					</label>
					<a onClick={cancel}>cancel</a>
					<button type="submit" name="submit">
						add todoItem
					</button>
				</form>
			</div>
		</div>
	);
}
