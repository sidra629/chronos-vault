import React from "react";

export default function AdminDashboard({ orders, onResolveDispute }) {
  const disputes = orders.filter((o) => o.dispute);

  return (
    <div className="space-y-6">
      <div className="bg-[#131c2e] p-6 rounded-xl border border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">
            <i class="fa-solid fa-shield-halved text-amber-500 mr-2"></i> Admin
            Control Center
          </h2>
          <p className="text-sm text-slate-400">
            Oversee escrow funds and arbitrate platform disputes.
          </p>
        </div>
        <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold">
          {disputes.length} Active Disputes
        </span>
      </div>

      <div className="bg-[#131c2e] p-6 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white">
          Dispute Resolution Queue
        </h3>
        {disputes.length === 0 ? (
          <p className="text-sm text-slate-400">
            No active disputes requiring arbitration.
          </p>
        ) : (
          disputes.map((d) => (
            <div
              key={d.id}
              className="bg-[#0b0f19] p-4 rounded-xl border border-rose-500/30 flex justify-between items-center"
            >
              <div>
                <span className="text-xs text-rose-400 font-bold">
                  Dispute on {d.id}
                </span>
                <h4 class="text-sm font-bold text-white">
                  {d.title} (${d.price.toLocaleString()})
                </h4>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onResolveDispute(d.id, "refund")}
                  className="bg-slate-700 text-white px-3 py-1.5 rounded text-xs"
                >
                  Refund Buyer
                </button>
                <button
                  onClick={() => onResolveDispute(d.id, "release")}
                  className="bg-[#d4af37] text-[#0b0f19] font-bold px-3 py-1.5 rounded text-xs"
                >
                  Release to Seller
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
