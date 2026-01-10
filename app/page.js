"use client";
import React, { useState, useEffect } from 'react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(""); // মেইন ছবির জন্য

  // API থেকে ডাটা আনা
  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/m33fi9ryxfogc')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // পপ-আপ খোলার ফাংশন
  const openModal = (product) => {
    setSelectedProduct(product);
    setActiveImg(product.image_url); // শুরুতে প্রথম ছবিটা দেখাবে
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      
      {/* ১. হিরো ব্যানার */}
      <section className="relative h-[450px] flex items-center justify-center text-white bg-black">
        <div className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04')" }}></div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 tracking-tighter">নতুন কালেকশন ২০২৬</h2>
          <p className="text-lg opacity-90 tracking-widest uppercase">ADNAN FASHION - স্টাইলিশ পোশাকের ঠিকানা</p>
        </div>
      </section>

      {/* ২. প্রোডাক্ট গ্রিড */}
      <div className="max-w-6xl mx-auto mt-12 px-4">
        <h3 className="text-2xl font-bold mb-10 border-l-8 border-yellow-600 pl-4 uppercase">আমাদের পণ্যসমূহ</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((item) => (
            <div key={item.id} className="bg-white p-3 shadow-sm rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer" onClick={() => openModal(item)}>
                <img src={item.image_url} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={item.name} />
                <div className="absolute top-2 left-2 bg-yellow-600 text-white text-[10px] px-2 py-1 font-bold rounded">HOT</div>
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-sm font-semibold text-gray-700 truncate">{item.name}</h4>
                <p className="text-lg font-black text-black mt-1">৳{item.price}</p>
                <button onClick={() => openModal(item)} className="w-full mt-3 bg-gray-900 text-white py-2.5 rounded-lg text-xs font-bold hover:bg-yellow-600 transition-colors">বিস্তারিত দেখুন</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ৩. জাদুকরী পপ-আপ (Product Modal with Multiple Images) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden relative flex flex-col md:flex-row h-auto max-h-[90vh]">
            
            {/* ক্লোজ বাটন */}
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full z-50 text-black font-bold hover:bg-red-500 hover:text-white transition-all">✕</button>

            {/* বাম পাশে ছবি সেকশন (Slider style) */}
            <div className="w-full md:w-1/2 p-6 bg-gray-50 flex flex-col items-center">
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-inner mb-4">
                <img src={activeImg} className="w-full h-full object-cover animate-in fade-in duration-500" alt="Product" />
              </div>
              
              {/* থাম্বনেইল ইমেজ (৫-৬টা ছবির জায়গা) */}
              <div className="flex gap-2 overflow-x-auto w-full pb-2 scrollbar-hide">
                {[selectedProduct.image_url, selectedProduct.img2, selectedProduct.img3, selectedProduct.img4, selectedProduct.img5].map((img, index) => (
                  img && (
                    <img 
                      key={index}
                      src={img} 
                      onClick={() => setActiveImg(img)}
                      className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all ${activeImg === img ? 'border-yellow-600 scale-105' : 'border-transparent opacity-60'}`} 
                    />
                  )
                ))}
              </div>
            </div>

            {/* ডান পাশে ডিটেইলস সেকশন */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center overflow-y-auto">
              <span className="text-yellow-600 font-bold text-sm tracking-widest uppercase mb-2 block">Premium Quality</span>
              <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase leading-none">{selectedProduct.name}</h2>
              <p className="text-3xl font-bold text-black mb-6">৳{selectedProduct.price}</p>
              
              <div className="border-t pt-6 mb-8">
                <h4 className="font-bold text-gray-400 text-xs uppercase mb-3">পণ্যের বিবরণ:</h4>
                <p className="text-gray-600 leading-relaxed">
                  {selectedProduct.description || "এটি একটি এক্সক্লুসিভ ডিজাইনের পোশাক। আরামদায়ক ফেব্রিক এবং আধুনিক কাটিংয়ের সমন্বয়ে তৈরি এই পণ্যটি আপনার ফ্যাশনে যোগ করবে নতুন মাত্রা।"}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-yellow-600 active:scale-95 transition-all shadow-lg shadow-black/20">ব্যাগ-এ রাখুন</button>
                <button className="w-full border-2 border-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-100 transition-all">অর্ডার কনফার্ম করুন</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
            }
                    
