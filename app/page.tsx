'use client';
import { useState, useEffect } from 'react';

// --- CONFIGURACIÓN DE IMAGENES ---
const URL_LOGO = "https://i.postimg.cc/qqkkkHmK/SIN-FONDO.png"; 

// --- DATA REAL DE MUNDO ACCESORIOS DORADA ---
const inventarioKardex = [
  { id: 263, name: 'Cargador XO-30W GaN Rápido', price: 35000, image: '/cargador.jpg', category: 'Cargadores', brand: 'XO', stock: 372 },
  { id: 264, name: 'Power Bank XO Magsafe 10k', price: 95000, image: '/powerbank.jpg', category: 'Cargadores', brand: 'XO', stock: 22 },
  { id: 25,  name: 'Cable Joyroom S-A29 Premium', price: 25000, image: '/cable.jpg', category: 'Cables', brand: 'Joyroom', stock: 26 },
  { id: 40,  name: 'Audífonos Monster PR Diadema', price: 140000, image: '/monster.jpg', category: 'Audífonos', brand: 'Monster', stock: 1 },
  { id: 262, name: 'Audífonos XO-Q7 TWS Black', price: 65000, image: '/audifonos-tws.jpg', category: 'Audífonos', brand: 'XO', stock: 17 },
  { id: 41,  name: 'Audífonos Gelidi Deportivos', price: 85000, image: '/audifonos-deportivos.jpg', category: 'Audífonos', brand: 'Gelidi', stock: 92 },
  { id: 56,  name: 'Gimbal Estabilizador Q08 Pro', price: 110000, image: '/gimbal.jpg', category: 'Creadores', brand: 'Genérico', stock: 11 },
  { id: 280, name: 'Aro de Luz RGB U80 + Trípode', price: 45000, image: '/aro-luz.jpg', category: 'Creadores', brand: 'Genérico', stock: 48 },
  { id: 33,  name: 'Reloj K9 Ultra 2 Max Negro', price: 160000, image: '/reloj-negro.jpg', category: 'Relojes', brand: 'K9', stock: 9 },
  { id: 1179, name: 'Smartwatch GS Ultra 8 Sport', price: 120000, image: '/reloj-naranja.jpg', category: 'Relojes', brand: 'GS', stock: 4 },
  { id: 340, name: 'Termo Stanley Quencher Marmo', price: 45000, image: '/termo.jpg', category: 'Lifestyle', brand: 'Stanley', stock: 94 },
];

const categories = ['Todos', 'Audífonos', 'Cargadores', 'Cables', 'Relojes', 'Creadores', 'Lifestyle'];

export default function MundoAccesoriosFinal() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [cart, setCart] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = inventarioKardex.filter((p) => {
    const matchCat = activeCategory === 'Todos' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent('Hola Mundo Accesorios Dorada! Me interesa un producto de su catálogo.')}`;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-cyan-100">
      
      {/* --- HEADER --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
          <div className="flex items-center">
            <img src={URL_LOGO} alt="Mundo Accesorios" className="h-16 w-auto object-contain" />
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-12">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="¿Qué buscas hoy?..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3 text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
              />
            </div>
          </div>

          <button onClick={() => setCartOpen(true)} className="relative p-4 bg-slate-900 text-white rounded-2xl hover:bg-cyan-600 transition-all shadow-lg hover:shadow-cyan-500/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[11px] w-6 h-6 rounded-full flex items-center justify-center font-black ring-4 ring-white">{cart.length}</span>}
          </button>
        </div>
      </nav>

      {/* --- CATEGORÍAS --- */}
      <div className="sticky top-24 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-4 flex gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)} 
              className={`flex-shrink-0 px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- BANNER --- */}
      <section className="relative bg-white py-12 md:py-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1.5 bg-cyan-50 border border-cyan-100 rounded-full mb-6">
             <p className="text-[10px] font-black text-cyan-600 uppercase tracking-[0.2em]">La Dorada, Caldas</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter uppercase">
            Eleva tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">tecnología</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Catálogo exclusivo de accesorios premium. Calidad verificada y entrega inmediata.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a href={whatsappUrl} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.15em] hover:bg-cyan-600 transition-all shadow-xl shadow-slate-900/10">Catálogo WhatsApp</a>
          </div>
        </div>
      </section>

      {/* --- PRODUCTOS --- */}
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filtered.map((product) => (
            <div key={product.id} className="group bg-white rounded-[2rem] p-5 border border-slate-100 hover:border-cyan-200 transition-all duration-500 flex flex-col hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]">
              <div className="aspect-square bg-slate-50 rounded-[1.5rem] overflow-hidden mb-6 relative flex items-center justify-center p-6">
                <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out" />
                {product.stock <= 5 && <span className="absolute top-4 left-4 bg-rose-500 text-white text-[9px] px-2.5 py-1 rounded-lg font-black uppercase tracking-tighter">Stock Crítico: {product.stock}</span>}
              </div>
              <div className="flex-1 flex flex-col px-1">
                <p className="text-[10px] text-cyan-600 font-black mb-2 uppercase tracking-[0.1em]">{product.brand}</p>
                <h4 className="text-[13px] font-bold text-slate-800 mb-6 line-clamp-2 h-10 leading-tight uppercase tracking-tight">{product.name}</h4>
                <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xl font-black text-slate-900 tracking-tighter">${product.price.toLocaleString('es-CO')}</span>
                  <button onClick={() => setCart([...cart, product])} className="bg-slate-900 text-white p-3 rounded-xl hover:bg-cyan-500 transition-all shadow-md">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-50 border-t border-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div>
            <img src={URL_LOGO} alt="Mundo Accesorios Footer" className="h-12 w-auto mb-8 opacity-80" />
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-loose max-w-xs">
              Mundo Accesorios Dorada. <br /> Innovación y respaldo técnico en La Dorada, Caldas.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Ubicación</h5>
              <p className="text-sm text-slate-500 font-medium leading-relaxed uppercase">Calle Real - Centro<br />La Dorada, Caldas</p>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Soporte</h5>
              <a href={whatsappUrl} className="block text-sm font-black text-cyan-600 uppercase hover:underline">WhatsApp Ventas</a>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
             <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-4">Horario de Atención</h5>
             <p className="text-sm text-slate-500 font-medium">Lunes a Sábado: 8:00 AM - 7:00 PM</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">© 2026 Mundo Accesorios Dorada</p>
           <p className="text-[10px] text-slate-300 font-mono uppercase">Vercel Production Deployment</p>
        </div>
      </footer>

      {/* --- CARRITO --- */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-md" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white flex flex-col h-full shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">Tu Pedido ({cart.length})</h2>
              <button onClick={() => setCartOpen(false)} className="text-slate-900 hover:rotate-90 transition-transform p-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30">
              {cart.length === 0 ? (
                <div className="text-center py-20 opacity-20"><svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg><p className="font-black uppercase tracking-widest text-xs">Vacío</p></div>
              ) : (
                cart.map((item, i) => (
                  <div key={i} className="flex gap-6 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm items-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden p-2 flex-shrink-0">
                      <img src={item.image} alt="Cart item" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-black text-slate-900 uppercase truncate">{item.name}</p>
                      <p className="text-cyan-600 font-black text-base mt-1">${item.price.toLocaleString('es-CO')}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-8 border-t border-slate-100 bg-white">
              <div className="flex justify-between items-center mb-8">
                <span className="text-slate-400 uppercase font-black text-xs tracking-[0.2em]">Subtotal</span>
                <span className="text-3xl font-black text-slate-900 tracking-tighter">${cart.reduce((s, p) => s + p.price, 0).toLocaleString('es-CO')}</span>
              </div>
              <a 
                href={`https://wa.me/573001234567?text=${encodeURIComponent('Hola! Quiero pedir:\n' + cart.map((p) => `- ${p.name}`).join('\n') + `\nTotal: $${cart.reduce((s,p)=>s+p.price,0).toLocaleString('es-CO')}`)}`}
                target="_blank"
                className="block w-full bg-slate-900 text-white text-center font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-[11px] hover:bg-cyan-600 transition-all shadow-xl shadow-slate-900/10"
              >
                Confirmar por WhatsApp
              </a>
              <button onClick={() => setCart([])} className="w-full text-center mt-6 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-rose-500 transition-colors">Vaciar Carrito</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
