'use client';

import React, { useState, useEffect, useCallback } from 'react';

const URL_LOGO =
  'https://i.postimg.cc/9Rf9xYMW/Whats-App-Image-2026-03-28-at-4-42-36-PM-(1).jpg';

const inventarioKardex = [
  {
    id: '263',
    name: 'CARGADOR XO-30W GAN',
    price: 30000,
    stock: 372,
    maxStock: 500,
    category: 'Carga',
    badge: 'FULL STOCK',
    image: '/cargador-xo.jpg',
  },
  {
    id: '264',
    name: 'POWER BANK XO MAGSAFE',
    price: 80000,
    stock: 10,
    maxStock: 50,
    category: 'Carga',
    badge: 'ÚLTIMAS 2',
    image: '/powerbank-magsafe.jpg',
  },
  {
    id: '25',
    name: 'CABLE JOYROOM S-A29',
    price: 15000,
    stock: 100,
    maxStock: 200,
    category: 'Carga',
    badge: 'OFERTA',
    image: '/cable-joyroom.jpg',
  },
  {
    id: '40',
    name: 'AUDÍFONOS MONSTER DIADEMA',
    price: 120000,
    stock: 5,
    maxStock: 20,
    category: 'Audio',
    badge: 'PREMIUM',
    image: '/audifonos-monster.jpg',
  },
  {
    id: '262',
    name: 'AUDÍFONOS XO-Q7 TWS',
    price: 45000,
    stock: 30,
    maxStock: 100,
    category: 'Audio',
    badge: 'MÁS VENDIDO',
    image: '/audifonos-monster.jpg',
  },
  {
    id: '56',
    name: 'GIMBAL ESTABILIZADOR Q08',
    price: 150000,
    stock: 8,
    maxStock: 20,
    category: 'Creadores',
    badge: 'PREMIUM',
    image: '/gimbal.jpg',
  },
  {
    id: '280',
    name: 'ARO DE LUZ RGB U80',
    price: 100000,
    stock: 3,
    maxStock: 10,
    category: 'Creadores',
    badge: 'OFERTA',
    image: '/aro-luz.jpg',
  },
  {
    id: '33',
    name: 'RELOJ K9 ULTRA 2 MAX NEGRO',
    price: 150000,
    stock: 9,
    maxStock: 20,
    category: 'Relojes',
    badge: 'PREMIUM',
    image: '/reloj-negro.jpg',
  },
  {
    id: '1179',
    name: 'SMARTWATCH GS ULTRA 8',
    price: 120000,
    stock: 5,
    maxStock: 20,
    category: 'Relojes',
    badge: 'NUEVO',
    image: '/reloj-naranja.jpg',
  },
  {
    id: '340',
    name: 'TERMO STANLEY MARMO',
    price: 85000,
    stock: 15,
    maxStock: 30,
    category: 'Lifestyle',
    badge: 'TENDENCIA',
    image: '/termo-stanley.jpg',
  },
];

const categorias = [
  'Todos',
  'Audio',
  'Carga',
  'Relojes',
  'Creadores',
  'Lifestyle',
];

const heroSlides = [
  {
    image: '/audifonos-monster.jpg',
    tag: 'AUDIO DE ALTO NIVEL',
    title: 'Sonido que',
    highlight: 'te pone en otro nivel',
    sub: 'Audífonos premium con calidad profesional',
    cta: 'Ver Audio',
    color: 'from-cyan-500/30 to-transparent',
    accent: 'cyan',
  },
  {
    image: '/reloj-negro.jpg',
    tag: 'RELOJES INTELIGENTES',
    title: 'Lo último',
    highlight: 'en tecnología wearable',
    sub: 'Smartwatches que combinan estilo y función',
    cta: 'Ver Relojes',
    color: 'from-purple-500/30 to-transparent',
    accent: 'purple',
  },
  {
    image: '/gimbal.jpg',
    tag: 'PARA CREADORES',
    title: 'Crea contenido',
    highlight: 'que impacta',
    sub: 'Equipos para creadores que van en serio',
    cta: 'Ver Creadores',
    color: 'from-orange-500/30 to-transparent',
    accent: 'orange',
  },
  {
    image: '/powerbank-magsafe.jpg',
    tag: 'CARGA RÁPIDA',
    title: 'Siempre',
    highlight: 'con energía',
    sub: 'Cargadores y bancos de poder de alta potencia',
    cta: 'Ver Carga',
    color: 'from-green-500/30 to-transparent',
    accent: 'green',
  },
  {
    image: '/termo-stanley.jpg',
    tag: 'LIFESTYLE',
    title: 'El estilo',
    highlight: 'también importa',
    sub: 'Accesorios que dicen mucho de quien los lleva',
    cta: 'Ver Todo',
    color: 'from-pink-500/30 to-transparent',
    accent: 'pink',
  },
];

const accentColors: Record<string, string> = {
  cyan: 'text-cyan-400',
  purple: 'text-purple-400',
  orange: 'text-orange-400',
  green: 'text-green-400',
  pink: 'text-pink-400',
};
const accentBg: Record<string, string> = {
  cyan: 'bg-cyan-500 hover:bg-cyan-400',
  purple: 'bg-purple-500 hover:bg-purple-400',
  orange: 'bg-orange-500 hover:bg-orange-400',
  green: 'bg-green-500 hover:bg-green-400',
  pink: 'bg-pink-500 hover:bg-pink-400',
};
const accentBorder: Record<string, string> = {
  cyan: 'border-cyan-500',
  purple: 'border-purple-500',
  orange: 'border-orange-500',
  green: 'border-green-500',
  pink: 'border-pink-500',
};

function StockBar({ stock, maxStock }: { stock: number; maxStock: number }) {
  const pct = Math.min((stock / maxStock) * 100, 100);
  const color =
    pct > 50 ? 'bg-cyan-500' : pct > 20 ? 'bg-yellow-400' : 'bg-red-500';
  return (
    <div className="w-full bg-white/10 rounded-full h-1 mt-1">
      <div
        className={`${color} h-1 rounded-full transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [navbarH, setNavbarH] = useState(64);

  const goToSlide = useCallback((idx: number) => {
    setSliding(true);
    setTimeout(() => {
      setSlideIndex(idx);
      setSliding(false);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((slideIndex + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slideIndex, goToSlide]);

  useEffect(() => {
    const nav = document.getElementById('main-nav');
    if (nav) setNavbarH(nav.offsetHeight);
  }, []);

  const filtered = inventarioKardex.filter((p) => {
    const matchCat =
      activeCategory === 'Todos' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (id: string) => setCart((prev) => [...prev, id]);
  const removeFromCart = (id: string) =>
    setCart((prev) => {
      const i = prev.indexOf(id);
      return i > -1 ? [...prev.slice(0, i), ...prev.slice(i + 1)] : prev;
    });
  const cartItems = cart
    .map((id) => inventarioKardex.find((p) => p.id === id))
    .filter(Boolean) as typeof inventarioKardex;
  const cartTotal = cartItems.reduce((sum, p) => sum + p.price, 0);
  const slide = heroSlides[slideIndex];

  return (
    <div className="min-h-screen bg-[#08080a] text-white font-sans">
      {/* ── NAVBAR ─────────────────────────────────── */}
      <nav
        id="main-nav"
        className="fixed top-0 left-0 right-0 z-50 bg-[#08080a]/95 border-b border-white/8 backdrop-blur-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src={URL_LOGO}
              alt="Mundo Accesorios"
              className="h-12 w-auto object-contain rounded-lg"
            />
          </a>

          {/* Search bar — centro */}
          <div className="flex-1 max-w-lg mx-auto">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all"
              />
            </div>
          </div>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="#catalogo"
              className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              Catálogo
            </a>
            <a
              href="#categorias"
              className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              Categorías
            </a>
          </div>

          {/* Carrito */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 active:scale-95 transition-all text-black px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex-shrink-0"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h11"
              />
            </svg>
            <span className="hidden sm:inline">Carrito</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* ── HERO CARRUSEL ──────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: '64px',
          height: 'calc(100vh - 64px)',
          minHeight: '500px',
        }}
      >
        {/* Imagen de fondo */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            sliding ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Gradientes sobre la imagen */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-[#08080a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent" />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${slide.color}`}
          />
        </div>

        {/* Contenido */}
        <div
          className={`relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-7xl mx-auto transition-all duration-500 ${
            sliding ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
          }`}
        >
          <div className="max-w-xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
                {slide.tag}
              </span>
            </div>

            {/* Título */}
            <h1 className="text-5xl md:text-7xl font-black leading-none mb-3 text-white">
              {slide.title}
            </h1>
            <h1
              className={`text-5xl md:text-7xl font-black leading-none mb-6 ${
                accentColors[slide.accent]
              }`}
            >
              {slide.highlight}
            </h1>

            {/* Sub */}
            <p className="text-gray-300 text-base md:text-lg mb-8 font-medium leading-relaxed">
              {slide.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#catalogo"
                className={`${
                  accentBg[slide.accent]
                } text-black px-7 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-lg`}
              >
                {slide.cta}
              </a>
              <a
                href="#catalogo"
                className="border border-white/20 bg-white/5 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 backdrop-blur-sm"
              >
                Ver Todo
              </a>
            </div>
          </div>
        </div>

        {/* Dots navegación */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === slideIndex
                  ? `w-8 h-2 ${accentBg[slide.accent]}`
                  : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Flechas */}
        <button
          onClick={() =>
            goToSlide((slideIndex - 1 + heroSlides.length) % heroSlides.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 border border-white/10 hover:bg-black/70 transition-all flex items-center justify-center backdrop-blur-sm"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => goToSlide((slideIndex + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 border border-white/10 hover:bg-black/70 transition-all flex items-center justify-center backdrop-blur-sm"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Thumbnails en esquina inferior derecha */}
        <div className="absolute bottom-8 right-8 z-20 hidden md:flex gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                i === slideIndex
                  ? `${accentBorder[slide.accent]} scale-110`
                  : 'border-white/20 opacity-50 hover:opacity-80'
              }`}
            >
              <img
                src={s.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      {/* ── CATEGORÍAS sticky ──────────────────────── */}
      <div
        id="categorias"
        className="sticky top-16 z-40 bg-[#08080a]/97 border-b border-white/8 backdrop-blur-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/8'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── PRODUCTOS ──────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-24" id="catalogo">
        {/* Header sección */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-wider">
              {activeCategory === 'Todos' ? 'Todo el catálogo' : activeCategory}
            </h2>
            <p className="text-gray-500 text-xs mt-0.5">
              {filtered.length} productos disponibles
            </p>
          </div>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              Limpiar búsqueda ×
            </button>
          )}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-gray-600">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-lg font-bold">Sin resultados</p>
            <p className="text-sm mt-1">
              Intenta con otra búsqueda o categoría
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((producto) => {
            const isLowStock = producto.stock <= 3;
            return (
              <div
                key={producto.id}
                className="group bg-[#111115] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300"
              >
                {/* Imagen */}
                <div className="relative aspect-square overflow-hidden bg-[#1a1a20]">
                  <img
                    src={producto.image}
                    alt={producto.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                  {/* Badge */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="bg-cyan-500 text-black text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-lg">
                      {producto.badge}
                    </span>
                    {isLowStock && (
                      <span className="bg-red-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse">
                        ¡{producto.stock} left!
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3.5">
                  <p className="text-[9px] text-cyan-500 uppercase tracking-widest font-bold mb-0.5">
                    {producto.category}
                  </p>
                  <h3 className="text-xs font-black text-white leading-snug line-clamp-2 mb-2">
                    {producto.name}
                  </h3>

                  <p className="text-white font-black text-base leading-none">
                    <span className="text-gray-400 text-[10px] font-medium">
                      COP{' '}
                    </span>
                    {producto.price.toLocaleString('es-CO')}
                  </p>

                  {/* Stock */}
                  <div className="mt-2.5">
                    <div className="flex justify-between text-[9px] text-gray-500 mb-1">
                      <span>Stock: {producto.stock}</span>
                      <span>
                        {Math.round((producto.stock / producto.maxStock) * 100)}
                        %
                      </span>
                    </div>
                    <StockBar
                      stock={producto.stock}
                      maxStock={producto.maxStock}
                    />
                  </div>

                  <button
                    onClick={() => addToCart(producto.id)}
                    className="w-full mt-3 bg-white/8 hover:bg-cyan-500 hover:text-black text-white text-[10px] font-black py-2.5 rounded-lg uppercase tracking-widest transition-all duration-200 border border-white/10 hover:border-cyan-500 active:scale-95"
                  >
                    + Agregar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ── CARRITO SLIDE-IN ───────────────────────── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setCartOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-[#0f0f13] border-l border-white/8 h-full flex flex-col shadow-2xl">
            {/* Header carrito */}
            <div className="p-5 border-b border-white/8 flex items-center justify-between">
              <div>
                <h3 className="font-black uppercase tracking-widest text-sm">
                  Tu pedido
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">
                  {cart.length} {cart.length === 1 ? 'artículo' : 'artículos'}
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 && (
                <div className="text-center mt-16">
                  <p className="text-4xl mb-3">🛒</p>
                  <p className="text-gray-500 text-sm font-medium">
                    Tu carrito está vacío
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    Agrega productos para continuar
                  </p>
                </div>
              )}
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-center bg-white/4 rounded-xl p-3 border border-white/5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate text-white">
                      {item.name}
                    </p>
                    <p className="text-cyan-400 text-sm font-black mt-0.5">
                      COP {item.price.toLocaleString('es-CO')}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500/30 transition-colors flex items-center justify-center text-red-400 hover:text-red-300 text-sm flex-shrink-0"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Footer carrito */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-white/8 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total</span>
                  <span className="text-white font-black text-xl">
                    COP {cartTotal.toLocaleString('es-CO')}
                  </span>
                </div>
                <button className="w-full bg-cyan-500 hover:bg-cyan-400 active:scale-95 transition-all text-black py-3.5 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-cyan-500/20">
                  Finalizar Pedido por WhatsApp
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-center text-gray-500 hover:text-white text-xs transition-colors"
                >
                  Seguir comprando
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
