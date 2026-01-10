"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ProductDetails() {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // আইডি না থাকলে কল করবে না
    if (!id) return;
    
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://sheetdb.io/api/v1/m33fi9ryxfogc/search?id=${id}`);
        const data = await res.json();
        if (data && data.length > 0) {
          setProduct(data[0]);
        }
      } catch (error) {
        console.error("ডাটা আনতে সমস্যা হয়েছে", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen font-bold">লোড হচ্ছে...</div>;
  if (!product) return <div className="text-center mt-20 text-red-500 font-bold">পণ্যটি পাওয়া যায়নি!</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-10 min-h-screen">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2">
          <div className="border rounded-2xl overflow-hidden shadow-sm bg-white">
            <img src={product.image_url} alt={product.name} className="w-full h-auto object-cover" />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 uppercase">{product.name}</h1>
          <p className="text-2xl font-bold text-yellow-700 mb-6">৳{product.price}</p>
          <div className="border-t border-gray-100 pt-6">
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description || "এই প্রিমিয়াম পণ্যটি সম্পর্কে বিস্তারিত জানতে আমাদের সাথে যোগাযোগ করুন।"}
            </p>
            <button className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-yellow-600">
              ব্যাগ-এ রাখুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
    }
  
