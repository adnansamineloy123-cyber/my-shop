"use client";
import { useState, useEffect } from 'react';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  // এডিট করার জন্য স্টেট
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({ name: '', price: '', image_url: '' });

  // অ্যাডমিন ডিটেইলস (এগুলো আপনি আপনার মতো বদলে নিন)
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "pass123";

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const fetchProducts = () => {
    setLoading(true);
    fetch('https://sheetdb.io/api/v1/w51cfqk66hrnb')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setIsLoggedIn(true);
    } else {
      alert("ইউজারনেম বা পাসওয়ার্ড ভুল!");
    }
  };

  const handleDelete = async (index) => {
    if (confirm("আপনি কি নিশ্চিতভাবে এই প্রোডাক্টটি ডিলিট করতে চান?")) {
      // SheetDB তে ডিলিট করার নিয়ম হলো কোনো ইউনিক ভ্যালু দিয়ে ডিলিট করা
      // এখানে আমরা নাম দিয়ে ডিলিট করছি (সবচেয়ে সহজ উপায় আপনার বর্তমান শিটে)
      await fetch(`https://sheetdb.io/api/v1/w51cfqk66hrnb/name/${products[index].name}`, {
        method: 'DELETE',
      });
      fetchProducts();
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData(products[index]);
  };

  const handleUpdate = async () => {
    await fetch(`https://sheetdb.io/api/v1/w51cfqk66hrnb/name/${products[editingIndex].name}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: editData })
    });
    setEditingIndex(null);
    fetchProducts();
  };

  const handleAddNew = async () => {
    const name = prompt("প্রোডাক্টের নাম:");
    const price = prompt("প্রাইস (শুধু সংখ্যা):");
    const image_url = prompt("ছবির লিঙ্ক (URL):");

    if (name && price && image_url) {
      await fetch('https://sheetdb.io/api/v1/w51cfqk66hrnb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [{ name, price, image_url }] })
      });
      fetchProducts();
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
        <h2>🔐 ম্যানেজ পেজ লগইন</h2>
        <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left', gap: '10px' }}>
          <label>ইউজারনেম:</label><br/>
          <input type="text" onChange={e => setUsername(e.target.value)} style={{ marginBottom: '10px', padding: '8px' }} /><br/>
          <label>পাসওয়ার্ড:</label><br/>
          <input type="password" onChange={e => setPassword(e.target.value)} style={{ marginBottom: '10px', padding: '8px' }} /><br/>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}>লগইন</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>🛠️ প্রোডাক্ট ম্যানেজমেন্ট</h1>
      <button onClick={handleAddNew} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>➕ নতুন প্রোডাক্ট যোগ করুন</button>
      
      {loading ? <p>লোড হচ্ছে...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
          {products.map((p, i) => (
            <div key={i} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={p.image_url} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} />
                <div>
                  <strong>{p.name}</strong><br/>
                  <span>৳{p.price}</span>
                </div>
              </div>
              <div>
                <button onClick={() => handleEdit(i)} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(i)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* এডিট ফর্ম (পপআপ) */}
      {editingIndex !== null && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', width: '90%', maxWidth: '400px' }}>
            <h3>প্রোডাক্ট এডিট করুন</h3>
            <label>ছবির লিঙ্ক:</label>
            <input type="text" value={editData.image_url} onChange={e => setEditData({...editData, image_url: e.target.value})} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
            <label>নাম:</label>
            <input type="text" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
            <label>দাম:</label>
            <input type="number" value={editData.price} onChange={e => setEditData({...editData, price: e.target.value})} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
            <button onClick={handleUpdate} style={{ padding: '10px', backgroundColor: '#0070f3', color: '#fff', border: 'none', width: '100%', cursor: 'pointer' }}>Update</button>
            <button onClick={() => setEditingIndex(null)} style={{ marginTop: '10px', width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}>বাতিল</button>
          </div>
        </div>
      )}
    </div>
  );
    }
    
