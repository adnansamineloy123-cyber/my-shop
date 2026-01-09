"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // আপনার SheetDB লিঙ্ক থেকে ডাটা আনা হচ্ছে
    fetch('https://sheetdb.io/api/v1/w51cfqk66hrnb')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', padding: '15px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#333', fontSize: '28px' }}>🛍️ আমার অনলাইন শপ</h1>
        <p style={{ color: '#666' }}>সেরা পণ্য, সঠিক দাম!</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map((p, index) => (
          <div key={index} style={{ backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <img src={p.image_url} alt={p.name} style={{ width: '100%', height: '200px', objectCover: 'cover' }} />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{p.name}</h3>
              <p style={{ color: '#777', fontSize: '14px', height: '40px', overflow: 'hidden' }}>{p.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#e91e63' }}>৳{p.price}</span>
                <button 
  onClick={() => {
    const subject = encodeURIComponent(`নতুন অর্ডার: ${p.name}`);
    const body = encodeURIComponent(`প্রোডাক্ট: ${p.name}\nদাম: ${p.price}\n\nআমার নাম:\nঠিকানা:\nমোবাইল নাম্বার:`);
    window.location.href = `mailto:adnansamineloy123@gmail.com?subject=${subject}&body=${body}`;
  }}
  style={{ backgroundColor: '#0070f3', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}
>
  অর্ডার করুন
</button>
  
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  }
    
