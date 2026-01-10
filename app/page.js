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
        <div className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8')" }}></div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-2 tracking-tighter">নতুন কালেকশন ২০২৬</h2>
          <p className="text-lg opacity-80 uppercase tracking-widest">Adnan Fashion</p>
        </div>
      </section>

      {/* প্রোডাক্ট লিস্ট */}
      <div className="max-w-6xl mx-auto mt-12 px-4">
        <h3 className="text-xl font-extrabold mb-8 border-l-4 border-yellow-600 pl-4 uppercase">আমাদের পণ্যসমূহ</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {products.map((item) => (
            <div key={item.id} className="bg-white p-3 shadow-sm rounded-2xl hover:shadow-xl transition-all">
              <div className="aspect-[3/4] overflow-hidden rounded-xl cursor-pointer" onClick={() => openModal(item)}>
                <img src={item.image_url} className="w-full h-full object-cover" alt={item.name} />
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-sm font-bold text-gray-800 truncate">{item.name}</h4>
                <p className="font-black text-yellow-700 text-lg">৳{item.price}</p>
                <button onClick={() => openModal(item)} className="w-full mt-3 bg-gray-900 text-white py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all">বিস্তারিত দেখুন</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* কাস্টমার যা চেয়েছে: ছবি ও ডিটেইলস পপ-আপ */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-5 right-5 bg-gray-100 p-2 rounded-full z-50 text-black hover:bg-red-500 hover:text-white transition-all">✕</button>
            
            {/* ৫-৬টা ছবির সেকশন */}
            <div className="w-full md:w-1/2 p-6 bg-gray-50 flex flex-col items-center overflow-y-auto">
              <img src={activeImg} className="w-full aspect-[4/5] object-cover rounded-3xl mb-4 shadow-2xl" alt="Main" />
              <div className="flex gap-2 overflow-x-auto w-full pb-2 scrollbar-hide">
                {[selectedProduct.image_url, selectedProduct.img2, selectedProduct.img3, selectedProduct.img4, selectedProduct.img5].map((img, i) => (
                  img && <img key={i} src={img} onClick={() => setActiveImg(img)} className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-4 transition-all ${activeImg === img ? 'border-yellow-600 scale-105 shadow-md' : 'border-transparent opacity-50'}`} />
                ))}
              </div>
            </div>

            {/* তথ্য ও অর্ডার সেকশন */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-black mb-3 uppercase leading-tight text-gray-900">{selectedProduct.name}</h2>
              <p className="text-3xl font-bold text-yellow-700 mb-8 tracking-tighter">৳{selectedProduct.price}</p>
              <div className="border-t pt-6 mb-10">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">পণ্যের বিবরণ:</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {selectedProduct.description || "এটি একটি প্রিমিয়াম কোয়ালিটি ফ্যাব্রিক দিয়ে তৈরি পোশাক। আপনার প্রতিদিনের স্টাইলে আধুনিকতা যোগ করতে আজই ব্যাগ-এ রাখুন।"}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <button className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-yellow-600 transition-all active:scale-95">ব্যাগ-এ রাখুন</button>
                <button className="w-full border-2 border-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-100 transition-all">অর্ডার কনফার্ম করুন</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
            }
        
        
