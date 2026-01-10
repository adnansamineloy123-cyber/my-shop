import "./globals.css";

export const metadata = {
  title: "ADNAN FASHION | Modern Collection",
  description: "আপনার পছন্দের সেরা ফ্যাশন ব্র্যান্ড",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className="bg-gray-50 antialiased font-sans">
        {/* মেইন কন্টেইনার */}
        <div className="relative min-h-screen flex flex-col">
          
          {/* ১. স্থির (Sticky) হেডার */}
          <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-[100] px-4 flex justify-between items-center border-b border-gray-100">
            
            {/* বাম পাশে তিন লাইনের মেনু বাটন */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* মাঝে দোকানের নাম - রাজকীয় ফন্ট স্টাইল */}
            <div className="flex flex-col items-center">
              <h1 className="text-xl md:text-2xl font-black tracking-[0.2em] text-gray-900 uppercase">
                ADNAN<span className="text-yellow-600 font-extrabold">FASHION</span>
              </h1>
            </div>

            {/* ডানে কার্ট আইকন */}
            <div className="relative p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 118 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute top-0 right-0 bg-yellow-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                0
              </span>
            </div>
          </header>

          {/* ২. মেইন কন্টেন্ট এলাকা (হেডারের নিচে জায়গা রাখার জন্য pt-16 দেওয়া হয়েছে) */}
          <main className="flex-grow pt-16">
            {children}
          </main>

          {/* ৩. ছোট ফুটার */}
          <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
            <p>© ২০২৬ ADNAN FASHION. সর্বস্বত্ব সংরক্ষিত।</p>
          </footer>

        </div>
      </body>
    </html>
  );
    }
    
