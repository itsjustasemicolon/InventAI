import React, { useState } from 'react';
import Home from '../../Home';

export function UpdateData() {
  const [form, setForm] = useState({ store_id: '', item_id: '', date: '', stock: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/update-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(data.message || 'Update successful');
    } catch (err) {
      setMessage('Update failed');
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-8">
      <Home HeadText={"Update Store Data (Store Only)"} />
      <div className="w-full flex flex-col items-center justify-center absolute z-10">
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4 max-w-md w-full">
          <input name="store_id" placeholder="Store ID" value={form.store_id} onChange={handleChange} />
          <input name="item_id" placeholder="Item ID" value={form.item_id} onChange={handleChange} />
          <input name="date" type="date" value={form.date} onChange={handleChange} />
          <input name="stock" placeholder="Stock" type="number" value={form.stock} onChange={handleChange} />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
          {message && <div>{message}</div>}
        </form>
      </div>
    </div>
  );
}
