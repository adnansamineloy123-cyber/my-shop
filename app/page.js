"use client";
import React, { useState, useEffect } from 'react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/m33fi9ryxfogc')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log("API Error:", err));
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setActiveImg(product.image_url);
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* ব্যানার */}
      <section className="relative h-[400px] flex items-center justify-center text-white bg-black">
        <div className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8')" }}></div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-4xl font-black uppercase mb-2">নতুন কালেকশন ২০২৬</h2>
          <p className="opacity-80">ADNAN FASHION - প্রিমিয়াম পোশাকের সমাহার</p>
        </div>
      </section>

      {/* প্রোডাক্ট লিস্ট */}
      <div className="max-w-6xl mx-auto mt-12 px-4">
        <h3 className="text-2xl font-bold mb-8 border-l-4 border-yellow-600 pl-4">আমাদের পণ্যসমূহ</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((item) => (
            <div key={item.id} className="bg-white p-3 shadow-sm rounded-2xl">
              <div className="aspect-[3/4] overflow-hidden rounded-xl cursor-pointer" onClick={() => openModal(item)}>
                <img src={item.image_url} className="w-full h-full object-cover" alt={item.name} />
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-sm font-semibold truncate">{item.name}</h4>
                <p className="font-bold text-yellow-700">৳{item.price}</p>
                <button onClick={() => openModal(item)} className="w-full mt-3 bg-gray-900 text-white py-2 rounded-lg text-xs font-bold">বিস্তারিত দেখুন</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* পপ-আপ (Modal) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-4">
          <div className="bg-white w-full max-w-4xl rounded-t-3xl md:rounded-3xl overflow-hidden relative flex flex-col md:flex-row max-h-[95vh]">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full z-50 text-black">✕</button>
            
            {/* ছবি সেকশন */}
            <div className="w-full md:w-1/2 p-4 bg-gray-50 overflow-y-auto">
              <img src={activeImg} className="w-full aspect-[4/5] object-cover rounded-2xl mb-4 shadow-md" alt="Main" />
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[selectedProduct.image_url, selectedProduct.img2, selectedProduct.img3, selectedProduct.img4].map((img, i) => (
                  img && <img key={i} src={img} onClick={() => setActiveImg(img)} className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${activeImg === img ? 'border-yellow-600' : 'border-transparent'}`} />
                ))}
              </div>
            </div>

            {/* তথ্য সেকশন */}
            <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">
              <h2 className="text-2xl md:text-3xl font-black mb-2 uppercase">{selectedProduct.name}</h2>
              <p className="text-2xl font-bold text-yellow-700 mb-6">৳{selectedProduct.price}</p>
              <div className="border-t pt-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">বিবরণ:</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  {selectedProduct.description || "এই প্রিমিয়াম পোশাকটি আপনার জন্য বিশেষ যত্ন নিয়ে তৈরি করা হয়েছে। এটি আরামদায়ক এবং দীর্ঘস্থায়ী।"}
                </p>
                <button className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all">ব্যাগ-এ রাখুন</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
                        }
        
