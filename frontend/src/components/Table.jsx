import axios from "axios";
import React, { useState } from "react";
import {
  MdOutlineDeleteOutline,
  MdEditNote,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import swal from 'sweetalert2'
import {confirmationDeleteReturn, success } from "message-next"

const Table = ({ todos, isLoading, setTodos }) => {
  const [editText, setEditText] = useState({
    body: "",
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`);
      const newList = todos.filter((todo) => todo.id !== id);
      setTodos(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/todo/${id}/`,
        value
      );
      console.log(response.data);
      const newTodos = todos.map((todo) =>
        todo.id === id ? response.data : todo
      );
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setEditText((prev) => ({
      ...prev,
      body: e.target.value,
    }));
    console.log(editText);
  };

  const handleClick = () => {
    handleEdit(editText.id, editText);
    setEditText({
      body: "",
    });
  };

  const handleCheckbox = (id, value) => {
    console.log(value.completed);
    handleEdit(id, {
      completed: !value,
    });
  };

   async function removeTodo(id) {
    const check = await confirmationDeleteReturn('Atenção',`Deseja realmente excluir este Item?`);
    if (check){
        handleDelete(id);
        success('Registro deletado com Sucesso.');
    }
}

  return (
    <div>
      <table className="w-11/12 max-w-4xl">
        <thead className="border-b-2 border-black">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Checkbox
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              To Do
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Status
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Date Created
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <div>Is Loading </div>
          ) : (
            <>
              {" "}
              {todos.map((todoItem, index) => (
                <tr key={todoItem.id} className="border-b border-black">
                  <td className="p-3">
                    <span
                      onClick={() =>
                        handleCheckbox(todoItem.id, todoItem.completed)
                      }
                      className="inline-block cursor-pointer"
                    >
                      {todoItem.completed === true ? (
                        <MdOutlineCheckBox />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank />
                      )}
                    </span>
                  </td>
                  <td className="p-3 text-sm " title={todoItem.id}>
                    {todoItem.body}
                  </td>
                  <td className="p-3 text-sm text-center">
                    <span
                      className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${
                        todoItem.completed ? "bg-green-300" : "bg-red-300"
                      }`}
                    >
                      {todoItem.completed ? "Done" : "Incomplete"}
                    </span>
                  </td>
                  <td className="p-3 text-sm font-medium">
                    {new Date(todoItem.created).toLocaleString()}
                  </td>
                  <td className="p-3 text-sm font-medium grid grid-flow-col items-center mt-5 ">
                    <span>
                      <label htmlFor="my-modal">
                        <MdEditNote
                          onClick={() => setEditText(todoItem)}
                          className=" text-xl cursor-pointer"
                        />
                      </label>
                    </span>
                    <span className=" text-xl cursor-pointer">
                      <MdOutlineDeleteOutline
                        onClick={() => removeTodo(todoItem.id)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>

      {/* Modal */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Todo</h3>
          <input
            type="text"
            value={editText.body}
            onChange={handleChange}
            placeholder="Type here"
            className="
    input
    w-48
    p-2
    border border-gray-300
    rounded
    text-base
  "
          />

          <div className="modal-action mt-5">
            <label
              htmlFor="my-modal"
              onClick={handleClick}
              className="bg-blue-500 text-white px-3 py-2 rounded-md mr-2"
            >
              Edit
            </label>
            <label
              htmlFor="my-modal"
              className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md"
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
