import React from "react";

export default function Navbar({
  activeTab,
  setActiveTab,
  currentRole,
  setRole,
  compareCount,
  openCompareModal,
}) {
  return (
    <header className="sticky top-0 z-50 bg-[#131c2e]/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setActiveTab("marketplace")}
        >
          <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#d4af37] to-amber-200 flex items-center justify-center text-[#0b0f19] font-bold text-xl shadow-lg">
            <i className="fa-solid fa-clock"></i>
          </div>
          <div>
            <span className="text-xl font-bold tracking-wider text-white">
              CHRONOS <span className="text-[#d4af37]">VAULT</span>
            </span>
            <span className="block text-[10px] tracking-widest text-slate-400 uppercase">
              Secure Escrow Marketplace
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab("marketplace")}
            className={`transition-colors flex items-center gap-2 ${activeTab === "marketplace" ? "text-[#d4af37]" : "text-slate-300 hover:text-[#d4af37]"}`}
          >
            <i className="fa-solid fa-store"></i> Marketplace
          </button>
          <button
            onClick={openCompareModal}
            className="text-slate-300 hover:text-[#d4af37] transition-colors flex items-center gap-2 relative"
          >
            <i className="fa-solid fa-scale-balanced"></i> Compare
            {compareCount > 0 && (
              <span className="bg-[#d4af37] text-[#0b0f19] text-xs font-bold px-1.5 py-0.5 rounded-full">
                {compareCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("buyer-orders")}
            className={`transition-colors flex items-center gap-2 ${activeTab === "buyer-orders" ? "text-[#d4af37]" : "text-slate-300 hover:text-[#d4af37]"}`}
          >
            <i className="fa-solid fa-box-open"></i> My Orders & Escrow
          </button>
        </nav>

        {/* Role Switcher */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex bg-slate-900 border border-slate-700 rounded-lg p-1">
            <button
              onClick={() => setRole("buyer")}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${currentRole === "buyer" ? "bg-[#d4af37] text-[#0b0f19]" : "text-slate-300"}`}
            >
              Buyer
            </button>
            <button
              onClick={() => {
                setRole("seller");
                setActiveTab("seller-dash");
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${currentRole === "seller" ? "bg-[#d4af37] text-[#0b0f19]" : "text-slate-300"}`}
            >
              Seller
            </button>
            <button
              onClick={() => {
                setRole("admin");
                setActiveTab("admin-dash");
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${currentRole === "admin" ? "bg-[#d4af37] text-[#0b0f19]" : "text-slate-300"}`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
