import React from "react";

export default function WatchModal({ watch, onClose, onCheckout }) {
  if (!watch) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#131c2e] border border-slate-800 rounded-2xl max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white text-xl"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={watch.image}
            alt={watch.title}
            className="rounded-xl object-cover h-72 w-full"
          />
          <div className="space-y-4">
            <span className="bg-[#d4af37]/10 text-[#d4af37] text-xs font-semibold px-3 py-1 rounded-full">
              {watch.category}
            </span>
            <h2 className="text-2xl font-bold text-white">{watch.title}</h2>
            <p className="text-sm text-slate-300">{watch.desc}</p>
            <div className="border-t border-slate-800 pt-3">
              <span className="text-xs text-slate-400">
                Sold by: <strong className="text-white">{watch.seller}</strong>
              </span>
              <div className="text-2xl font-extrabold text-[#d4af37] mt-1">
                ${watch.price.toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => onCheckout(watch.id)}
              className="w-full bg-[#d4af37] hover:bg-[#c19b2e] text-[#0b0f19] font-bold py-3 rounded-xl transition shadow-lg"
            >
              Proceed to Escrow Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
