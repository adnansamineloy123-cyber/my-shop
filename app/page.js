"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [isOrdered, setIsOrdered] = useState(false);

  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/w51cfqk66hrnb')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const deliveryCharge = 140;
  const totalPrice = selectedProduct ? (selectedProduct.price * quantity) + deliveryCharge : 0;

  const handleOrder = async () => {
    const orderData = {
      name: customerInfo.name,
      phone: customerInfo.phone,
      address: customerInfo.address,
      order_details: `${selectedProduct.name} (Qty: ${quantity}) - Total: ${totalPrice} TK`
    };

    // আপনার SheetDB লিঙ্ক ব্যবহার করে ডাটা পাঠানো হচ্ছে (Sheet2 তে)
    await fetch('https://sheetdb.io/api/v1/w51cfqk66hrnb?sheet=Sheet2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [orderData] })
    });

    setIsOrdered(true);
    setTimeout(() => { setIsOrdered(false); setSelectedProduct(null); }, 3000);
  };

  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', padding: '15px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#333' }}>🛍️সুডলিংপং অনলাইন শপ</h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {products.map((p, index) => (
          <div key={index} style={{ backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '15px' }}>
            <img src={p.image_url} alt={p.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
            <h3>{p.name}</h3>
            <p style={{ fontWeight: 'bold', color: '#e91e63' }}>৳{p.price}</p>
            <button onClick={() => setSelectedProduct(p)} style={{ width: '100%', backgroundColor: '#0070f3', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>অর্ডার করুন</button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', width: '90%', maxWidth: '400px' }}>
            {isOrdered ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <h2 style={{ color: 'green' }}>✅ অর্ডার সফল হয়েছে!</h2>
                <p>আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: '18px' }}>অর্ডার: {selectedProduct.name}</h2>
                <input type="text" placeholder="আপনার নাম" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd' }} onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} />
                <input type="number" placeholder="মোবাইল নম্বর" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd' }} onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} />
                <input type="number" placeholder="পরিমাণ" min="1" value={quantity} style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd' }} onChange={(e) => setQuantity(e.target.value)} />
                <textarea placeholder="ফুল ঠিকানা" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd' }} onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}></textarea>
                <p>ডেলিভারি চার্জ: ৳১৪০ | <b>মোট: ৳{totalPrice}</b></p>
                <button onClick={handleOrder} style={{ width: '100%', backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '12px', borderRadius: '5px', cursor: 'pointer' }}>অর্ডার কনফার্ম করুন</button>
                <button onClick={() => setSelectedProduct(null)} style={{ width: '100%', background: 'none', border: 'none', marginTop: '10px', color: 'red', cursor: 'pointer' }}>বন্ধ করুন</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
    }
      
