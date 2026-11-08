import React, { useState } from "react";

export default function SellerDashboard({
  watches,
  orders,
  onAddWatch,
  onSubmitTracking,
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Luxury");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [trackingVals, setTrackingVals] = useState({});

  const myWatches = watches.filter((w) => w.seller === "Apex Horology");
  const myOrders = orders.filter((o) => o.seller === "Apex Horology");
  const totalRev = myOrders
    .filter((o) => o.status === "Completed & Funds Released")
    .reduce((acc, curr) => acc + curr.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddWatch({
      title,
      category,
      price: parseFloat(price),
      image,
      desc,
      seller: "Apex Horology",
    });
    setTitle("");
    setPrice("");
    setImage("");
    setDesc("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#131c2e] p-6 rounded-xl border border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Seller Dashboard</h2>
          <p className="text-sm text-slate-400">
            Manage your active listings and incoming shipments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#131c2e] p-5 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-xs uppercase font-semibold">
            Total Revenue
          </span>
          <h3 className="text-2xl font-bold text-white mt-1">
            ${totalRev.toLocaleString()}
          </h3>
        </div>
        <div className="bg-[#131c2e] p-5 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-xs uppercase font-semibold">
            Active Listings
          </span>
          <h3 className="text-2xl font-bold text-white mt-1">
            {myWatches.length}
          </h3>
        </div>
        <div className="bg-[#131c2e] p-5 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-xs uppercase font-semibold">
            Pending Shipments
          </span>
          <h3 className="text-2xl font-bold text-white mt-1">
            {
              myOrders.filter((o) => o.status === "Funds Deposited in Escrow")
                .length
            }
          </h3>
        </div>
      </div>

      {/* Add Watch Form */}
      <div className="bg-[#131c2e] p-6 rounded-xl border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-4">
          List a Watch for Sale
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Watch Title / Brand & Model"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-[#0b0f19] border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
          />
          <div className="grid grid-cols-2 gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-[#0b0f19] border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
            >
              <option value="Luxury">Luxury</option>
              <option value="Chronograph">Chronograph</option>
              <option value="Diver">Diver</option>
              <option value="Vintage">Vintage</option>
            </select>
            <input
              type="number"
              placeholder="Price ($ USD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full bg-[#0b0f19] border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
            />
          </div>
          <input
            type="url"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full bg-[#0b0f19] border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
          />
          <textarea
            rows="3"
            placeholder="Description & Condition"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            className="w-full bg-[#0b0f19] border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
          ></textarea>
          <button
            type="submit"
            className="bg-[#d4af37] hover:bg-[#c19b2e] text-[#0b0f19] font-bold px-6 py-2.5 rounded-xl text-sm transition"
          >
            Publish Watch
          </button>
        </form>
      </div>

      {/* Orders to Ship */}
      <div className="bg-[#131c2e] p-6 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white">
          Customer Orders to Ship
        </h3>
        {myOrders.length === 0 ? (
          <p className="text-xs text-slate-500">No active customer orders.</p>
        ) : (
          myOrders.map((o) => (
            <div
              key={o.id}
              className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800 flex justify-between items-center"
            >
              <div>
                <span className="text-xs font-mono text-slate-400">
                  {o.id} - <strong>{o.title}</strong>
                </span>
                <span className="block text-xs text-amber-400 mt-1">
                  Status: {o.status}
                </span>
              </div>
              {o.status === "Funds Deposited in Escrow" && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Tracking #"
                    onChange={(e) =>
                      setTrackingVals({
                        ...trackingVals,
                        [o.id]: e.target.value,
                      })
                    }
                    className="bg-[#131c2e] border border-slate-700 rounded px-2 py-1 text-xs text-white"
                  />
                  <button
                    onClick={() => onSubmitTracking(o.id, trackingVals[o.id])}
                    className="bg-[#d4af37] text-[#0b0f19] font-bold px-3 py-1 rounded text-xs"
                  >
                    Ship
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
