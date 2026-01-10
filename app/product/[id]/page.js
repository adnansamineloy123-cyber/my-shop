"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // আপনার API থেকে ডাটা কল করা হচ্ছে
    fetch(`https://sheetdb.io/api/v1/m33fi9ryxfogc/search?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen font-bold text-gray-500">লোড হচ্ছে...</div>;
  if (!product) return <div className="text-center mt-20 text-red-500 font-bold">দুঃখিত, পণ্যটি পাওয়া যায়নি!</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-10 min-h-screen">
      <div className="flex flex-col md:flex-row gap-10">
        {/* প্রোডাক্ট ইমেজ */}
        <div className="w-full md:w-1/2">
          <div className="border rounded-2xl overflow-hidden shadow-sm bg-white">
            <img src={product.image_url} alt={product.name} className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* প্রোডাক্ট ডিটেইলস */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
            {product.name}
          </h1>
          <p className="text-2xl font-bold text-yellow-700 mb-6">৳{product.price}</p>
          
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">বিস্তারিত তথ্য:</h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description || "এই প্রিমিয়াম কোয়ালিটি পণ্যটি আপনার কালেকশনে যোগ করতে এখনই অর্ডার করুন। এটি অত্যন্ত আরামদায়ক এবং টেকসই।"}
            </p>
            
            <button className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-yellow-600 transition-all active:scale-95">
              ব্যাগ-এ রাখুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
    }
    
