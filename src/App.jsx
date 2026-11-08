import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Marketplace from "./components/Marketplace";
import BuyerOrders from "./components/BuyerOrders";
import SellerDashboard from "./components/SellerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import WatchModal from "./components/WatchModal";

export default function App() {
  const [activeTab, setActiveTab] = useState("marketplace");
  const [currentRole, setRole] = useState("buyer");

  const [watches, setWatches] = useState(
    () =>
      JSON.parse(localStorage.getItem("cv_watches")) || [
        {
          id: 1,
          title: "Rolex Submariner Date",
          category: "Diver",
          price: 14500,
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
          desc: "Ref: 126610LN. Unworn with box and papers 2025.",
          seller: "Apex Horology",
        },
        {
          id: 2,
          title: "Omega Speedmaster Professional",
          category: "Chronograph",
          price: 7200,
          image:
            "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&auto=format&fit=crop&q=80",
          desc: "Moonwatch Hesalite crystal with steel bracelet.",
          seller: "Swiss Time Co.",
        },
        {
          id: 3,
          title: "Patek Philippe Nautilus",
          category: "Luxury",
          price: 95000,
          image:
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80",
          desc: "Ref: 5711/1A. Mint condition, complete set.",
          seller: "Vault Collector",
        },
      ],
  );

  const [orders, setOrders] = useState(
    () =>
      JSON.parse(localStorage.getItem("cv_orders")) || [
        {
          id: "ORD-9821",
          watchId: 1,
          title: "Rolex Submariner Date",
          price: 14500,
          seller: "Apex Horology",
          status: "In Escrow (Funds Secured)",
          tracking: "",
          dispute: false,
        },
      ],
  );

  const [comparedWatches, setComparedWatches] = useState([]);
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("cv_watches", JSON.stringify(watches));
  }, [watches]);

  useEffect(() => {
    localStorage.setItem("cv_orders", JSON.stringify(orders));
  }, [orders]);

  const handleToggleCompare = (watch) => {
    if (comparedWatches.some((w) => w.id === watch.id)) {
      setComparedWatches(comparedWatches.filter((w) => w.id !== watch.id));
    } else {
      if (comparedWatches.length >= 3) {
        alert("You can compare up to 3 watches simultaneously.");
        return;
      }
      setComparedWatches([...comparedWatches, watch]);
    }
  };

  const handlePlaceOrder = (watchId) => {
    const watch = watches.find((w) => w.id === watchId);
    if (!watch) return;
    const newOrder = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      watchId: watch.id,
      title: watch.title,
      price: watch.price,
      seller: watch.seller,
      status: "Funds Deposited in Escrow",
      tracking: "",
      dispute: false,
    };
    setOrders([newOrder, ...orders]);
    setSelectedWatch(null);
    setActiveTab("buyer-orders");
  };

  const handleConfirmDelivery = (orderId) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, status: "Completed & Funds Released" } : o,
      ),
    );
  };

  const handleOpenDispute = (orderId) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId
          ? { ...o, status: "Disputed & Under Review", dispute: true }
          : o,
      ),
    );
  };

  const handleAddWatch = (newWatch) => {
    setWatches([{ id: watches.length + 1, ...newWatch }, ...watches]);
    setShowSellerModal(false);
  };

  const handleSubmitTracking = (orderId, trackingNum) => {
    if (!trackingNum) {
      alert("Please enter a tracking number.");
      return;
    }
    setOrders(
      orders.map((o) =>
        o.id === orderId
          ? { ...o, status: "Item Shipped", tracking: trackingNum }
          : o,
      ),
    );
  };

  const handleResolveDispute = (orderId, action) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              dispute: false,
              status:
                action === "refund"
                  ? "Refunded to Buyer"
                  : "Completed & Funds Released",
            }
          : o,
      ),
    );
  };

  return (
    <div className="bg-[#0b0f19] text-slate-100 min-h-screen flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        setRole={setRole}
        compareCount={comparedWatches.length}
        openCompareModal={() => setShowCompareModal(true)}
      />

      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "marketplace" && (
          <Marketplace
            watches={watches}
            onSelectWatch={setSelectedWatch}
            onToggleCompare={handleToggleCompare}
            openSellerModal={() => setShowSellerModal(true)}
          />
        )}
        {activeTab === "buyer-orders" && (
          <BuyerOrders
            orders={orders}
            onConfirmDelivery={handleConfirmDelivery}
            onOpenDispute={handleOpenDispute}
          />
        )}
        {activeTab === "seller-dash" && (
          <SellerDashboard
            watches={watches}
            orders={orders}
            onAddWatch={handleAddWatch}
            onSubmitTracking={handleSubmitTracking}
          />
        )}
        {activeTab === "admin-dash" && (
          <AdminDashboard
            orders={orders}
            onResolveDispute={handleResolveDispute}
          />
        )}
      </main>

      {/* Watch Checkout Modal */}
      <WatchModal
        watch={selectedWatch}
        onClose={() => setSelectedWatch(null)}
        onCheckout={handlePlaceOrder}
      />

      {/* Compare Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131c2e] border border-slate-800 rounded-2xl max-w-4xl w-full p-6 relative">
            <button
              onClick={() => setShowCompareModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white text-xl"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <h3 className="text-xl font-bold text-white mb-4">
              Watch Comparison Matrix
            </h3>
            {comparedWatches.length === 0 ? (
              <p className="text-slate-400">
                No watches selected for comparison.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="p-3">Feature</th>
                      {comparedWatches.map((w) => (
                        <th key={w.id} className="p-3">
                          <img
                            src={w.image}
                            alt={w.title}
                            className="w-20 h-20 rounded object-cover mb-1"
                          />
                          <div>{w.title}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 font-semibold">Price</td>
                      {comparedWatches.map((w) => (
                        <td key={w.id} className="p-3 text-[#d4af37] font-bold">
                          ${w.price.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Category</td>
                      {comparedWatches.map((w) => (
                        <td key={w.id} className="p-3">
                          {w.category}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Seller</td>
                      {comparedWatches.map((w) => (
                        <td key={w.id} className="p-3">
                          {w.seller}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Watch Modal */}
      {showSellerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131c2e] border border-slate-800 rounded-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowSellerModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white text-xl"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <h3 className="text-xl font-bold text-white mb-4">
              List a Watch for Sale
            </h3>
            <SellerDashboard
              watches={watches}
              orders={orders}
              onAddWatch={handleAddWatch}
              onSubmitTracking={handleSubmitTracking}
            />
          </div>
        </div>
      )}
    </div>
  );
}
