import { useState, useEffect } from "react";

const COLORS = {
  primary: "#0a3d62",
  secondary: "#1e88e5",
  accent: "#f39c12",
  accentDark: "#e67e22",
  dark: "#1a1a2e",
  light: "#f5f7fa",
  white: "#ffffff",
  text: "#313131",
  textLight: "#666666",
  success: "#27ae60",
  cardBg: "#ffffff",
  navBg: "#0a3d62",
};

const products = [
  {
    id: 1,
    name: "Caña Telescópica Pro 3.6m",
    category: "cañas",
    price: 45990,
    oldPrice: 59990,
    image: "https://via.placeholder.com/300x300/0a3d62/ffffff?text=Caña+Telescópica",
    badge: "Oferta",
    rating: 4.5,
    reviews: 32,
    description: "Caña telescópica de alta resistencia, ideal para pesca en río y lago.",
  },
  {
    id: 2,
    name: "Reel Spinning 4000",
    category: "reels",
    price: 69990,
    oldPrice: null,
    image: "https://via.placeholder.com/300x300/1e88e5/ffffff?text=Reel+Spinning",
    badge: "Nuevo",
    rating: 5,
    reviews: 18,
    description: "Reel spinning con sistema de freno ajustable y rodamientos de acero.",
  },
  {
    id: 3,
    name: "Set de Señuelos Artificiales x10",
    category: "señuelos",
    price: 15990,
    oldPrice: 21990,
    image: "https://via.placeholder.com/300x300/27ae60/ffffff?text=Señuelos+x10",
    badge: "Oferta",
    rating: 4,
    reviews: 45,
    description: "Kit de 10 señuelos variados para pesca al spinning.",
  },
  {
    id: 4,
    name: "Línea Monofilamento 0.30mm 300m",
    category: "líneas",
    price: 8990,
    oldPrice: null,
    image: "https://via.placeholder.com/300x300/f39c12/ffffff?text=Línea+300m",
    badge: null,
    rating: 4,
    reviews: 60,
    description: "Línea monofilamento transparente de alta resistencia.",
  },
  {
    id: 5,
    name: "Chaleco de Pesca Multipocket",
    category: "accesorios",
    price: 39990,
    oldPrice: 49990,
    image: "https://via.placeholder.com/300x300/2c3e50/ffffff?text=Chaleco+Pesca",
    badge: "Popular",
    rating: 4.5,
    reviews: 27,
    description: "Chaleco con 12 bolsillos, resistente al agua, talla M a XL.",
  },
  {
    id: 6,
    name: "Caña Surf Casting 4.2m",
    category: "cañas",
    price: 89990,
    oldPrice: null,
    image: "https://via.placeholder.com/300x300/0a3d62/ffffff?text=Surf+Casting",
    badge: "Premium",
    rating: 5,
    reviews: 12,
    description: "Caña para surf casting de grafito ultra ligero.",
  },
  {
    id: 7,
    name: "Caja Organizadora Tackle Box",
    category: "accesorios",
    price: 12990,
    oldPrice: null,
    image: "https://via.placeholder.com/300x300/8e44ad/ffffff?text=Tackle+Box",
    badge: null,
    rating: 4,
    reviews: 38,
    description: "Caja organizadora con 28 compartimentos ajustables.",
  },
  {
    id: 8,
    name: "Reel Baitcasting 7.1:1",
    category: "reels",
    price: 125990,
    oldPrice: 149990,
    image: "https://via.placeholder.com/300x300/1e88e5/ffffff?text=Reel+Baitcasting",
    badge: "Oferta",
    rating: 4.5,
    reviews: 9,
    description: "Reel baitcasting de alta velocidad para pesca deportiva.",
  },
];

const categories = ["todos", "cañas", "reels", "señuelos", "líneas", "accesorios"];

const navLinks = [
  { label: "Inicio", id: "home" },
  { label: "Productos", id: "products" },
  { label: "Nosotros", id: "about" },
  { label: "Contacto", id: "contact" },
];

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            color: star <= Math.floor(rating) ? "#f39c12" : star - 0.5 <= rating ? "#f39c12" : "#ddd",
            fontSize: "14px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ProductCard({ product, onAddToCart }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: COLORS.cardBg,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 12px 40px rgba(10,61,98,0.18)"
          : "0 4px 16px rgba(10,61,98,0.08)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.4s ease",
            display: "block",
          }}
        />
        {product.badge && (
          <span
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              background:
                product.badge === "Oferta"
                  ? "#e74c3c"
                  : product.badge === "Nuevo"
                  ? COLORS.success
                  : product.badge === "Premium"
                  ? "#8e44ad"
                  : COLORS.accent,
              color: "#fff",
              fontSize: "11px",
              fontWeight: "700",
              padding: "4px 10px",
              borderRadius: "20px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            {product.badge}
          </span>
        )}
      </div>
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <p
          style={{
            fontSize: "11px",
            color: COLORS.secondary,
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontWeight: "600",
            marginBottom: "6px",
          }}
        >
          {product.category}
        </p>
        <h3
          style={{
            fontSize: "15px",
            fontWeight: "700",
            color: COLORS.dark,
            marginBottom: "8px",
            lineHeight: "1.3",
          }}
        >
          {product.name}
        </h3>
        <p style={{ fontSize: "13px", color: COLORS.textLight, marginBottom: "10px", flex: 1 }}>
          {product.description}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <StarRating rating={product.rating} />
          <span style={{ fontSize: "12px", color: COLORS.textLight }}>({product.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <span style={{ fontSize: "20px", fontWeight: "800", color: COLORS.primary }}>
            ${product.price.toLocaleString("es-CL")}
          </span>
          {product.oldPrice && (
            <span
              style={{
                fontSize: "14px",
                color: COLORS.textLight,
                textDecoration: "line-through",
              }}
            >
              ${product.oldPrice.toLocaleString("es-CL")}
            </span>
          )}
        </div>
        <button
          onClick={handleAdd}
          style={{
            background: added ? COLORS.success : COLORS.primary,
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "10px 16px",
            fontSize: "13px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.2s ease",
            width: "100%",
          }}
        >
          {added ? "✓ Agregado" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}

function CartDrawer({ isOpen, onClose, cartItems, onRemove }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
        />
      )}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : "-380px",
          width: "380px",
          maxWidth: "100vw",
          height: "100vh",
          background: COLORS.white,
          zIndex: 1000,
          boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          transition: "right 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            background: COLORS.primary,
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: "18px", fontWeight: "700" }}>🛒 Mi Carrito</h2>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "none",
              color: "#fff",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          {cartItems.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "200px",
                color: COLORS.textLight,
              }}
            >
              <span style={{ fontSize: "48px", marginBottom: "12px" }}>🎣</span>
              <p style={{ fontSize: "15px" }}>Tu carrito está vacío</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "12px",
                  background: COLORS.light,
                  borderRadius: "12px",
                  marginBottom: "10px",
                  alignItems: "center",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "13px", fontWeight: "600", color: COLORS.dark, marginBottom: "4px" }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: "12px", color: COLORS.textLight }}>
                    x{item.qty} — ${(item.price * item.qty).toLocaleString("es-CL")}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  style={{
                    background: "#fee2e2",
                    border: "none",
                    color: "#e74c3c",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "600", color: COLORS.text }}>Total:</span>
              <span style={{ fontWeight: "800", fontSize: "20px", color: COLORS.primary }}>
                ${total.toLocaleString("es-CL")}
              </span>
            </div>
            {/* TODO: Conectar con pasarela de pago (Transbank, MercadoPago, etc.) */}
            <button
              style={{
                background: COLORS.accent,
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "14px",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
                width: "100%",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = COLORS.accentDark)}
              onMouseLeave={(e) => (e.target.style.background = COLORS.accent)}
            >
              Finalizar Compra →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeCategory, setActiveCategory] = useState("todos");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [contactForm, setContactForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [formSent, setFormSent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const totalCartItems = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const filteredProducts = products.filter((p) => {
    const matchCat = activeCategory === "todos" || p.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleFormChange = (e) => {
    setContactForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // TODO: Conectar con servicio de email (EmailJS, Formspree, etc.)
    setFormSent(true);
    setContactForm({ nombre: "", email: "", mensaje: "" });
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", color: COLORS.text, background: COLORS.light }}>
      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(10,61,98,0.97)" : COLORS.navBg,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.18)" : "none",
          transition: "all 0.3s ease",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "68px",
          }}
        >
          {/* Logo */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
            onClick={() => scrollToSection("home")}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                background: "linear-gradient(135deg, #f39c12, #e67e22)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
              }}
            >
              🎣
            </div>
            <div>
              <span style={{ color: "#fff", fontWeight: "800", fontSize: "20px", letterSpacing: "-0.5px" }}>
                Spy
              </span>
              <span style={{ color: COLORS.accent, fontWeight: "800", fontSize: "20px" }}>
                {" "}Digital
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  background: activeSection === link.id ? "rgba(243,156,18,0.15)" : "transparent",
                  border: "none",
                  color: activeSection === link.id ? COLORS.accent : "rgba(255,255,255,0.85)",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all 0.2s",
                  display: window.innerWidth < 768 ? "none" : "block",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = COLORS.accent;
                  e.target.style.background = "rgba(243,156,18,0.1)";
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== link.id) {
                    e.target.style.color = "rgba(255,255,255,0.85)";
                    e.target.style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Cart + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => setCartOpen(true)}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                borderRadius: "10px",
                padding: "8px 14px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              🛒
              {totalCartItems > 0 && (
                <span
                  style={{
                    background: COLORS.accent,
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: "800",
                    padding: "2px 6px",
                    borderRadius: "10px",
                    minWidth: "20px",
                    textAlign: "center",
                  }}
                >
                  {totalCartItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "22px",
                cursor: "pointer",
                padding: "6px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "#fff",
                  transition: "all 0.3s",
                  transform: mobileMenuOpen ? "rotate(45deg) translateY(6px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "#fff",
                  transition: "all 0.3s",
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "#fff",
                  transition: "all 0.3s",
                  transform: mobileMenuOpen ? "rotate(-45deg) translateY(-6px)" : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              background: "rgba(10,61,98,0.98)",
              padding: "16px 24px 20px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  display: "block",
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  color: activeSection === link.id ? COLORS.accent : "rgba(255,255,255,0.9)",
                  padding: "12px 0",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  textAlign: "left",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* CART DRAWER */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
      />

      {/* HERO SECTION */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${COLORS.dark} 0%, ${COLORS.primary} 50%, #1565c0 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(243,156,18,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(30,136,229,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        <div
          style={{
            maxWidth: "900px",
            textAlign: "center",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(243,156,18,0.15)",
              border: "1px solid rgba(243,156,18,0.3)",
              borderRadius: "20px",
              padding: "8px 18px",
              marginBottom: "28px",
            }}
          >
            <span style={{ color: COLORS.accent, fontSize: "13px", fontWeight: "600" }}>
              🎣 La mejor tienda de pesca del país
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 7vw, 72px)",
              fontWeight: "900",
              color: "#fff",
              lineHeight: "1.1",
              marginBottom: "24px",
              letterSpacing: "-1px",
            }}
          >
            Equípate para la{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f39c12, #ff6b35)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              aventura perfecta
            </span>
          </h1>
          <p
            style={{
              fontSize: "clamp(15px, 2.5vw, 20px)",
              color: "rgba(255,255,255,0.75)",
              maxWidth: "600px",
              margin: "0 auto 40px",
              lineHeight: "1.7",
            }}
          >
            Cañas, reels, señuelos y accesorios de la más alta calidad. Todo lo que necesitas para pescar en
            río, lago y mar.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => scrollToSection("products")}
              style={{
                background: "linear-gradient(135deg, #f39c12, #e67e22)",
                color: "#fff",
                border: "none",
                borderRadius: "14px",
                padding: "16px 36px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(243,156,18,0.4)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(243,156,18,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(243,156,18,0.4)";
              }}
            >
              Ver Productos →
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "14px",
                padding: "16px 36px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              Contactar
            </button>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "32px",
              justifyContent: "center",
              marginTop: "60px",
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "+500", label: "Productos" },
              { num: "+2.000", label: "Clientes" },
              { num: "15", label: "Años de experiencia" },
              { num: "4.9★", label: "Calificación" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <p style={{ fontSize: "28px", fontWeight: "800", color: COLORS.accent }}>
                  {stat.num}
                </p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginTop: "4px" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES STRIP */}
      <section
        style={{
          background: COLORS.white,
          padding: "40px 24px",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { emoji: "🎣", label: "Cañas", id: "cañas" },
            { emoji: "🔄", label: "Reels", id: "reels" },
            { emoji: "🐟", label: "Señuelos", id: "señuelos" },
            { emoji: "🧵", label: "Líneas", id: "líneas" },
            { emoji: "🎒", label: "Accesorios", id: "accesorios" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                scrollToSection("products");
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                background: COLORS.light,
                border: "2px solid #e2e8f0",
                borderRadius: "16px",
                padding: "16px 24px",
                cursor: "pointer",
                transition: "all 0.2s",
                minWidth: "100px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.primary;
                e.currentTarget.style.background = "#e8f4fd";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.background = COLORS.light;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span style={{ fontSize: "28px" }}>{cat.emoji}</span>
              <span style={{ fontSize: "13px", fontWeight: "600", color: COLORS.primary }}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" style={{ padding: "80px 24px", background: COLORS.light }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                background: "rgba(10,61,98,0.08)",
                color: COLORS.primary,
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "2px",
                padding: "6px 16px",
                borderRadius: "20px",
                display: "inline-block",
                marginBottom: "16px",
              }}
            >
              Catálogo
            </span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: "800",
                color: COLORS.dark,
                marginBottom: "12px",
              }}
            >
              Nuestros Productos
            </h2>
            <p style={{ color: COLORS.textLight, fontSize: "16px", maxWidth: "500px", margin: "0 auto" }}>
              Equipamiento de calidad para cada tipo de pesca
            </p>
          </div>

          {/* Search + Filter */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "32px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="🔍 Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                minWidth: "220px",
                padding: "12px 18px",
                borderRadius: "12px",
                border: "2px solid #e2e8f0",
                fontSize: "14px",
                outline: "none",
                background: COLORS.white,
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = COLORS.secondary)}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "10px",
                    border: "2px solid",
                    borderColor: activeCategory === cat ? COLORS.primary : "#e2e8f0",
                    background: activeCategory === cat ? COLORS.primary : COLORS.white,
                    color: activeCategory === cat ? "#fff" : COLORS.text,
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    transition: "all 0.2s",
                  }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px",
                color: COLORS.textLight,
              }}
            >
              <p style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</p>
              <p style={{ fontSize: "16px" }}>No se encontraron productos con esa búsqueda.</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "24px",
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        style={{
          padding: "80px 24px",
          background: COLORS.white,
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                background: "rgba(10,61,98,0.08)",
                color: COLORS.primary,
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "2px",
                padding: "6px 16px",
                borderRadius: "20px",
                display: "inline-block",
                marginBottom: "20px",
              }}
            >
              Nuestra historia
            </span>
            <h2
              style={{
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: "800",
                color: COLORS.dark,
                marginBottom: "20px",
                lineHeight: "1.2",
              }}
            >
              Apasionados por la pesca desde 2009
            </h2>
            <p
              style={{
                color: COLORS.textLight,
                lineHeight: "1.8",
                marginBottom: "16px",
                fontSize: "15px",
              }}
            >
              En <strong>Spy Digital</strong> somos pescadores como tú. Nacimos con la misión de llevar el
              mejor equipamiento de pesca a cada rincón del país, con precios justos y asesoría
              especializada.
            </p>
            <p
              style={{
                color: COLORS.textLight,
                lineHeight: "1.8",
                fontSize: "15px",
                marginBottom: "32px",
              }}
            >
              Trabajamos con las marcas más reconocidas del mundo y ofrecemos despacho a todo Chile con
              garantía en todos nuestros productos.
            </p>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {[
                { icon: "🚚", label: "Despacho a todo Chile" },
                { icon: "✅", label: "Garantía garantizada" },
                { icon: "💬", label: "Asesoría personalizada" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: COLORS.light,
                    padding: "10px 16px",
                    borderRadius: "10px",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{item.icon}</span>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: COLORS.primary }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            {[
              { emoji: "🎣", title: "Pesca en Río", desc: "Equipamiento especializado para truchas y salmones." },
              { emoji: "🌊", title: "Pesca en Mar", desc: "Cañas y reels para resistir el ambiente marino." },
              { emoji: "🏞️", title: "Pesca en Lago", desc: "Técnicas y equipos para aguas tranquilas." },
              { emoji: "🏆", title: "Pesca Deportiva", desc: "Accesorios para competición y tourneys." },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: i % 2 === 0 ? COLORS.primary : COLORS.light,
                  borderRadius: "16px",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{item.emoji}</div>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: i % 2 === 0 ? "#fff" : COLORS.dark,
                    marginBottom: "6px",
                  }}
                >
                  {item.title}
                </h4>
                <p style={{ fontSize: "12px", color: i % 2 === 0 ? "rgba(255,255,255,0.7)" : COLORS.textLight, lineHeight: "1.5" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER CTA */}
      <section
        style={{
          background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.accentDark} 100%)`,
          padding: "60px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: "800",
              color: "#fff",
              marginBottom: "12px",
            }}
          >
            🎣 ¿Listo para tu próxima aventura?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "16px", marginBottom: "28px" }}>
            Suscríbete y recibe un 10% de descuento en tu primera compra
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              maxWidth: "460px",
              margin: "0 auto",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {/* TODO: Conectar formulario de suscripción con servicio de email marketing */}
            <input
              type="email"
              placeholder="tu@correo.com"
              style={{
                flex: 1,
                minWidth: "220px",
                padding: "14px 18px",
                borderRadius: "12px",
                border: "none",
                fontSize: "14px",
                outline: "none",
              }}
            />
            <button
              style={{
                background: COLORS.primary,
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "14px 24px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.dark)}
              onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.primary)}
            >
              Suscribirme
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={{ padding: "80px 24px", background: COLORS.light }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                background: "rgba(10,61,98,0.08)",
                color: COLORS.primary,
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "2px",
                padding: "6px 16px",
                borderRadius: "20px",
                display: "inline-block",
                marginBottom: "16px",
              }}
            >
              Contáctanos
            </span>
            <h2
              style={{
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: "800",
                color: COLORS.dark,
                marginBottom: "12px",
              }}
            >
              ¿Tienes alguna consulta?
            </h2>
            <p style={{ color: COLORS.textLight, fontSize: "16px" }}>
              Estamos aquí para ayudarte a elegir el mejor equipo
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "40px",
            }}
          >
            {/* Info */}
            <div>
              {[
                { icon: "📍", title: "Dirección", desc: "Santiago, Chile" },
                { icon: "📞", title: "Teléfono", desc: "+56 9 1234 5678" },
                { icon: "✉️", title: "Correo", desc: "contacto@spydigital.cl" },
                { icon: "🕐", title: "Horario", desc: "Lun–Vie 9:00–18:00" },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      background: COLORS.primary,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontWeight: "700", color: COLORS.dark, fontSize: "14px" }}>{item.title}</p>
                    <p style={{ color: COLORS.textLight, fontSize: "14px", marginTop: "2px" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <form
              onSubmit={handleFormSubmit}
              style={{
                background: COLORS.white,
                borderRadius: "20px",
                padding: "32px",
                boxShadow: "0 8px 32px rgba(10,61,98,0.08)",
              }}
            >
              {formSent && (
                <div
                  style={{
                    background: "#dcfce7",
                    color: "#16a34a",
                    borderRadius: "10px",
                    padding: "12px 16px",
                    marginBottom: "20px",
                    fontSize: "14px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  ✅ ¡Mensaje enviado! Te responderemos pronto.
                </div>
              )}
              {[
                { name: "nombre", label: "Nombre completo", type: "text", placeholder: "Tu nombre" },
                { name: "email", label: "Correo electrónico", type: "email", placeholder: "tu@correo.com" },
              ].map((field) => (
                <div key={field.name} style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: COLORS.dark,
                      marginBottom: "8px",
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={contactForm[field.name]}
                    onChange={handleFormChange}
                    placeholder={field.placeholder}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "2px solid #e2e8f0",
                      fontSize: "14px",
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = COLORS.secondary)}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                </div>
              ))}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: COLORS.dark,
                    marginBottom: "8px",
                  }}
                >
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  value={contactForm.mensaje}
                  onChange={handleFormChange}
                  placeholder="¿En qué podemos ayudarte?"
                  required
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "2px solid #e2e8f0",
                    fontSize: "14px",
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "inherit",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = COLORS.secondary)}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "14px 28px",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                  width: "100%",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Enviar Mensaje 🎣
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: COLORS.dark,
          color: "rgba(255,255,255,0.7)",
          padding: "48px 24px 24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "40px",
              marginBottom: "40px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    background: "linear-gradient(135deg, #f39c12, #e67e22)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                  }}
                >
                  🎣
                </div>
                <span style={{ color: "#fff", fontWeight: "800", fontSize: "18px" }}>
                  Spy <span style={{ color: COLORS.accent }}>Digital</span>
                </span>
              </div>
              <p style={{ fontSize: "13px", lineHeight: "1.8" }}>
                Tu tienda especializada en pesca deportiva. Calidad, precio y pasión en cada producto.
              </p>
            </div>

            <div>
              <h4 style={{ color: "#fff", fontWeight: "700", marginBottom: "16px", fontSize: "15px" }}>
                Categorías
              </h4>
              {["Cañas", "Reels", "Señuelos", "Líneas", "Accesorios"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat.toLowerCase());
                    scrollToSection("products");
                  }}
                  style={{
                    display: "block",
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "13px",
                    padding: "4px 0",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = COLORS.accent)}
                  onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.65)")}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div>
              <h4 style={{ color: "#fff", fontWeight: "700", marginBottom: "16px", fontSize: "15px" }}>
                Información
              </h4>
              {["Sobre Nosotros", "Políticas de Envío", "Garantía", "Devoluciones"].map((item) => (
                <p key={item} style={{ fontSize: "13px", padding: "4px 0", cursor: "pointer" }}>
                  {item}
                </p>
              ))}
            </div>

            <div>
              <h4 style={{ color: "#fff", fontWeight: "700", marginBottom: "16px", fontSize: "15px" }}>
                Síguenos
              </h4>
              <div style={{ display: "flex", gap: "10px" }}>
                {["📘", "📸", "🎬", "💬"].map((icon, i) => (
                  <button
                    key={i}
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "10px",
                      fontSize: "18px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(243,156,18,0.2)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: "13px", marginTop: "20px", lineHeight: "1.7" }}>
                📞 +56 9 1234 5678
                <br />
                ✉️ contacto@spydigital.cl
              </p>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <p style={{ fontSize: "12px" }}>
              © {new Date().getFullYear()} Spy Digital — Todos los derechos reservados
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              {["Términos", "Privacidad", "Cookies"].map((item) => (
                <span
                  key={item}
                  style={{ fontSize: "12px", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.target.style.color = COLORS.accent)}
                  onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      {/* TODO: Reemplazar número de WhatsApp con el real */}
      <a
        href="https://wa.me/56912345678"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          width: "58px",
          height: "58px",
          background: "#25d366",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "26px",
          boxShadow: "0 8px 24px rgba(37,211,102,0.4)",
          zIndex: 200,
          textDecoration: "none",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(37,211,102,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,211,102,0.4)";
        }}
        title="Chatear por WhatsApp"
      >
        💬
      </a>
    </div>
  );
}