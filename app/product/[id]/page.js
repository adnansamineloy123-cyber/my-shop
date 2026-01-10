
"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ProductDetails() {
  const { id } = useParams(); // URL থেকে আইডি নম্বরটি নেবে
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // আপনার সেই SheetDB API ব্যবহার করে নির্দিষ্ট প্রোডাক্টের তথ্য আনা
    fetch(`https://sheetdb.io/api/v1/m33fi9ryxfogc/search?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data[0]); // সার্চ রেজাল্টের প্রথম প্রোডাক্টটি নেবে
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen text-xl font-bold">লোড হচ্ছে...</div>;
  if (!product) return <div className="text-center mt-20 text-red-500">দুঃখিত, পণ্যটি পাওয়া যায়নি!</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-10">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        
        {/* ১. প্রোডাক্টের বড় ছবি (বাম পাশে) */}
        <div className="w-full md:w-1/2 relative">
          <div className="bg-white p-4 border rounded-xl overflow-hidden">
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* ২. প্রোডাক্টের বিস্তারিত তথ্য (ডান পাশে) */}
        <div className="w-full md:w-1/2 flex flex-col justify-start">
          <nav className="text-xs text-gray-400 uppercase tracking-widest mb-4">
            হোম / কালেকশন / {product.name}
          </nav>
          
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 uppercase">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold text-yellow-700">৳{product.price}</span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 font-bold rounded">স্টকে আছে</span>
          </div>

          <div className="border-t border-b py-6 mb-6">
            <h3 className="text-sm font-bold uppercase mb-3 text-gray-800 tracking-tighter">পণ্যের বিস্তারিত:</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description || "এই পণ্যটি সম্পর্কে আরও জানতে আমাদের কল করুন। এটি অত্যন্ত উন্নতমানের এবং টেকসই ফ্যাব্রিক দিয়ে তৈরি।"}
            </p>
          </div>

          {/* অর্ডার বাটন */}
          <div className="flex flex-col gap-4">
            <button className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-yellow-600 transition-all">
              ব্যাগ-এ রাখুন
            </button>
            <button className="w-full border-2 border-black py-4 font-bold uppercase tracking-widest hover:bg-gray-100 transition-all">
              ফেসবুকে অর্ডার করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
    }
    
