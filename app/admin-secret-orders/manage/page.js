"use client";
import { useState, useEffect } from 'react';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Default false রাখাই ভালো

  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({ name: '', price: '', image_url: '' });

  const ADMIN_USER = "admin";
  const ADMIN_PASS = "pass123";
  const API_URL = 'https://sheetdb.io/api/v1/w51cfqk66hrnb';

  // লগইন হওয়ার সাথে সাথে ডাটা ফেচ হবে
  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setIsLoggedIn(true);
    } else {
      alert("ইউজারনেম বা পাসওয়ার্ড ভুল!");
    }
  };

  // ডিলিট করার সময় name এর জায়গায় encodeURIComponent ব্যবহার করা নিরাপদ
  const handleDelete = async (index) => {
    if (confirm("আপনি কি নিশ্চিত?")) {
      const nameToDelete = products[index].name;
      await fetch(`${API_URL}/name/${encodeURIComponent(nameToDelete)}`, {
        method: 'DELETE',
      });
      fetchProducts();
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData({ ...products[index] }); // Spread operator ব্যবহার করে নতুন অবজেক্ট তৈরি
  };

  const handleUpdate = async () => {
    const originalName = products[editingIndex].name;
    await fetch(`${API_URL}/name/${encodeURIComponent(originalName)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: editData })
    });
    setEditingIndex(null);
    fetchProducts();
  };

  const handleAddNew = async () => {
    const name = prompt("প্রোডাক্টের নাম:");
    const price = prompt("প্রাইস:");
    const image_url = prompt("ছবির লিঙ্ক:");

    if (name && price) {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [{ name, price, image_url, id: Date.now() }] })
      });
      fetchProducts();
    }
  };

  // লগইন স্ক্রিন
  if (!isLoggedIn) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
        <div style={{ display: 'inline-block', padding: '30px', background: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h2>🔐 Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '10px', width: '200px' }} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '10px', width: '200px' }} />
            <button type="submit" style={{ padding: '10px 25px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>🛠️ Shop Manager</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={handleAddNew} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>➕ Add New Product</button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', fontSize: '20px' }}>লোড হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন।</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {products.map((p, i) => (
            <div key={i} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={p.image_url} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                <div>
                  <strong style={{ fontSize: '18px' }}>{p.name}</strong><br/>
                  <span style={{ color: '#666' }}>৳{p.price}</span>
                </div>
              </div>
              <div>
                <button onClick={() => handleEdit(i)} style={{ padding: '5px 12px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(i)} style={{ padding: '5px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingIndex !== null && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', width: '90%', maxWidth: '400px' }}>
            <h3>প্রোডাক্ট এডিট করুন</h3>
            <input type="text" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} style={{ width: '100%', marginBottom: '10px', padding: '10px', boxSizing: 'border-box' }} placeholder="নাম" />
            <input type="text" value={editData.price} onChange={e => setEditData({...editData, price: e.target.value})} style={{ width: '100%', marginBottom: '10px', padding: '10px', boxSizing: 'border-box' }} placeholder="দাম" />
            <input type="text" value={editData.image_url} onChange={e => setEditData({...editData, image_url: e.target.value})} style={{ width: '100%', marginBottom: '15px', padding: '10px', boxSizing: 'border-box' }} placeholder="ছবির ইউআরএল" />
            <button onClick={handleUpdate} style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '10px' }}>Update Now</button>
            <button onClick={() => setEditingIndex(null)} style={{ width: '100%', padding: '5px', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>বাতিল</button>
          </div>
        </div>
      )}
    </div>
  );
      }
  
