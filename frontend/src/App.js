// src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expireDate, setExpireDate] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/items')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Error fetching items:', err));
  }, []);

  const addItem = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, quantity, expireDate }),
    })
      .then((res) => res.json())
      .then((newItem) => {
        setItems([...items, newItem]);
        setName('');
        setQuantity('');
        setExpireDate('');
      })
      .catch((err) => console.error('Error adding item:', err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Inventory Management</h1>
      <form onSubmit={addItem}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          type="date"
          value={expireDate}
          onChange={(e) => setExpireDate(e.target.value)}
          required
        />
        <button type="submit">Add Item</button>
      </form>

      <h2>Stock Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity} - Expiry: {item.expireDate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
