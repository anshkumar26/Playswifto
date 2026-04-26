import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
const NAV_LINKS = ["Venues", "Sports", "Tournaments", "Coaches", "Pricing"];

const SPORTS = [
  { icon: "⚽", name: "Football" },
  { icon: "🏏", name: "Cricket" },
  { icon: "🏸", name: "Badminton" },
  { icon: "🎾", name: "Tennis" },
  { icon: "🏀", name: "Basketball" },
  { icon: "🏊", name: "Swimming" },
  { icon: "🥊", name: "Boxing" },
  { icon: "🏐", name: "Volleyball" },
];

const VENUES = [
  {
    name: "Arena FC Ground",
    sport: "Football",
    location: "Connaught Place, Delhi",
    price: "₹800/hr",
    rating: 4.9,
    reviews: 312,
    tag: "Top Rated",
    tagColor: "bg-emerald-400 text-emerald-900",
    img: "football",
  },
  {
    name: "SmashZone Badminton",
    sport: "Badminton",
    location: "Lajpat Nagar, Delhi",
    price: "₹350/hr",
    rating: 4.7,
    reviews: 189,
    tag: "New",
    tagColor: "bg-amber-400 text-amber-900",
    img: "badminton",
  },
  {
    name: "Court Kings Tennis",
    sport: "Tennis",
    location: "Dwarka, Delhi",
    price: "₹600/hr",
    rating: 4.8,
    reviews: 241,
    tag: "Popular",
    tagColor: "bg-[color:var(--ps-accent-1)] text-slate-900",
    img: "tennis",
  },
  {
    name: "CricBuzz Academy",
    sport: "Cricket",
    location: "Rohini, Delhi",
    price: "₹1200/hr",
    rating: 4.6,
    reviews: 98,
    tag: "Premium",
    tagColor: "bg-violet-400 text-violet-900",
    img: "cricket",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Find a Venue",
    desc: "Search thousands of sports venues near you by sport, date, and time.",
    icon: "🔍",
  },
  {
    num: "02",
    title: "Pick a Slot",
    desc: "Browse real-time availability and choose the slot that fits your schedule.",
    icon: "📅",
  },
  {
    num: "03",
    title: "Book & Pay",
    desc: "Instant confirmation with secure payments. No hassle, no calls.",
    icon: "✅",
  },
  {
    num: "04",
    title: "Play!",
    desc: "Show up, play your game. It's that simple with PlaySwifto.",
    icon: "🏆",
  },
];

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    role: "Weekend Footballer",
    text: "PlaySwifto changed how our group books grounds. What used to take days of calling now takes 2 minutes. The real-time slots are a game changer.",
    avatar: "AM",
    color: "bg-[color:var(--ps-primary)]",
  },
  {
    name: "Priya Sharma",
    role: "Badminton Enthusiast",
    text: "Love how I can compare venues by ratings and price. Found my go-to court in Lajpat Nagar through PlaySwifto and never looked back!",
    avatar: "PS",
    color: "bg-emerald-500",
  },
  {
    name: "Rohan Kapoor",
    role: "Cricket Coach",
    text: "As a venue owner too, the platform brings us steady bookings. The dashboard is clean and payouts are always on time. Highly recommend.",
    avatar: "RK",
    color: "bg-violet-500",
  },
];

const STATS = [
  { val: "12,000+", label: "Venues Listed" },
  { val: "8 Lakh+", label: "Bookings Done" },
  { val: "50+", label: "Cities Covered" },
  { val: "4.8★", label: "Avg App Rating" },
];

// SVG Venue Illustration placeholder
function VenueCard({ venue, idx }) {
  const gradients = [
    "from-green-800 to-green-600",
    "from-sky-800 to-sky-600",
    "from-blue-900 to-sky-600",
    "from-emerald-800 to-teal-600",
  ];
  const icons = ["⚽", "🏸", "🎾", "🏏"];
  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col"
      style={{ animationDelay: `${idx * 100}ms` }}
    >
      <div className={`h-44 bg-linear-to-br ${gradients[idx]} flex items-center justify-center relative`}>
        <span className="text-6xl opacity-60 group-hover:scale-110 transition-transform duration-300">
          {icons[idx]}
        </span>
        <span
          className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${venue.tagColor}`}
        >
          {venue.tag}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-900 text-base leading-snug">{venue.name}</h3>
          <span className="text-[color:var(--ps-primary)] font-bold text-sm whitespace-nowrap">{venue.price}</span>
        </div>
        <p className="text-xs text-gray-400 font-medium mb-3">{venue.sport}</p>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
          <svg className="w-3.5 h-3.5 text-[color:var(--ps-primary-2)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {venue.location}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-sm font-semibold text-gray-800">{venue.rating}</span>
            <span className="text-xs text-gray-400">({venue.reviews})</span>
          </div>
          <button className="text-xs font-semibold text-white bg-[color:var(--ps-primary)] hover:bg-[color:var(--ps-primary-2)] transition-colors px-4 py-1.5 rounded-full">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PlaySwifto() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSport, setActiveSport] = useState("Football");
  const [searchCity, setSearchCity] = useState("");
  const [searchSport, setSearchSport] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ──────────── NAVBAR ──────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-[color:var(--ps-primary)] rounded-lg flex items-center justify-center shadow-[0_0_40px_rgba(30,136,229,0.35)]">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span
                className={`font-extrabold text-xl tracking-tight transition-colors ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Play<span className="text-[color:var(--ps-primary)]">Swifto</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className={`text-sm font-semibold transition-colors hover:text-[color:var(--ps-primary-2)] ${
                    scrolled ? "text-gray-700" : "text-white/80"
                  }`}
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3 z-0">
              <button
                className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                  scrolled
                    ? "text-gray-700 hover:text-[color:var(--ps-primary)]"
                    : "text-white/80 hover:text-white"
                }`}
                onClick={()=>navigate("/login")}
              >
                Log In
              </button>
              <button className="text-sm font-bold px-5 py-2 bg-[color:var(--ps-primary)] hover:bg-[color:var(--ps-primary-2)] text-white rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[0_20px_50px_rgba(30,136,229,0.18)]" onClick={()=>navigate("/signup")}>
                Sign Up Free
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-semibold text-gray-700 hover:text-[color:var(--ps-primary)] py-1"
                >
                  {link}
                </a>
              ))}
              <hr className="border-gray-100 my-1" />
              <button className="text-sm font-semibold text-gray-700 hover:text-[color:var(--ps-primary)] py-1 text-left">Log In</button>
              <button className="text-sm font-bold px-5 py-2.5 bg-[color:var(--ps-primary)] text-white rounded-full w-full">
                Sign Up Free
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ──────────── HERO ──────────── */}
      <section className="ps-bg-hero min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: "rgba(30,136,229,0.12)" }} />
          <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: "rgba(30,136,229,0.08)" }} />
          {/* Subtle grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="playswifto-fade-up">
              <div className="inline-flex items-center gap-2 bg-[color:var(--ps-primary)]/20 text-[color:var(--ps-accent-1)] text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-[color:var(--ps-primary)]/30">
                <span className="w-1.5 h-1.5 bg-[color:var(--ps-accent-1)] rounded-full animate-pulse" />
                India's fastest-growing sports booking platform
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                Book Sports <br />
                <span className="text-[color:var(--ps-primary)]">Venues</span> in <br />
                Seconds. ⚡
              </h1>
              <p className="text-white/60 text-lg mb-8 leading-relaxed max-w-md">
                Find and instantly book top-rated football grounds, badminton courts, cricket nets, and more near you. No calls. No waiting.
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-2xl mb-8 max-w-lg">
                <div className="flex items-center gap-2 flex-1 py-3 md:py-0 border-gray-200 border-b px-3">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter city or area..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent"
                  />
                </div>
                <div className="w-px bg-gray-200 hidden sm:block self-stretch my-1" />
                <div className="flex items-center gap-2 flex-1 py-2 md:py-0 px-3">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Sport (Football, Cricket...)"
                    value={searchSport}
                    onChange={(e) => setSearchSport(e.target.value)}
                    className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent"
                  />
                </div>
                <button className="bg-[color:var(--ps-primary)] hover:bg-[color:var(--ps-primary-2)] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
                  Search →
                </button>
              </div>

              {/* Quick sport pills */}
              <div className="flex flex-wrap gap-2">
                {["Football ⚽", "Cricket 🏏", "Badminton 🏸", "Tennis 🎾"].map((s) => (
                  <button
                    key={s}
                    className="text-xs font-semibold text-white/70 hover:text-white border border-white/20 hover:border-[color:var(--ps-primary)]/60 px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-white/5 hover:-translate-y-0.5"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Floating Stats Card */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                {/* Main card */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 w-72 playswifto-float">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-[color:var(--ps-primary)] rounded-xl flex items-center justify-center text-xl">⚽</div>
                    <div>
                      <p className="text-white font-bold text-sm">Arena FC Ground</p>
                      <p className="text-white/50 text-xs">Connaught Place</p>
                    </div>
                    <span className="ml-auto text-xs font-bold text-emerald-400 bg-emerald-400/15 px-2 py-1 rounded-full">OPEN</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {["6 AM","7 AM","8 AM","9 AM","10 AM","11 AM"].map((t, i) => (
                      <div
                        key={t}
                        className={`rounded-lg py-2 text-center text-xs font-semibold transition-colors cursor-pointer ${
                          i === 1
                            ? "bg-[color:var(--ps-primary)] text-white"
                            : i === 3 || i === 4
                            ? "bg-red-500/20 text-red-400"
                            : "bg-white/10 text-white/70 hover:bg-white/20"
                        }`}
                      >
                        {t}
                        {(i === 3 || i === 4) && <div className="text-[9px] mt-0.5 text-red-400">Full</div>}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/50 text-xs">Per Hour</p>
                      <p className="text-white font-extrabold text-lg">₹800</p>
                    </div>
                    <button className="bg-[color:var(--ps-primary)] hover:bg-[color:var(--ps-primary-2)] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors">
                      Book Slot
                    </button>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="font-bold text-gray-900 text-sm">4.9</span>
                  <span className="text-gray-400 text-xs">(312 reviews)</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-emerald-500 text-white rounded-2xl shadow-xl px-3 py-2.5">
                  <p className="text-xs font-bold">✓ Instant Booking</p>
                  <p className="text-emerald-200 text-xs">Confirmed in 2 sec</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white/5 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/10 border-l-4 border-l-[color:var(--ps-primary)]/80">
                <p className="text-white font-extrabold text-2xl">{s.val}</p>
                <p className="text-white/50 text-sm mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 80L1440 80L1440 20C1200 70 960 0 720 30C480 60 240 10 0 50L0 80Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* ──────────── SPORTS CATEGORIES ──────────── */}
      <section id="sports" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[color:var(--ps-primary)] font-bold text-sm uppercase tracking-widest">Browse by Sport</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Every Sport. Every City.
            </h2>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {SPORTS.map((sport) => (
              <button
                key={sport.name}
                onClick={() => setActiveSport(sport.name)}
                className={`flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border-2 transition-all duration-200 group ${
                  activeSport === sport.name
                    ? "bg-[color:var(--ps-primary)] border-[color:var(--ps-primary)] shadow-lg shadow-[0_20px_50px_rgba(30,136,229,0.18)]"
                    : "bg-white border-gray-100 hover:border-[color:var(--ps-primary-2)] hover:shadow-md"
                }`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{sport.icon}</span>
                <span
                  className={`text-xs font-semibold text-center leading-tight ${
                    activeSport === sport.name ? "text-white" : "text-gray-600"
                  }`}
                >
                  {sport.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── FEATURED VENUES ──────────── */}
      <section id="venues" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[color:var(--ps-primary)] font-bold text-sm uppercase tracking-widest">Featured Venues</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                Top-Rated Near You
              </h2>
              <p className="text-gray-500 mt-2 max-w-md">Hand-picked venues with verified amenities and instant booking.</p>
            </div>
            <button className="text-sm font-bold text-[color:var(--ps-primary)] hover:text-[color:var(--ps-primary-2)] flex items-center gap-1 group whitespace-nowrap">
              View all venues
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VENUES.map((venue, idx) => (
              <VenueCard key={venue.name} venue={venue} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── HOW IT WORKS ──────────── */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[color:var(--ps-primary)] font-bold text-sm uppercase tracking-widest">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Book in 4 Simple Steps
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {STEPS.map((step, idx) => (
              <div key={step.num} className="relative">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{step.icon}</span>
                    <span className="text-4xl font-extrabold text-sky-100">{step.num}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-8 -right-3 z-10">
                    <svg className="w-6 h-6 text-sky-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── TESTIMONIALS ──────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[color:var(--ps-primary)] font-bold text-sm uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Players Love PlaySwifto
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-sky-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 ${t.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── APP CTA BANNER ──────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ps-bg-hero rounded-3xl px-8 py-14 md:px-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(30,136,229,0.18)" }} />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                  Ready to Play? 🚀
                </h2>
                <p className="text-white/60 text-lg max-w-md">
                  Join 8 lakh+ players who book smarter with PlaySwifto. Download the app or book online in seconds.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <button className="flex items-center gap-3 bg-white text-gray-900 font-bold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 leading-none">Download on</p>
                    <p className="text-sm font-bold leading-tight">App Store</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 bg-white text-gray-900 font-bold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.37.2.8.22 1.21.04L15 17.09l-3.37-3.37-8.45 10.04zm16.04-10.44L17.04 12l2.18-1.32-5.54-9.59a1.37 1.37 0 00-.82-.51L20.77 11.5c.3.18.48.5.48.84s-.18.66-.48.84l-1.55.14zM2.58 1.45a1.36 1.36 0 00-.25.82v19.46c0 .3.09.58.25.82L12 12 2.58 1.45zm9.39 9.18L4.39.24C4.02.06 3.6.08 3.22.28L12 12l-.03-1.37z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 leading-none">Get it on</p>
                    <p className="text-sm font-bold leading-tight">Google Play</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── FOOTER ──────────── */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[color:var(--ps-primary)] rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-extrabold text-xl">Play<span className="text-[color:var(--ps-primary)]">Swifto</span></span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
                India's fastest-growing sports venue booking platform. Find, book, and play at the best venues near you.
              </p>
              <div className="flex gap-3">
                {["Twitter", "Instagram", "LinkedIn", "YouTube"].map((s) => (
                  <button key={s} className="w-9 h-9 bg-gray-800 hover:bg-[color:var(--ps-primary)] rounded-lg flex items-center justify-center transition-colors text-xs font-bold text-gray-400 hover:text-white">
                    {s[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Explore",
                links: ["Find Venues", "Browse Sports", "Tournaments", "Coaches & Trainers", "Corporate Bookings"],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Press", "Partner With Us"],
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service", "Cancellation Policy"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-[color:var(--ps-accent-1)] text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} PlaySwifto Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs">Available in</span>
              <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full">Delhi</span>
              <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full">Mumbai</span>
              <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full">+48 cities</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
