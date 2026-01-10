      "use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [products, setProducts] = useState([]);

  // আপনার দেওয়া SheetDB API থেকে প্রোডাক্ট আনা
  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/m33fi9ryxfogc')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="pb-10">
      
      {/* ১. হিরো সেকশন (ব্যাকগ্রাউন্ড ইমেজ ও টেক্সট) */}
      <section className="relative h-[450px] md:h-[600px] flex items-center justify-center text-white overflow-hidden">
        {/* ব্যাকগ্রাউন্ড ইমেজ (আপনার নমুনা অনুযায়ী) */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070')" }}
        >
          {/* কালো একটা আস্তরণ যাতে লেখা পরিষ্কার বোঝা যায় */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 animate-fade-in">
            নতুন কালেকশন ২০২৬
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 tracking-widest opacity-90">
            সেরা মানের পোশাক এখন আপনার হাতের মুঠোয়।
          </p>
          <button className="bg-yellow-600 text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
            এখনই কিনুন
          </button>
        </div>
      </section>

      {/* ২. আমাদের পণ্যসমূহ টাইটেল */}
      <div className="max-w-6xl mx-auto mt-12 px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-8 w-1.5 bg-yellow-600"></div>
          <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">আমাদের পণ্যসমূহ</h3>
        </div>

        {/* ৩. প্রোডাক্ট লিস্ট (গুগল শিট থেকে) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((item) => (
            <div key={item.id} className="product-card-shadow bg-white relative group">
              
              {/* ছবির ওপর ক্লিক করলে ডিটেইলস পেজে যাবে */}
              <Link href={`/product/${item.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img 
                    src={item.image_url} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  {/* আপনার সেই প্রিয় 'New' ব্যাজ (শিট থেকে 'tag' কলাম থাকলে ওটা দেখাবে) */}
                  <div className="promo-badge">
                    {item.tag || 'New'}
                  </div>
                </div>
              </Link>

              <div className="p-4 text-center">
                <h4 className="text-xs md:text-sm font-medium text-gray-600 uppercase mb-1 truncate">{item.name}</h4>
                <p className="text-base md:text-lg font-bold text-black mb-3">৳{item.price}</p>
                
                {/* ব্যাগ-এ রাখুন বাটন */}
                <button className="w-full bg-[#1e293b] text-white py-2 text-xs md:text-sm font-bold hover:bg-yellow-600 transition-colors duration-300">
                  ব্যাগ-এ রাখুন
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
            }
