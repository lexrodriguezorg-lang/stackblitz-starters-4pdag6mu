'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// ─── PRODUCT DATA ──────────────────────────────────────────────────────────────
const inventarioKardex = [
  { id:1,   name:'Audífonos JBL Tune 510BT', price:89900,  image:'/audifonos-jbl.jpg',        category:'Audífonos',     brand:'JBL',        stock:12 },
  { id:2,   name:'Cargador Anker 65W USB-C',  price:79900,  image:'/cargador-anker.jpg',        category:'Cargadores',    brand:'Anker',      stock:20 },
  { id:3,   name:'Audífonos Sony WH-1000XM5', price:899900, image:'/audifonos-sony.jpg',        category:'Audífonos',     brand:'Sony',       stock:5  },
  { id:4,   name:'Cable USB-C Joyroom 1m',    price:19900,  image:'/cable-joyroom.jpg',         category:'Cables',        brand:'Joyroom',    stock:50 },
  { id:5,   name:'Soporte para celular Baseus',price:34900,  image:'/soporte-baseus.jpg',        category:'Soportes',      brand:'Baseus',     stock:30 },
  { id:6,   name:'Power Bank Xiaomi 10000mAh', price:119900, image:'/powerbank-xiaomi.jpg',      category:'Cargadores',    brand:'Xiaomi',     stock:15 },
  { id:7,   name:'Audífonos Monster DNA Pro',  price:299900, image:'/audifonos-monster.jpg',     category:'Audífonos',     brand:'Monster',    stock:8  },
  { id:8,   name:'Parlante JBL Flip 6',        price:399900, image:'/parlante-jbl.jpg',          category:'Parlantes',     brand:'JBL',        stock:7  },
  { id:9,   name:'Aro de luz LED 26cm',        price:69900,  image:'/aro-luz.jpg',               category:'Creadores',     brand:'Genérico',   stock:22 },
  { id:10,  name:'Trípode flexible Joby',      price:89900,  image:'/tripode-joby.jpg',          category:'Creadores',     brand:'Joby',       stock:18 },
  { id:11,  name:'Micrófono de solapa Boya',   price:59900,  image:'/microfono-boya.jpg',        category:'Creadores',     brand:'Boya',       stock:25 },
  { id:12,  name:'Gimbal DJI Osmo Mobile 6',   price:499900, image:'/gimbal.jpg',                category:'Creadores',     brand:'DJI',        stock:4  },
  { id:40,  name:'Audífonos Xiaomi Redmi',      price:49900,  image:'/audifonos-xiaomi.jpg',      category:'Audífonos',     brand:'Xiaomi',     stock:30 },
  { id:262, name:'Cable Lightning Joyroom',    price:24900,  image:'/cable-joyroom.jpg',         category:'Cables',        brand:'Joyroom',    stock:40 },
];

const categories = ['Todos','Audífonos','Cargadores','Cables','Soportes','Parlantes','Creadores'];

// ─── HERO SLIDES ──────────────────────────────────────────────────────────────
const heroSlides = [
  {
    id: 1,
    tag: 'NUEVA COLECCIÓN',
    title: 'Sonido que te pone en otro nivel',
    subtitle: 'Audífonos premium con cancelación de ruido. El mundo sigue, tú decides cuándo escucharlo.',
    cta: 'Ver audífonos',
    ctaLink: '#',
    bg: 'from-slate-900 via-purple-950 to-slate-900',
    accent: 'purple',
    image: '/audifonos-sony.jpg',
    category: 'Audífonos',
  },
  {
    id: 2,
    tag: 'SIEMPRE CONECTADO',
    title: 'Carga rápida. Sin excusas.',
    subtitle: 'Tecnología GaN de última generación. De 0 a 100% antes de que termines el café.',
    cta: 'Ver cargadores',
    ctaLink: '#',
    bg: 'from-slate-900 via-cyan-950 to-slate-900',
    accent: 'cyan',
    image: '/cargador-anker.jpg',
    category: 'Cargadores',
  },
  {
    id: 3,
    tag: 'PARA CREADORES',
    title: 'Tu contenido merece brillar',
    subtitle: 'Luces, micrófonos y trípodes pensados para los que crean. El algoritmo no perdona la mala calidad.',
    cta: 'Ver accesorios',
    ctaLink: '#',
    bg: 'from-slate-900 via-amber-950 to-slate-900',
    accent: 'amber',
    image: '/aro-luz.jpg',
    category: 'Creadores',
  },
  {
    id: 4,
    tag: 'LIFESTYLE',
    title: 'Lleva tu estilo a otro planeta',
    subtitle: 'Accesorios que combinan con tu vida, no solo con tu celular. Diseño + función en cada detalle.',
    cta: 'Ver todo',
    ctaLink: '#',
    bg: 'from-slate-900 via-rose-950 to-slate-900',
    accent: 'rose',
    image: '/parlante-jbl.jpg',
    category: 'Parlantes',
  },
];

// ─── TRUST BADGES ─────────────────────────────────────────────────────────────
const trustBadges = [
  { icon: '🚚', label: 'Envío express', sub: 'Bogotá en 24h' },
  { icon: '🔒', label: 'Pago seguro', sub: 'SSL + PSE' },
  { icon: '↩️', label: 'Devoluciones', sub: '30 días sin preguntas' },
  { icon: '⭐', label: '4.9/5 estrellas', sub: '+2.000 clientes felices' },
];

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ product, onAdd }: { product: typeof inventarioKardex[0]; onAdd: (p: typeof inventarioKardex[0]) => void }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="group relative bg-slate-800/60 backdrop-blur rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative bg-slate-700/30 overflow-hidden" style={{ paddingBottom: '80%' }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
        />
        {product.stock <= 5 && (
          <span className="absolute top-2 left-2 bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
            Últimas {product.stock}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-cyan-400 font-medium mb-1 uppercase tracking-wider">{product.brand}</p>
        <h3 className="text-sm text-white font-semibold leading-tight mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-white">${product.price.toLocaleString('es-CO')}</span>
          <button
            onClick={() => onAdd(product)}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-xs px-3 py-1.5 rounded-xl transition-colors"
          >
            + Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [cart, setCart] = useState<typeof inventarioKardex>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [heroIndex, setHeroIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const heroTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance hero carousel
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
    if (i === heroIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setHeroIndex(i);
      setIsAnimating(false);
    }, 300);
    if (heroTimer.current) clearInterval(heroTimer.current);
    heroTimer.current = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setHeroIndex((prev) => (prev + 1) % heroSlides.length);
        setIsAnimating(false);
      }, 400);
    }, 5000);
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
  const accentColors: Record<string, string> = {
    purple: 'text-purple-400',
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
  };
  const accentBorders: Record<string, string> = {
    purple: 'border-purple-500',
    cyan: 'border-cyan-500',
    amber: 'border-amber-500',
    rose: 'border-rose-500',
  };
  const accentBgs: Record<string, string> = {
    purple: 'bg-purple-500 hover:bg-purple-400',
    cyan: 'bg-cyan-500 hover:bg-cyan-400',
    amber: 'bg-amber-500 hover:bg-amber-400',
    rose: 'bg-rose-500 hover:bg-rose-400',
  };
  const accentDots: Record<string, string> = {
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };

  const whatsappMsg = encodeURIComponent('Hola! Vi sus productos en mundoaccesorios.vercel.app y quiero hacer un pedido');
  const whatsappUrl = `https://wa.me/573001234567?text=${whatsappMsg}`;

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* ─── NAVBAR ─────────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">

            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-full border-2 border-cyan-500 overflow-hidden ring-2 ring-cyan-500/30 flex-shrink-0 bg-slate-800">
                <Image src="/logo.png" alt="MundoAccesorios" width={40} height={40} className="object-cover w-full h-full" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-white leading-none">Mundo</p>
                <p className="text-xs text-cyan-400 font-semibold leading-none tracking-wider">ACCESORIOS</p>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-auto">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Busca audífonos, cargadores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="relative flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-cyan-500 px-3 py-2 rounded-xl transition-all flex-shrink-0"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13H5.4M17 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
              <span className="text-sm font-semibold hidden sm:block">Carrito</span>
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-cyan-500 text-slate-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

          </div>
        </div>
      </nav>

      {/* ─── CATEGORY BAR (sticky below nav) ────────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-700/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-slate-900'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── HERO CAROUSEL ───────────────────────────────────────────────────────── */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${slide.bg} transition-all duration-700`} style={{ minHeight: '520px' }}>
        {/* Background image */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-20 md:opacity-30">
            <Image src={slide.image} alt={slide.title} fill className="object-contain object-right-center p-8" sizes="50vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-20 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <span className={`inline-block text-xs font-bold tracking-widest px-3 py-1 rounded-full border mb-5 ${accentColors[slide.accent]} ${accentBorders[slide.accent]} bg-white/5`}>
            {slide.tag}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5 max-w-2xl">
            {slide.title}
          </h1>
          <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
            {slide.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory(slide.category)}
              className={`px-6 py-3 rounded-xl font-bold text-slate-900 transition-all shadow-lg ${accentBgs[slide.accent]}`}
            >
              {slide.cta}
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-white border border-white/30 hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <span>💬</span> Pide por WhatsApp
            </a>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === heroIndex ? `w-8 h-2.5 ${accentDots[slide.accent]}` : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ─── TRUST BADGES ────────────────────────────────────────────────────────── */}
      <section className="bg-slate-800/60 border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/30">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{b.label}</p>
                  <p className="text-xs text-slate-400">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS GRID ───────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-white">
              {activeCategory === 'Todos' ? 'Todo el catálogo' : activeCategory}
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">{filtered.length} productos</p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-slate-400 text-lg">No encontramos lo que buscas</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('Todos'); }} className="mt-4 text-cyan-400 hover:text-cyan-300 underline text-sm">
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
          </div>
        )}
      </main>

      {/* ─── FEATURED BANNER ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-cyan-600 to-purple-700 relative p-8 md:p-12">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-cyan-200 text-sm font-bold tracking-widest uppercase mb-2">Oferta de la semana</p>
              <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                Audífonos Sony<br />hasta 40% OFF
              </h3>
              <p className="text-white/80 mt-2 max-w-sm">Sonido de estudio. Cancelación activa de ruido. Para los que se toman en serio la música.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setActiveCategory('Audífonos')}
                className="px-8 py-3 bg-white text-slate-900 font-black rounded-xl hover:bg-slate-100 transition-colors shadow-lg text-sm"
              >
                Ver oferta
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-sm text-center flex items-center justify-center gap-2"
              >
                💬 Consultar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-800/80 border-t border-slate-700/50 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full border-2 border-cyan-500 overflow-hidden bg-slate-700">
                  <Image src="/logo.png" alt="MundoAccesorios" width={36} height={36} className="object-cover w-full h-full" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm leading-none">Mundo</p>
                  <p className="text-cyan-400 text-xs font-semibold tracking-wider leading-none">ACCESORIOS</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">Tu tienda de confianza para accesorios tecnológicos en Colombia. Calidad garantizada, precio justo.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Categorías</h4>
              <ul className="space-y-1.5">
                {categories.filter(c => c !== 'Todos').map(c => (
                  <li key={c}>
                    <button onClick={() => setActiveCategory(c)} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">{c}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Contáctanos</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span>💬</span>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors break-all">
                    WhatsApp: wa.me/573001234567
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span> Bogotá, Colombia
                </li>
                <li className="flex items-center gap-2">
                  <span>🕐</span> Lun–Sáb 8am–7pm
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700/50 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">© 2025 MundoAccesorios. Todos los derechos reservados.</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-colors shadow-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.278 7.034L.786 23.214l4.328-1.389A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.836 9.836 0 0 1-5.012-1.371l-.36-.214-3.721 1.194 1.215-3.63-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
              </svg>
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* ─── CART DRAWER ─────────────────────────────────────────────────────────── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-sm bg-slate-800 border-l border-slate-700 flex flex-col h-full shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-slate-700">
              <h2 className="text-lg font-bold text-white">Carrito ({cart.length})</h2>
              <button onClick={() => setCartOpen(false)} className="text-slate-400 hover:text-white p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-4xl mb-3">🛒</p>
                  <p className="text-slate-400">Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-700/50 rounded-xl p-3">
                      <div className="relative w-12 h-12 bg-slate-600 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" sizes="48px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                        <p className="text-cyan-400 font-bold text-sm">${item.price.toLocaleString('es-CO')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-700 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total</span>
                  <span className="text-white font-black text-xl">
                    ${cart.reduce((s, p) => s + p.price, 0).toLocaleString('es-CO')}
                  </span>
                </div>
                <a
                  href={`https://wa.me/573001234567?text=${encodeURIComponent('Hola! Quiero pedir:\n' + cart.map((p,i) => `${i+1}. ${p.name} - $${p.price.toLocaleString('es-CO')}`).join('\n') + `\nTotal: $${cart.reduce((s,p)=>s+p.price,0).toLocaleString('es-CO')}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 hover:bg-green-500 text-white text-center font-bold py-3 rounded-xl transition-colors"
                >
                  💬 Pedir por WhatsApp
                </a>
                <button onClick={() => setCart([])} className="block w-full text-center text-sm text-slate-400 hover:text-rose-400 transition-colors py-1">
                  Vaciar carrito
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
