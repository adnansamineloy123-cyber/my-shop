"use client";
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sheet2 থেকে অর্ডারের ডাটা আনা হচ্ছে
    fetch('https://sheetdb.io/api/v1/w51cfqk66hrnb?sheet=Sheet2')
      .then(res => res.json())
      .then(data => {
        setOrders(data.reverse()); // নতুন অর্ডারগুলো উপরে দেখাবে
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>অর্ডার লিস্ট লোড হচ্ছে...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#fff' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>📦 কাস্টমার অর্ডার লিস্ট</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>মোট অর্ডার: {orders.length}</p>
      
      <div style={{ overflowX: 'auto', marginTop: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
          <thead>
            <tr style={{ backgroundColor: '#0070f3', color: '#fff' }}>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>নাম</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>ফোন</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>ঠিকানা</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>প্রোডাক্ট ও পরিমাণ</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.customer_name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <a href={`tel:${order.phone_number}`} style={{ color: '#0070f3', textDecoration: 'none' }}>
                    {order.phone_number}
                  </a>
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.address}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.product_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
    }
  
