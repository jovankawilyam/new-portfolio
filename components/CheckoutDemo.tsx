"use client";

import React, { useState } from "react";

type Plan = {
  id: string;
  name: string;
  price: string;
  priceRaw: number;
  description: string;
  features: string[];
  color: string;
  accent: string;
};

const plans: Plan[] = [
  {
    id: "plus",
    name: "Plus",
    price: "Rp 49.000",
    priceRaw: 49000,
    description: "Ideal for personal use and standard projects.",
    features: ["Standard performance", "Core portfolio access", "Email support"],
    color: "#2563eb",
    accent: "rgba(37,99,235,0.05)",
  },
  {
    id: "pro",
    name: "Pro",
    price: "Rp 99.000",
    priceRaw: 99000,
    description: "Advanced features for professionals.",
    features: ["High-speed performance", "All source code access", "Priority support"],
    color: "#7c3aed",
    accent: "rgba(124,58,237,0.05)",
  },
  {
    id: "ultra",
    name: "Ultra",
    price: "Rp 199.000",
    priceRaw: 199000,
    description: "Our most capable model for complex needs.",
    features: ["Expert-level insights", "1-on-1 consultation", "Lifetime updates"],
    color: "#111827",
    accent: "rgba(17,24,39,0.05)",
  },
];

type PaymentMethod = {
  id: string;
  name: string;
  detail: string;
  icon: React.ReactNode;
};

const paymentMethods: PaymentMethod[] = [
  {
    id: "visa",
    name: "Credit / Debit Card",
    detail: "",
    icon: (
      <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
        <rect width="32" height="20" rx="3" fill="#1e293b"/>
        <path d="M12.6 14.2L13.8 6.5H16.2L15 14.2H12.6ZM22.4 6.7C21.8 6.5 21.1 6.4 20.4 6.4C18.3 6.4 16.8 7.5 16.8 9.2C16.8 10.4 17.8 11 18.6 11.4C19.4 11.8 19.7 12 19.7 12.4C19.7 12.9 19 13.2 18.4 13.2C17.6 13.2 17.1 13 16.7 12.8L16.3 14.4C16.8 14.6 17.5 14.8 18.3 14.8C20.5 14.8 22 13.7 22 11.9C22 10.8 21.3 10.2 20.1 9.6C19.3 9.2 18.9 9 18.9 8.6C18.9 8.2 19.4 7.8 20.3 7.8C21 7.8 21.5 7.9 21.9 8.1L22.4 6.7ZM27.1 6.5H25.3C24.8 6.5 24.3 6.8 24.1 7.3L21.3 14.2H23.8L24.3 12.8H27.3L27.6 14.2H30L27.8 6.5H27.1ZM24.8 11.2L25.8 8.4L26.4 11.2H24.8ZM11.1 6.5H8.7L6.5 11.8L5.7 7.2C5.6 6.8 5.3 6.5 4.9 6.5H1.3L1.2 7.1C2 7.3 3 7.6 3.7 8C4.1 8.2 4.2 8.4 4.3 8.8L6.2 14.2H8.7L12.5 6.5H11.1Z" fill="white"/>
      </svg>
    )
  },
  {
    id: "qris",
    name: "QRIS",
    detail: "",
    icon: (
      <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
        <rect width="32" height="20" rx="3" fill="white" stroke="#e2e8f0"/>
        <path d="M7 6H11V10H7V6ZM8 7V9H10V7H8Z" fill="#0f172a"/>
        <path d="M13 6H17V10H13V6ZM14 7V9H16V7H14Z" fill="#0f172a"/>
        <path d="M7 12H11V16H7V12ZM8 13V15H10V13H8Z" fill="#0f172a"/>
        <path d="M13 12H15V14H13V12ZM15 14H17V16H15V14ZM13 14V16H15V14Z" fill="#0f172a"/>
      </svg>
    )
  },
  {
    id: "transfer",
    name: "Bank Transfer",
    detail: "",
    icon: (
      <svg width="32" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
        <path d="M3 21h18M3 10h18M5 10V7a2 2 0 012-2h10a2 2 0 012 2v3M7 21v-11M11 21v-11M15 21v-11M19 21v-11"/>
      </svg>
    )
  },
];

export default function CheckoutDemo({ onComplete }: { onComplete?: () => void }) {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[1]);
  const [method, setMethod] = useState(paymentMethods[0].id);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [voucher, setVoucher] = useState("");
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);

  const handleApplyVoucher = () => {
    if (voucher.toUpperCase() === "JOJOGG") {
      setIsVoucherApplied(true);
    } else {
      setIsVoucherApplied(false);
    }
  };

  const currentPrice = isVoucherApplied ? "Rp 0" : selectedPlan.price;

  const handlePay = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => onComplete?.(), 2500);
    }, 2800);
  };

  return (
    <section style={styles.shell} data-checkout-shell>
      <style>{`
        @keyframes checkout-spin { to { transform: rotate(360deg); } }
        .ultra-gradient {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #111827);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @media (max-width: 960px) {
          [data-checkout-body] { grid-template-columns: 1fr !important; }
          [data-plans-panel] { border-right: 0 !important; border-bottom: 1px solid #e2e8f0 !important; }
        }
      `}</style>

      <div style={styles.paymentFrame}>
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontWeight: 600, fontSize: 16 }}>Secure Checkout</span>
          </div>
          <span style={styles.secureLabel}>Encryption Active</span>
        </div>

        <div style={styles.body} data-checkout-body>
          <div style={styles.plansPanel} data-plans-panel>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 6px' }}>Select Plan</h2>
              <p style={{ color: '#64748b', fontSize: 14 }}>Choose the access level that fits your needs.</p>
            </div>

            <div style={styles.plansList}>
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  style={{
                    ...styles.planCard,
                    borderColor: selectedPlan.id === plan.id ? plan.color : '#e2e8f0',
                    background: selectedPlan.id === plan.id ? plan.accent : '#fff',
                    boxShadow: selectedPlan.id === plan.id ? `0 0 0 1px ${plan.color}` : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: plan.id === 'ultra' ? 'inherit' : plan.color }} className={plan.id === 'ultra' ? 'ultra-gradient' : ''}>
                      {plan.name}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 700, textDecoration: isVoucherApplied ? 'line-through' : 'none', opacity: isVoucherApplied ? 0.5 : 1 }}>
                      {plan.price}
                    </span>
                  </div>
                  {isVoucherApplied && (
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#10b981', margin: '-4px 0 6px', textAlign: 'right' }}>Rp 0</p>
                  )}
                  <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 10px' }}>{plan.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {plan.features.slice(0, 2).map((f, i) => (
                      <span key={i} style={{ fontSize: 11, background: '#f1f5f9', padding: '2px 8px', borderRadius: 4, color: '#475569' }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={styles.checkoutPanel}>
            <div style={{ marginBottom: 12 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
                <span style={{ color: '#64748b' }}>{selectedPlan.name} Access</span>
                <span style={{ textDecoration: isVoucherApplied ? 'line-through' : 'none' }}>{selectedPlan.price}</span>
              </div>
              
              {isVoucherApplied && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: '#10b981' }}>
                  <span>Voucher (JOJOGG)</span>
                  <span>-{selectedPlan.price}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, borderTop: '1px solid #f1f5f9', paddingTop: 12, marginTop: 12 }}>
                <span>Total</span>
                <span>{currentPrice}</span>
              </div>
            </div>

            <div style={{ marginTop: 4 }}>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Promo Code</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <input 
                  type="text" 
                  placeholder="Enter code" 
                  value={voucher}
                  onChange={(e) => setVoucher(e.target.value)}
                  style={{ 
                    flex: 1, 
                    padding: '8px 12px', 
                    borderRadius: 8, 
                    border: '1px solid #e2e8f0',
                    fontSize: 13,
                    outline: 'none'
                  }}
                />
                <button 
                  onClick={handleApplyVoucher}
                  style={{ 
                    padding: '8px 16px', 
                    borderRadius: 8, 
                    border: 'none', 
                    background: '#f1f5f9', 
                    fontSize: 13, 
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Apply
                </button>
              </div>
              {isVoucherApplied && <p style={{ fontSize: 11, color: '#10b981', marginTop: 4, fontWeight: 600 }}>✓ Code applied successfully!</p>}
            </div>

            <div style={{ marginTop: 10 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Payment Method</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                {paymentMethods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    style={{
                      ...styles.methodRow,
                      borderColor: method === m.id ? '#2563eb' : '#e2e8f0',
                      background: method === m.id ? '#f0f7ff' : '#fff',
                    }}
                  >
                    {m.icon}
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{m.name}</p>
                      <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>{m.detail}</p>
                    </div>
                    <div style={{ ...styles.radio, borderColor: method === m.id ? '#2563eb' : '#cbd5e1' }}>
                      {method === m.id && <div style={{ width: 8, height: 8, background: '#2563eb', borderRadius: '50%' }} />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={loading || done}
              style={{
                ...styles.payButton,
                background: done ? "#10b981" : "#111827",
                cursor: (loading || done) ? "not-allowed" : "pointer",
              }}
            >
              {loading ? <span style={styles.spinner} /> : done ? "Success" : isVoucherApplied ? "Get Access for Free" : "Confirm Payment"}
            </button>

            {done && (
              <div style={styles.successBox}>
                <p style={{ fontWeight: 700, margin: '0 0 4px' }}>Payment Approved</p>
                <p style={{ margin: 0 }}>Your access to {selectedPlan.name} is now active.</p>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, color: '#94a3b8' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <span style={{ fontSize: 11 }}>End-to-end encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  shell: {
    minHeight: "100svh",
    display: "grid",
    placeItems: "center",
    padding: 20,
    background: "#f1f5f9",
    color: "#0f172a",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  paymentFrame: {
    width: "min(900px, 100%)",
    background: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
    border: "1px solid #e2e8f0",
  },
  header: {
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #f1f5f9",
  },
  secureLabel: {
    fontSize: 11,
    color: "#059669",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  body: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  plansPanel: {
    padding: 24,
    background: "#fff",
    borderRight: "1px solid #f1f5f9",
  },
  plansList: {
    display: "grid",
    gap: 12,
  },
  planCard: {
    padding: 16,
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.15s ease-out",
  },
  checkoutPanel: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  methodRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    cursor: "pointer",
    background: "#fff",
    transition: "all 0.1s ease",
  },
  radio: {
    width: 18,
    height: 18,
    border: "2px solid #cbd5e1",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
  },
  payButton: {
    width: "100%",
    padding: "14px",
    borderRadius: 10,
    border: "none",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    transition: "opacity 0.2s",
  },
  spinner: {
    width: 20,
    height: 20,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "checkout-spin 0.8s linear infinite",
  },
  successBox: {
    padding: 16,
    background: "#ecfdf5",
    color: "#065f46",
    borderRadius: 10,
    fontSize: 13,
    border: "1px solid #d1fae5",
  },
};
