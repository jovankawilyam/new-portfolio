"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type PaymentMethodId = "qris" ;

type PaymentMethod = {
  id: PaymentMethodId;
  name: string;
  detail: string;
  icon: React.ReactNode;
};

const paymentMethods: PaymentMethod[] = [
  {
    id: "qris",
    name: "QRIS",
    detail: "",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <path d="M3 14h4v4H3zM7 14h3v1M14 18h3v3M20 14h1v4" strokeLinecap="round" />
      </svg>
    ),
  },
];

function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

const promoCodes = {
  JOJOGG: {
    label: "JOJOGG",
    discountAmount: 70000,
    freeAdmin: false,
    successMessage: "✓ Kupon JOJOGG aktif! Diskon Rp 70.000.",
  },
  WLYM01: {
    label: "WLYM01",
    discountAmount: 50000,
    freeAdmin: true,
    successMessage: "✓ Kupon WLYM01 aktif! Diskon Rp 50.000 dan Bebas Biaya Admin!",
  },
  VIPJWM: {
    label: "VIPJWM",
    discountAmount: "full",
    freeAdmin: true,
    successMessage: "✓ CIHUYYY Kupon VIPJWM aktif! Total pembayaran menjadi Rp 0.",
  },
} as const;

type PromoCode = keyof typeof promoCodes;

function isPromoCode(value: string): value is PromoCode {
  return value in promoCodes;
}

function PremiumQrCode({ pattern, isGlitching }: { pattern: boolean[]; isGlitching: boolean }) {
  const size = Math.sqrt(pattern.length);
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-44 h-44 bg-white p-3 border border-slate-200/80 rounded-2xl shadow-inner relative flex items-center justify-center mx-auto"
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full shape-rendering-crispedges">
        {pattern.map((filled, i) => {
          const x = i % size;
          const y = Math.floor(i / size);
          return filled ? (
            <rect key={i} x={x} y={y} width="1" height="1" fill={isGlitching ? "#10b981" : "#0f172a"} className="transition-colors duration-500" />
          ) : null;
        })}
      </svg>
      {/* Scanner Radar Line Animation */}
      <motion.div 
        animate={{ translateY: ["0px", "150px", "0px"] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute left-0 right-0 h-0.5 bg-emerald-500/50 shadow-[0_0_8px_#10b981] opacity-70 pointer-events-none"
      />
      <div className="absolute w-8 h-8 bg-white border border-slate-100 rounded-lg shadow flex items-center justify-center font-black text-[8px] text-slate-900 tracking-tighter">
        QRIS
      </div>
    </motion.div>
  );
}

// Tetap mempertahankan properti bawaan asli dari awal (onComplete, gameTitle, dll)
export default function CheckoutDemo({ onComplete, gameTitle = "Premium Access Plan" }: { onComplete?: () => void; gameTitle?: string }) {
  const checkoutId = useId();
  const [method, setMethod] = useState<PaymentMethodId>("qris");
  const [status, setStatus] = useState<"details" | "processing" | "show_qris" | "success">("details");
  const [countdown, setCountdown] = useState(900);

  // States Tambahan Baru untuk mendukung kode promo tanpa merusak state utama
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState("");

  const basePrice = 100000;
  const adminFee = 2500;
  const appliedPromo = appliedPromoCode ? promoCodes[appliedPromoCode] : null;
  const discount = appliedPromo
    ? appliedPromo.discountAmount === "full"
      ? basePrice
      : Math.min(appliedPromo.discountAmount, basePrice)
    : 0;
  const totalAmount = Math.max(basePrice - discount, 0);
  const effectiveAdminFee = appliedPromo?.freeAdmin ? 0 : adminFee;
  const finalAmount = totalAmount + effectiveAdminFee;

  const transactionId = useMemo(() => `PAY-${checkoutId.replace(/:/g, "").toUpperCase().slice(0, 8)}`, [checkoutId]);

  const qrPattern = useMemo(() => {
    return Array.from({ length: 225 }, (_, i) => {
      const size = 15;
      const x = i % size;
      const y = Math.floor(i / size);
      if ((x < 4 && y < 4) || (x > 10 && y < 4) || (x < 4 && y > 10)) {
        return (x === 0 || x === 3 || y === 0 || y === 3) || (x === 11 || x === 14 || y === 0 || y === 3) || (x === 0 || x === 3 || y === 11 || y === 14);
      }
      return (i * 7 + transactionId.charCodeAt(i % 4)) % 3 === 0;
    });
  }, [transactionId]);

  useEffect(() => {
    if (status === "success") return;
    const timer = setInterval(() => setCountdown((prev) => (prev > 0 ? prev - 1 : 900)), 1000);
    return () => clearInterval(timer);
  }, [status]);

  const applyPromoCode = () => {
    const normalizedPromoInput = promoInput.trim().toUpperCase();

    if (isPromoCode(normalizedPromoInput)) {
      setAppliedPromoCode(normalizedPromoInput);
      setPromoError("");
    } else {
      setPromoError("Kode promo tidak valid");
      setAppliedPromoCode(null);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyPromoCode();
  };

  const handlePaymentSubmit = () => {
    setStatus("processing");
    setTimeout(() => {
      if (appliedPromoCode === "VIPJWM" || finalAmount === 0) {
        setStatus("success");
        if (onComplete) onComplete();
      } else if (method === "qris") {
        setStatus("show_qris");
      } else {
        setStatus("success");
        if (onComplete) onComplete();
      }
    }, 1800);
  };

  const handleManualLanjut = () => {
    setStatus("processing");
    setTimeout(() => {
      setStatus("success");
      if (onComplete) onComplete();
    }, 1200);
  };

  return (
    <section className="min-h-screen w-full bg-[#f8fafc] px-4 py-12 text-slate-900 antialiased font-sans flex items-center justify-center">
      <motion.div 
        layout
        className="w-full max-w-[400px] bg-white border border-slate-200 rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden flex flex-col justify-between"
      >
        {/* HEADER BAR */}
        <header className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="logo" className="h-8 w-auto object-contain" />
            <div className="flex flex-col justify-center">
              <span className="text-base font-bold text-slate-800 uppercase tracking-widest block leading-none">
                PEMBAYARAN
              </span>
            </div>
          </div>
        </header>

        {/* CONTAINER UTAMA INTERAKSI FLOW */}
        <div className="p-5 flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            
            {/* SCREEN 1: DETAIL RINGKAS, PILIHAN METODE, & PROMO */}
            {status === "details" && (
              <motion.div 
                key="details" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }} 
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-4 flex-1 flex flex-col"
              >
                {/* INVOICE TICKET */}
                <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-4 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0 pr-4">
                      <h4 className="text-sm font-bold text-slate-800 truncate">{gameTitle}</h4>
                    </div>
                    
                    {/* Animasi Harga Coret Khusus saat Kupon Aktif */}
                    <div className="text-right flex flex-col items-end shrink-0">
                      <AnimatePresence>
                        {appliedPromo && (
                          <motion.span 
                            initial={{ opacity: 0, y: 2 }}
                            animate={{ opacity: 0.4, y: 0 }}
                            className="text-[10px] line-through font-medium text-slate-500"
                          >
                            {formatRupiah(basePrice)}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <motion.span 
                        key={totalAmount}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`text-sm font-black tracking-tight ${appliedPromo ? "text-emerald-600 text-base font-black" : "text-slate-800"}`}
                      >
                        {formatRupiah(totalAmount)}
                      </motion.span>
                    </div>
                  </div>
                </div>

                {/* PILIHAN METODE PEMBAYARAN */}
                <div className="space-y-2.5">
                  {paymentMethods.map((item) => {
                    const isSelected = item.id === method;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMethod(item.id)}
                        className={`w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                          isSelected 
                            ? "border-slate-900 bg-slate-50/50 ring-[0.5px] ring-slate-900 shadow-sm" 
                            : "border-slate-200/70 bg-white hover:bg-slate-50/40"
                        }`}
                      >
                        <div className={`p-2 rounded-lg border transition-colors ${isSelected ? "bg-slate-900 text-white border-slate-900" : "bg-slate-100 text-slate-400 border-slate-200"}`}>
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-400 truncate mt-0.5">{item.detail}</p>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className={`h-4 w-4 rounded-full border flex items-center justify-center transition-all ${isSelected ? "border-slate-900" : "border-slate-300"}`}>
                            {isSelected && <motion.div layoutId="activeIndicator" className="h-2 w-2 rounded-full bg-slate-900" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* KODE PROMO */}
                <div className="space-y-1.5">
                  <form 
                    onSubmit={handleFormSubmit}
                    className="flex gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200/60 focus-within:border-slate-400 transition-colors"
                  >
                    <input
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="Masukkan Kode Promo"
                      className="flex-1 bg-transparent px-3 py-1.5 text-sm font-medium outline-none placeholder:text-slate-400 tracking-wider"
                    />
                    <button
                      type="submit"
                      className="bg-slate-400 hover:bg-slate-900 text-xs font-bold px-2 py-2 rounded-lg transition active:scale-95 text-white"
                    >
                      Gunakan
                    </button>
                  </form>
                  {promoError && <span className="text-[10px] font-semibold text-red-500 pl-1 block">{promoError}</span>}
                  {appliedPromo && (
                    <motion.span 
                      initial={{ opacity: 0, x: -2 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      className="text-[10px] font-bold text-emerald-600 pl-1 block"
                    >
                      {appliedPromo.successMessage}
                    </motion.span>
                  )}
                </div>
                <div className="mt-auto">
                    <p className="text-sm text-slate-500">Mau <a href="https://instagram.com/jovankawilyamm" target="_blank" rel="noopener noreferrer" className="text-amber-500 text-semibold">kode promo</a>? DM instagram, Slot terbatas 🤫🔥</p>
                </div>
              </motion.div>
            )}

            {/* SCREEN 2: LOADING PROCESSING */}
            {status === "processing" && (
              <motion.div 
                key="processing" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-12 flex-1"
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="h-6 w-6 rounded-full border-2 border-slate-200 border-t-slate-900 mb-3" 
                />
                <p className="text-sm font-bold text-slate-800">Menyinkronkan jalur enkripsi bank...</p>
                <p className="text-xs text-slate-400 mt-1">Mohon tunggu sebentar</p>
              </motion.div>
            )}

            {/* SCREEN 3: QRIS SCREEN IMAGE */}
            {status === "show_qris" && (
              <motion.div 
                key="show_qris" 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-4 flex-1 space-y-4"
              >
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-64 h-auto bg-white p-2 border border-slate-200/80 rounded-2xl shadow-lg relative flex items-center justify-center mx-auto"
                >
                  <img src="/images/qris2.JPG" alt="QRIS Payment" className="w-full h-auto rounded-xl" />
                </motion.div>
                
                <div className="space-y-1.5">
                  <div className="bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full inline-block">
                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Total: {formatRupiah(finalAmount)}</p>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Scan Kode QRIS</h3>
                  <p className="text-xs text-slate-400 max-w-[240px] mx-auto leading-normal">
                    {finalAmount === 0 ? "Sistem mendeteksi total pembayaran Rp 0. Tekan lanjut untuk menyelesaikan transaksi." : "Silakan scan kode QRIS di atas dengan aplikasi e-wallet atau bank Anda."}
                  </p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleManualLanjut}
                  className="w-full max-w-[200px] bg-slate-900 text-white text-xs font-bold py-3 rounded-xl shadow-md hover:bg-slate-800 transition-colors mt-2"
                >
                  Saya Sudah Bayar / Lanjut
                </motion.button>
              </motion.div>
            )}

            {/* SCREEN 4: SUCCESS SCREEN */}
            {status === "success" && (
              <motion.div 
                key="success" 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="flex flex-col items-center justify-center text-center py-12 flex-1"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.4 }}
                  className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-3 shadow-[0_4px_12px_rgba(16,185,129,0.3)]"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-sm font-bold text-slate-900">Transaksi Berhasil</h3>
                <p className="text-xs text-slate-400 mt-0.5">Dana settlement aman terverifikasi penuh.</p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* BOTTOM ACTION BAR */}
        {status === "details" && (
          <footer className="bg-slate-50 border-t border-slate-100 p-6 space-y-5">
            
            {/* RINCIAN HARGA DETAIL */}
            <div className="space-y-2 text-sm text-slate-500 border-b border-slate-200/60 pb-4">
              <div className="flex justify-between">
                <span>Harga : {gameTitle}</span>
                <span className="font-medium text-slate-700">{formatRupiah(basePrice)}</span>
              </div>
              
              {appliedPromo && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Diskon Kupon ({appliedPromo.label})</span>
                  <span>-{formatRupiah(discount)}</span>
                </div>
              )}

              <div className="flex justify-between border-t border-dashed border-slate-200 pt-2 text-slate-600">
                <span>Sub Total :</span>
                <span className="font-semibold">{formatRupiah(totalAmount)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Biaya Admin :</span>
                <span className="font-semibold">{formatRupiah(effectiveAdminFee)}</span>
              </div>
            </div>
            

            {/* ACTION BAR (TOTAL AKHIR & TOMBOL BAYAR) */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Total Akhir</span>
                <motion.span 
                  key={finalAmount}
                  layout
                  className={`text-lg font-black tracking-tight ${
                    appliedPromo ? "text-emerald-600 text-xl" : "text-slate-950"
                  }`}
                >
                  {formatRupiah(finalAmount)}
                </motion.span>
              </div>
              
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handlePaymentSubmit}
                className={`text-sm font-bold px-6 py-3 rounded-xl shadow-sm transition-colors ${
                  appliedPromo 
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-[0_4px_12px_rgba(16,185,129,0.2)]" 
                    : "bg-slate-800 hover:bg-slate-900 text-xs font-bold px-2 py-2 rounded-lg transition active:scale-95 text-white"
                }`}
              >
                Bayar Sekarang
              </motion.button>
            </div>

          </footer>
        )}
      </motion.div>
    </section>
  );
} 