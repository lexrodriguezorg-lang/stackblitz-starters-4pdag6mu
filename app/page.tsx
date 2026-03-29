'use client';
import { useState, useEffect } from 'react';

// === CONFIGURACIÓN GLOBAL ===
// Sube el logo que me acabas de enviar a Postimages y pega el link aquí (El "Enlace Directo")
const URL_LOGO = "https://i.postimg.cc/qqkkkHmK/SIN-FONDO.png"; 

// Reemplaza con el número real de WhatsApp de la cliente
const WHATSAPP_NUMBER = "573111234567";

// === DATA REAL DE MUNDO ACCESORIOS DORADA (TUS FOTOS LISTAS) ===
const inventarioKardex = [
  { id: 263, name: 'Cargador XO-30W GaN Rápido', price: 35000, image: 'https://i.postimg.cc/28Wwpqqg/cargador-xo.webp', category: 'Cargadores', brand: 'XO', stock: 372 },
  { id: 264, name: 'Power Bank XO Magsafe 10k', price: 95000, image: 'https://i.postimg.cc/3JGBMy4h/powerbank-magsafe.webp', category: 'Cargadores', brand: 'XO', stock: 22 },
  { id: 25,  name: 'Cable Joyroom S-A29 Premium', price: 25000, image: 'https://i.postimg.cc/RVtRr33y/cable-joyroom.webp', category: 'Cables', brand: 'Joyroom', stock: 26 },
  { id: 40,  name: 'Audífonos Monster PR Diadema', price: 140000, image: 'https://i.postimg.cc/gkhD9wwt/audifonos-monster.webp', category: 'Audífonos', brand: 'Monster', stock: 1 },
  { id: 56,  name: 'Gimbal Estabilizador Q08 Pro', price: 110000, image: 'https://i.postimg.cc/fTdK4336/gimbal.webp', category: 'Creadores', brand: 'Genérico', stock: 11 },
  { id: 280, name: 'Aro de Luz RGB U80 + Trípode', price: 45000, image: 'https://i.postimg.cc/9F9p344n/aro-luz.webp', category: 'Creadores', brand: 'Genérico', stock: 48 },
  { id: 33,  name: 'Reloj K9 Ultra Negro Sport', price: 160000, image: 'https://i.postimg.cc/hPmrFJzg/reloj-negro.webp', category: 'Relojes', brand: 'K9', stock: 9 },
  { id: 1179, name: 'Smartwatch GS Ultra 8 Sport', price: 120000, image: 'https://i.postimg.cc/HsM2GJcs/reloj-naranja.webp', category: 'Relojes', brand: 'GS', stock: 4 },
  { id: 340, name: 'Termo Stanley Quencher Marmo', price: 45000, image: 'https://i.postimg.cc/qMKLfthJ/termo-stanley.jpg', category: 'Lifestyle', brand: 'Stanley', stock: 94 },
];

const categories = ['Todos', 'Audífonos', 'Cargadores', 'Cables', 'Relojes', 'Creadores', 'Lifestyle'];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [cart, setCart] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = inventarioKardex.filter((p) => {
    const matchCat = activeCategory === 'Todos' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const whatsappUrlBase = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Mundo Accesorios Dorada!')}`;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-cyan-100 pb-16">
      
      {/* ─── HEADER SENIOR (LIMPIO Y PROFESIONAL) ─── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 transition-transform hover:scale-105 duration-300 ease-out">
            <div className="h-16 w-auto flex items-center justify-center p-2 rounded-2xl bg-white border border-slate-100 shadow-inner">
              <img src={URL_LOGO} alt="Mundo Accesorios" className="h-full w-auto object-contain" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-slate-900 leading-none uppercase">Mundo</h1>
              <p className="text-[11px] text-cyan-600 font-black leading-none tracking-widest uppercase">ACCESORIOS DORADA</p>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-lg mx-12">
            <input
              type="text"
              placeholder="¿Qué accesorio buscas today?..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3 text-sm focus:border-cyan-400 outline-none transition-all shadow-inner focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          <button onClick={() => setCartOpen(true)} className="relative p-4 bg-slate-900 text-white rounded-2xl hover:bg-cyan-600 transition-all shadow-xl shadow-slate-900/10">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[11px] w-6 h-6 rounded-full flex items-center justify-center font-bold ring-4 ring-white">{cart.length}</span>}
          </button>
        </div>
      </nav>

      {/* ─── CATEGORÍAS ─── */}
      <div className="sticky top-24 z-40 bg-white border-b border-slate-100 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)} 
              className={`flex-shrink-0 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200 hover:text-slate-900'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ─── HERO BANNER SENIOR (ESTILO APPLE) ─── */}
      <section className="bg-slate-50 py-20 md:py-32 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-50 border border-cyan-100 mb-10 rounded-full shadow-inner">
             <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-[11px] font-black text-cyan-600 tracking-widest uppercase">LA DORADA | CALDAS</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-950 leading-[1.05] mb-8 uppercase tracking-tighter">
            Eleva tu <span className="text-cyan-500">tecnología</span> <br /> para tu estilo
          </h2>
          <p className="text-slate-600 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Hardware verificado y accesorios premium. Tu contenido merece brillar con lo mejor de La Dorada.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href={whatsappUrlBase} target="_blank" className="bg-slate-950 text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-cyan-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2">
               <span>💬</span> Pedir en WhatsApp
            </a>
            <button onClick={() => setActiveCategory('Relojes')} className="bg-white text-slate-900 px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-slate-100 transition-all border border-slate-200 shadow-md">
               Ver Relojes
            </button>
          </div>
        </div>
      </section>

      {/* ─── GRILLA DE PRODUCTOS PREMIUM ─── */}
      <main className="max-w-7xl mx-auto px-6 py-20 z-10 relative">
        <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-5">
          <h3 className="text-3xl font-black uppercase tracking-tighter">Catálogo Completo</h3>
          <p className="text-[11px] text-slate-500 font-mono uppercase tracking-widest">({filtered.length} Resultados)</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filtered.map((product) => (
            <div key={product.id} className="group bg-white rounded-[2rem] p-5 border border-slate-100 hover:border-cyan-200 transition-all duration-500 flex flex-col hover:shadow-3xl hover:shadow-cyan-500/5">
              <div className="aspect-square bg-slate-100/60 rounded-3xl overflow-hidden mb-7 relative border border-slate-100 flex items-center justify-center p-6">
                <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out" />
                {product.stock <= 5 && <span className="absolute top-4 left-4 bg-rose-500 text-white text-[9px] px-2.5 py-1.5 rounded-xl font-black uppercase tracking-tighter">Últimas {product.stock}</span>}
              </div>
              <div className="flex-1 flex flex-col px-1">
                <p className="text-[11px] text-cyan-600 font-black mb-1.5 uppercase tracking-widest">{product.brand}</p>
                <h4 className="text-[13px] font-bold text-slate-900 mb-6 line-clamp-2 h-10 uppercase tracking-tight leading-tight">{product.name}</h4>
                <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-2xl font-black text-slate-950 tracking-tighter">${product.price.toLocaleString('es-CO')}</span>
                  <button onClick={() => setCart([...cart, product])} className="bg-slate-900 text-white p-3 rounded-2xl hover:bg-cyan-500 hover:text-white transition-all shadow-md flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ─── FOOTER SENIOR (EL QUE FALTABA) ─── */}
      <footer className="bg-slate-50 border-t border-slate-100 py-20 text-slate-700">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 flex items-center justify-center p-1 rounded-full bg-white border border-slate-200 shadow-sm opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                 <img src={URL_LOGO} alt="Mundo Accesorios" className="h-full w-auto object-contain" />
              </div>
              <h5 className="text-xl font-black tracking-tighter text-slate-950 uppercase">Mundo Accesorios</h5>
            </div>
            <p className="text-xs text-slate-500 uppercase font-black tracking-widest leading-loose">Tu tecnología, verificado y premium. Innovación en el corazón de Colombia.</p>
          </div>
          <div className="flex flex-col gap-5">
            <h6 className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-600 mb-3">Ubicación</h6>
            <p className="text-sm font-bold text-slate-800">Calle Real - Centro de La Dorada</p>
            <p className="text-sm font-medium">Departamento de Caldas - Colombia</p>
          </div>
          <div className="flex flex-col gap-5 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5">
             <h6 className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-600 mb-3">Horario Comercial</h6>
             <p className="text-sm font-bold text-slate-800">Lunes a Sábado: 8:00 AM - 7:00 PM</p>
             <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">CATÁLOGO VERIFICADO 2026</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-10 mt-16 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">© 2026 MUNDO ACCESORIOS DORADA | LA DORADA, CALDAS</p>
          <a href={whatsappUrlBase} target="_blank" className="text-cyan-600 font-black uppercase text-[10px] hover:underline">Soporte por WhatsApp</a>
        </div>
      </footer>

      {/* ─── CARRITO (DRAWER SENIOR) ─── */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-sm bg-white flex flex-col h-full shadow-3xl animate-slideIn">
            <div className="p-7 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                Pedido ({cart.length})
              </h2>
              <button onClick={() => setCartOpen(false)} className="text-slate-400 hover:text-slate-900 text-3xl font-black transition-transform hover:rotate-90">×</button>
            </div>
            <div className="flex-1 overflow-y-auto p-7 space-y-5 bg-slate-50/50">
              {cart.length === 0 ? (
                <div className="text-center py-16 opacity-30 text-slate-500">
                    <svg className="w-20 h-20 mx-auto mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                    <p className="font-black uppercase text-xs">Añade productos</p>
                </div>
              ) : (
                cart.map((item, i) => (
                  <div key={i} className="flex gap-4 bg-white p-3 rounded-2xl items-center border border-slate-100">
                    <div className="w-14 h-14 bg-white rounded-xl overflow-hidden p-1.5 flex-shrink-0 relative">
                      <img src={item.image} alt="Cart item" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 uppercase truncate leading-tight mb-1">{item.name}</p>
                      <p className="text-cyan-500 font-black text-sm">${item.price.toLocaleString('es-CO')}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-7 border-t border-slate-100 space-y-4 bg-white sticky bottom-0">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 uppercase font-black text-xs tracking-widest">Subtotal</span>
                <span className="text-3xl font-black text-slate-950 tracking-tighter">${cart.reduce((s, p) => s + p.price, 0).toLocaleString('es-CO')}</span>
              </div>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Mundo Accesorios Dorada! Quiero pedir:\n' + cart.map((p) => `- ${p.name}`).join('\n') + `\nTOTAL: $${cart.reduce((s,p)=>s+p.price,0).toLocaleString('es-CO')}`)}`}
                target="_blank"
                className="block w-full bg-slate-950 text-white text-center font-black py-4.5 rounded-2xl uppercase tracking-widest text-[11px] hover:bg-cyan-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2"
              >
                Confirmar WhatsApp
              </a>
              <button onClick={() => setCart([])} className="w-full text-center mt-6 text-[11px] font-black text-slate-300 uppercase tracking-widest hover:text-rose-500 transition-colors">Vaciar Carrito</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
