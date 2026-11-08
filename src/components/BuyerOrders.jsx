import React from "react";

export default function BuyerOrders({
  orders,
  onConfirmDelivery,
  onOpenDispute,
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-[#131c2e] p-6 rounded-xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white">
            My Orders & Escrow Protection
          </h2>
          <p className="text-sm text-slate-400">
            Track your purchases through our secure escrow pipeline.
          </p>
        </div>
        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold">
          Funds Secured
        </span>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-[#131c2e] p-8 rounded-xl border border-slate-800 text-center text-slate-500">
            No active orders in escrow.
          </div>
        ) : (
          orders.map((o) => (
            <div
              key={o.id}
              className="bg-[#131c2e] border border-slate-800 p-6 rounded-xl space-y-4 shadow-lg"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-slate-400 font-mono">
                    {o.id}
                  </span>
                  <h3 className="text-lg font-bold text-white">{o.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[#d4af37] font-extrabold text-lg">
                    ${o.price.toLocaleString()}
                  </span>
                  <span className="block text-xs text-slate-400">
                    Seller: {o.seller}
                  </span>
                </div>
              </div>

              <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#d4af37]">
                    Escrow Status: {o.status}
                  </span>
                  {o.tracking && (
                    <span className="text-slate-300">
                      <i class="fa-solid fa-truck mr-1"></i> Tracking:{" "}
                      {o.tracking}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 pt-2 flex-wrap">
                  {o.status === "Funds Deposited in Escrow" && (
                    <span className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded border border-amber-500/20">
                      Waiting for seller to ship & add tracking number
                    </span>
                  )}
                  {o.status === "Item Shipped" && (
                    <>
                      <button
                        onClick={() => onConfirmDelivery(o.id)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg text-xs transition"
                      >
                        Confirm Receipt & Release Escrow
                      </button>
                      <button
                        onClick={() => onOpenDispute(o.id)}
                        className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-lg text-xs transition"
                      >
                        Raise Dispute
                      </button>
                    </>
                  )}
                  {o.status === "Completed & Funds Released" && (
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded border border-emerald-500/20 font-semibold">
                      <i class="fa-solid fa-check-circle mr-1"></i> Transaction
                      Successful
                    </span>
                  )}
                  {o.status === "Disputed & Under Review" && (
                    <span className="text-xs bg-rose-500/10 text-rose-400 px-3 py-1 rounded border border-rose-500/20 font-semibold">
                      <i class="fa-solid fa-triangle-exclamation mr-1"></i>{" "}
                      Under Admin Dispute Review
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
