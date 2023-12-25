import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get("http://localhost:8080/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => console.error(error));
  };

  const handleCheck = (id) => {
    axios
      .put(`http://localhost:8080/items/${id}`)
      .then((response) => {
        const updatedItems = items.map((item) => {
          if (item._id === id) {
            return { ...item, completed: !item.completed };
          }
          return item;
        });
        setItems(updatedItems);
      })
      .catch((error) => console.error(error));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/items", { name: newItem })
      .then((response) => {
        fetchItems();
        setNewItem("");
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/items/${id}`)
      .then((response) => {
        fetchItems();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Item Manager</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Enter Item Name"
          onChange={(e) => setNewItem(e.target.value)}
          value={newItem}
        />
        <input type="submit" value="Add" />
      </form>
      {items.length === 0 ? (
        <div>
          <h2>No items</h2>
        </div>
      ) : (
        items.map((item) => (
          <div key={item._id}>
            <button onClick={() => handleCheck(item._id)}>
              {item.completed ? "Done" : "Pending"}
            </button>
            {item.name}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
