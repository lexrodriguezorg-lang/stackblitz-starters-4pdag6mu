'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// ─── DATA REAL DE MUNDO ACCESORIOS (KARDEX + TUS FOTOS) ────────────────────────
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

// ─── HERO SLIDES (ADAPTADOS A TU MERCANCÍA) ──────────────────────────────────
const heroSlides = [
  {
    id: 1,
    tag: 'AUDIO PREMIUM',
    title: 'Monster PR: El sonido de los expertos',
    subtitle: 'Cancelación de ruido y bajos potentes. La joya de la corona en audio profesional.',
    cta: 'Ver Audífonos',
    bg: 'from-slate-900 via-purple-950 to-slate-900',
    accent: 'purple',
    image: '/monster.jpg',
    category: 'Audífonos',
  },
  {
    id: 2,
    tag: 'TECNOLOGÍA PRO',
    title: 'Contenido que rompe el algoritmo',
    subtitle: 'Gimbals, aros de luz y trípodes. Todo para que tu contenido se vea de nivel Senior.',
    cta: 'Ver Gadgets',
    bg: 'from-slate-900 via-cyan-950 to-slate-900',
    accent: 'cyan',
    image: '/gimbal.jpg',
    category: 'Creadores',
  },
  {
    id: 3,
    tag: 'ESTILO DE VIDA',
    title: 'Stanley: Hidratación con clase',
    subtitle: 'El termo que todos quieren. Diseño marmoleado con la resistencia de siempre.',
    cta: 'Ver Lifestyle',
    bg: 'from-slate-900 via-amber-950 to-slate-900',
    accent: 'amber',
    image: '/termo.jpg',
    category: 'Lifestyle',
  },
];

const trustBadges = [
  { icon: '🚚', label: 'Envío Nacional', sub: 'Desde La Dorada' },
  { icon: '🔒', label: 'Compra Segura', sub: 'Garantía Real' },
  { icon: '💬', label: 'Soporte VIP', sub: 'WhatsApp 24/7' },
  { icon: '⭐', label: 'Calidad Senior', sub: 'Lo mejor en tecnología' },
];

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ product, onAdd }: { product: typeof inventarioKardex[0]; onAdd: (p: typeof inventarioKardex[0]) => void }) {
  return (
    <div className="group relative bg-slate-800/60 backdrop-blur rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
      <div className="relative bg-white overflow-hidden" style={{ paddingBottom: '100%' }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:640px) 50vw, 25vw"
        />
        {product.stock <= 5 && (
          <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black uppercase">
            Últimas {product.stock}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-[10px] text-cyan-400 font-bold mb-1 uppercase tracking-widest">{product.brand} | REF: {product.id}</p>
        <h3 className="text-sm text-white font-bold leading-tight mb-3 line-clamp-2 h-10 uppercase">{product.name}</h3>
        <div className="flex items-center justify-between mt-3 border-t border-white/5 pt-3">
          <span className="text-lg font-black text-white">${product.price.toLocaleString('es-CO')}</span>
          <button
            onClick={() => onAdd(product)}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black text-[10px] px-3 py-2 rounded-xl transition-all uppercase"
          >
            + Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [cart, setCart] = useState<typeof inventarioKardex>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [heroIndex, setHeroIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const heroTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    heroTimer.current = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setHeroIndex((i) => (i + 1) % heroSlides.length);
        setIsAnimating(false);
      }, 400);
    }, 5000);
    return () => { if (heroTimer.current) clearInterval(heroTimer.current); };
  }, []);

  function goToSlide(i: number) {
    if (i === heroIndex || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setHeroIndex(i);
      setIsAnimating(false);
    }, 300);
  }

  function addToCart(product: typeof inventarioKardex[0]) {
    setCart((prev) => [...prev, product]);
  }

  const filtered = inventarioKardex.filter((p) => {
    const matchCat = activeCategory === 'Todos' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const slide = heroSlides[heroIndex];
  const accentBgs: Record<string, string> = { purple: 'bg-purple-500 hover:bg-purple-400', cyan: 'bg-cyan-500 hover:bg-cyan-400', amber: 'bg-amber-500 hover:bg-amber-400' };
  
  const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent('Hola Mundo Accesorios! Vi su catálogo en Vercel y quiero información sobre sus productos.')}`;

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-cyan-500 selection:text-black">

      {/* ─── NAVBAR (LOGO CIRCULAR REFINADO) ──────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-cyan-500 overflow-hidden bg-black shadow-[0_0_15px_-5px_rgba(0,229,255,0.5)] flex-shrink-0">
              <Image src="https://i.postimg.cc/9Rf9xYMW/Whats-App-Image-2026-03-28-at-4-42-36-PM-(1).jpg" alt="Logo" width={48} height={48} className="object-cover scale-110" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-black text-white leading-none uppercase">Mundo</p>
              <p className="text-[10px] text-cyan-400 font-black leading-none tracking-widest uppercase">Accesorios</p>
            </div>
          </div>

          <div className="flex-1 max-w-lg mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Busca referencias, marcas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-full pl-5 pr-4 py-2 text-xs focus:border-cyan-500 outline-none transition-all"
              />
            </div>
          </div>

          <button onClick={() => setCartOpen(true)} className="relative p-2 bg-slate-800 rounded-full border border-slate-600 hover:border-cyan-500 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">{cart.length}</span>}
          </button>
        </div>
      </nav>

      {/* ─── CATEGORY BAR ─────────────────────────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-slate-900/90 backdrop-blur border-b border-white/5 py-3">
        <div className="max-w-7xl mx-auto px-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`flex-shrink-0 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-white text-black' : 'bg-slate-800 text-slate-400 border border-white/5'}`}>{cat}</button>
          ))}
        </div>
      </div>

      {/* ─── HERO CAROUSEL ───────────────────────────────────────────────────────── */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${slide.bg} transition-all duration-700 min-h-[450px] flex items-center`}>
        <div className={`absolute inset-0 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-30">
            <Image src={slide.image} alt="Hero" fill className="object-contain object-right p-12" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-none uppercase mb-4 max-w-2xl">{slide.title}</h1>
          <p className="text-slate-300 text-sm md:text-lg mb-8 max-w-lg">{slide.subtitle}</p>
          <button onClick={() => setActiveCategory(slide.category)} className={`px-8 py-3 rounded-full font-black text-slate-900 uppercase text-xs tracking-widest transition-all ${accentBgs[slide.accent]}`}>{slide.cta}</button>
        </div>
      </section>

      {/* ─── GRID ───────────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-black uppercase tracking-tighter">{activeCategory === 'Todos' ? 'Catálogo Completo' : activeCategory}</h2>
          <p className="text-[10px] text-slate-500 font-mono uppercase">{filtered.length} Resultados</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filtered.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}
        </div>
      </main>

      {/* ─── FOOTER (EL QUE FALTABA) ───────────────────────────────────────────── */}
      <footer className="bg-black border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-cyan-500 overflow-hidden"><Image src="https://i.postimg.cc/9Rf9xYMW/Whats-App-Image-2026-03-28-at-4-42-36-PM-(1).jpg" alt="Logo" width={40} height={40} className="object-cover" /></div>
              <p className="font-black uppercase tracking-tighter">Mundo Accesorios</p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed uppercase">Tecnología, audio y gadgets de alto nivel. Distribución nacional desde el corazón de Colombia.</p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Contacto</h4>
            <p className="text-sm text-slate-400">La Dorada, Caldas - Colombia</p>
            <a href={whatsappUrl} className="text-sm text-white font-bold hover:text-cyan-400 transition-colors">WhatsApp: 300 123 4567</a>
          </div>
          <div className="flex flex-col gap-4">
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Síguenos</h4>
             <div className="flex gap-4">
                <span className="text-xs text-slate-500 uppercase font-bold cursor-pointer hover:text-white">Instagram</span>
                <span className="text-xs text-slate-500 uppercase font-bold cursor-pointer hover:text-white">Facebook</span>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-white/5 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] text-slate-600 font-mono uppercase tracking-widest">© 2026 MUNDO ACCESORIOS | LA DORADA, CALDAS</p>
          <p className="text-[9px] text-slate-600 font-mono uppercase tracking-widest">Desarrollo Senior x Vercel</p>
        </div>
      </footer>

      {/* ─── CART DRAWER ─────────────────────────────────────────────────────────── */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-sm bg-slate-900 border-l border-white/10 flex flex-col h-full shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-black uppercase italic">Tu Pedido ({cart.length})</h2>
              <button onClick={() => setCartOpen(false)} className="text-slate-400 hover:text-white font-black text-xl">×</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-4 bg-slate-800/50 p-3 rounded-xl border border-white/5 items-center">
                  <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0 relative">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-white uppercase truncate">{item.name}</p>
                    <p className="text-cyan-400 font-black text-sm">${item.price.toLocaleString('es-CO')}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-white/10 bg-black/20">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-400 uppercase font-black text-xs">Total</span>
                <span className="text-2xl font-black">${cart.reduce((s, p) => s + p.price, 0).toLocaleString('es-CO')}</span>
              </div>
              <a 
                href={`https://wa.me/573001234567?text=${encodeURIComponent('Hola! Quiero pedir:\n' + cart.map((p,i) => `- ${p.name}`).join('\n') + `\nTotal: $${cart.reduce((s,p)=>s+p.price,0).toLocaleString('es-CO')}`)}`}
                target="_blank"
                className="block w-full bg-green-600 hover:bg-green-500 text-white text-center font-black py-4 rounded-xl uppercase tracking-widest text-xs transition-all"
              >
                Confirmar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
