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
  const totalPrice = selectedProduct ? (Number(selectedProduct.price) * quantity) + deliveryCharge : 0;

  const handleOrder = async () => {
    const orderData = {
      customer_name: customerInfo.name,
      phone_number: customerInfo.phone,
      address: customerInfo.address,
      product_name: `${selectedProduct.name} (Qty: ${quantity}) - Total: ${totalPrice} TK`
    };

    try {
      const response = await fetch('https://sheetdb.io/api/v1/w51cfqk66hrnb?sheet=Sheet2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [orderData] })
      });

      if (response.ok) {
        setIsOrdered(true);
        setTimeout(() => { 
          setIsOrdered(false); 
          setSelectedProduct(null);
          setQuantity(1);
          setCustomerInfo({ name: '', phone: '', address: '' });
        }, 3000);
      } else {
        alert("অর্ডার পাঠাতে সমস্যা হয়েছে।");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("ইন্টারনেট সংযোগ চেক করুন।");
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', padding: '0 15px 15px 15px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* স্ট্যাবল হেডার অংশ */}
      <header style={{ 
        textAlign: 'center', 
        position: 'sticky', 
        top: 0, 
        backgroundColor: '#f4f4f4', 
        zIndex: 100, 
        padding: '20px 0',
        borderBottom: '1px solid #ddd',
        marginBottom: '20px'
      }}>
        <h1 style={{ color: '#333', margin: 0 }}>🛍️ আমার অনলাইন শপ</h1>
        <p style={{ margin: '5px 0 0', color: '#666' }}>সেরা পণ্য, সঠিক দাম!</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {products.map((p, index) => (
          <div key={index} style={{ backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '15px' }}>
            <img src={p.image_url} alt={p.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px' }} />
            <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{p.name}</h3>
            <p style={{ fontWeight: 'bold', color: '#e91e63' }}>৳{p.price}</p>
            <button onClick={() => setSelectedProduct(p)} style={{ width: '100%', backgroundColor: '#0070f3', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>অর্ডার করুন</button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1001 }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', width: '90%', maxWidth: '400px', maxHeight: '90vh', overflowY: 'auto' }}>
            {isOrdered ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <h2 style={{ color: 'green' }}>✅ অর্ডার সফল হয়েছে!</h2>
                <p>আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: '18px' }}>অর্ডার: {selectedProduct.name}</h2>
                <input type="text" placeholder="আপনার নাম" value={customerInfo.name} style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px' }} onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} />
                <input type="text" placeholder="মোবাইল নম্বর" value={customerInfo.phone} style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px' }} onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} />
                <div style={{ margin: '10px 0' }}>
                   <label>পরিমাণ: </label>
                   <input type="number" min="1" value={quantity} style={{ width: '50px', padding: '5px' }} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} />
                </div>
                <textarea placeholder="ফুল ঠিকানা (গ্রাম, থানা, জেলা)" value={customerInfo.address} style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px', height: '80px' }} onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}></textarea>
                <p style={{ backgroundColor: '#fff9c4', padding: '10px', borderRadius: '5px' }}>ডেলিভারি চার্জ: ৳১৪০ | <b>মোট: ৳{totalPrice}</b></p>
                <button onClick={handleOrder} disabled={!customerInfo.name || !customerInfo.phone || !customerInfo.address} style={{ width: '100%', backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>অর্ডার কনফার্ম করুন</button>
                <button onClick={() => setSelectedProduct(null)} style={{ width: '100%', background: 'none', border: 'none', marginTop: '10px', color: 'red', cursor: 'pointer' }}>বন্ধ করুন</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
        }
          
