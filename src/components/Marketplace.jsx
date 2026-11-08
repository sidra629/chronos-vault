import React, { useState } from "react";

export default function Marketplace({
  watches,
  onSelectWatch,
  onToggleCompare,
  openSellerModal,
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = watches.filter((w) => {
    const matchesSearch = w.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      category === "all" || w.category.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-linear-to-r from-slate-900 via-[#131c2e] to-slate-900 border border-slate-800 p-8 md:p-12 shadow-2xl">
        <div className="max-w-2xl space-y-4">
          <span className="inline-block bg-[#d4af37]/10 text-[#d4af37] text-xs font-semibold px-3 py-1 rounded-full border border-[#d4af37]/20">
            Secure Multi-Vendor Escrow
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Discover & Trade Luxury Timepieces Safely
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Protected by our 7-step milestone escrow payment system.
          </p>
          <button
            onClick={openSellerModal}
            className="bg-[#d4af37] hover:bg-[#c19b2e] text-[#0b0f19] font-bold px-6 py-3 rounded-xl transition shadow-lg flex items-center gap-2"
          >
            List Your Watch
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#131c2e] p-4 rounded-xl border border-slate-800">
        <input
          type="text"
          placeholder="Search brand, model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 bg-[#0b0f19] border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#d4af37]"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[#0b0f19] border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300"
        >
          <option value="all">All Categories</option>
          <option value="Luxury">Luxury</option>
          <option value="Chronograph">Chronograph</option>
          <option value="Diver">Diver</option>
          <option value="Vintage">Vintage</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <p className="text-slate-400 col-span-full text-center py-8">
            No watches found matching your search.
          </p>
        ) : (
          filtered.map((w) => (
            <div
              key={w.id}
              className="bg-[#131c2e] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 bg-slate-900">
                  <img
                    src={w.image}
                    alt={w.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Visible Compare Button on Image */}
                  <button
                    onClick={() => onToggleCompare(w)}
                    className="absolute top-3 right-3 bg-[#0b0f19]/90 text-[#d4af37] border border-[#d4af37]/40 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#d4af37] hover:text-[#0b0f19] transition shadow-lg"
                  >
                    ⚖️ Compare
                  </button>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-xs text-slate-400">
                    Seller:{" "}
                    <strong className="text-slate-300">{w.seller}</strong>
                  </span>
                  <h3 className="text-lg font-bold text-white">{w.title}</h3>
                  <p className="text-xs text-slate-400">{w.desc}</p>
                </div>
              </div>
              <div className="p-5 pt-0 flex items-center justify-between">
                <span className="text-xl font-extrabold text-[#d4af37]">
                  ${w.price.toLocaleString()}
                </span>
                <button
                  onClick={() => onSelectWatch(w)}
                  className="bg-[#d4af37] hover:bg-[#c19b2e] text-[#0b0f19] font-bold px-4 py-2 rounded-xl text-sm transition"
                >
                  Secure Checkout
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
