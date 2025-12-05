import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail, Instagram, Facebook, Tractor, Wheat, Snowflake, Store, Sprout, ArrowRight, ShoppingBag, Utensils, Leaf, Star, Beef, Milk } from 'lucide-react';
import RecipeGenerator from './components/RecipeGenerator';
import Logo from './components/Logo';
import ImageCarousel from './components/ImageCarousel';
import { SiteProvider, useSiteContext } from './context/SiteContext';

// --- Constants ---

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Chi Siamo', path: '/chi-siamo' },
  { label: 'Punto Vendita', path: '/store' },
  { label: 'Prodotti e Servizi', path: '/prodotti' },
  { label: 'Contatti', path: '/contatti' },
];

// --- Components ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-3 group">
             <div className="h-14 w-14 flex items-center justify-center transform group-hover:scale-105 transition-transform">
               <Logo className="h-full w-full" />
             </div>
             <div className="hidden sm:flex flex-col">
              <span className="text-xl font-serif font-bold text-farm-green leading-none">Azienda Agricola</span>
              <span className="text-sm tracking-widest text-farm-brown font-semibold">MATTEO CORONA</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                  location.pathname === link.path ? 'text-farm-green border-b-2 border-farm-green' : 'text-gray-500 hover:text-farm-green'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-600 hover:text-farm-green">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-farm-cream border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path ? 'text-farm-green bg-farm-beige' : 'text-gray-600 hover:text-farm-green hover:bg-farm-beige'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  const { data } = useSiteContext();
  
  return (
    <footer className="bg-farm-green text-white py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="font-serif text-xl font-bold mb-4">Azienda Agricola Corona Matteo</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Coltiviamo la terra con passione e rispetto per la tradizione, portando sulla tua tavola la qualità autentica dei prodotti locali.
          </p>
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold mb-4">Contatti Rapidi</h3>
          <div className="flex flex-col gap-2 items-center md:items-start text-sm text-gray-300">
            <a href={`mailto:${data.contacts.email}`} className="hover:text-white transition flex items-center gap-2">
              <Mail className="w-4 h-4" /> {data.contacts.email}
            </a>
            {data.contacts.phone && (
              <a href={`tel:${data.contacts.phone}`} className="hover:text-white transition flex items-center gap-2">
                <Phone className="w-4 h-4" /> {data.contacts.phone}
              </a>
            )}
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {data.contacts.city}</span>
          </div>
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold mb-4">Seguici</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a href={data.contacts.facebook} target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href={data.contacts.instagram} target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-white/20 pt-8 flex justify-center items-center gap-4 text-xs text-gray-400">
        <span>© {new Date().getFullYear()} Azienda Agricola Corona Matteo. Tutti i diritti riservati.</span>
      </div>
    </footer>
  );
};

// --- Pages ---

const HomePage = () => {
  const { data } = useSiteContext();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={data.images.homeHero}
            alt="Campi agricoli" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 drop-shadow-lg">
            Dalla Terra alla Tavola,<br />con Passione.
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl text-gray-100 font-light">
            Azienda agricola a conduzione familiare a {data.contacts.city}. Prodotti genuini, km0 e rispetto per la natura.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/store" className="bg-farm-light-green text-white hover:bg-white hover:text-farm-green px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg border-2 border-transparent hover:border-white">
              Visita il Negozio
            </Link>
            <Link to="/chi-siamo" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white px-8 py-3 rounded-full font-semibold transition-all">
              La Nostra Storia
            </Link>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <section className="py-20 bg-farm-cream transition-colors">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-farm-green mb-12">I Nostri Valori</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Amore per il Territorio", icon: MapPin, text: `Radicati a ${data.contacts.city}, valorizziamo la nostra terra.` },
              { title: "Sostenibilità", icon: Sprout, text: "Coltiviamo rispettando i ritmi della natura e la biodiversità." },
              { title: "Filiera Corta", icon: Store, text: "Dal produttore al consumatore, senza intermediari." },
              { title: "Qualità", icon: Wheat, text: "Solo prodotti freschi, genuini e controllati." }
            ].map((val, idx) => (
              <div key={idx} className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border-b-4 border-farm-green">
                <div className="w-16 h-16 bg-farm-beige rounded-full flex items-center justify-center mx-auto mb-4 text-farm-green">
                  <val.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{val.title}</h3>
                <p className="text-gray-600 text-sm">{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Feature Teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <RecipeGenerator />
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => {
  const { data } = useSiteContext();
  return (
    <div className="pt-10 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-farm-light-green font-bold tracking-wider uppercase text-sm">La Nostra Storia</span>
          <h2 className="text-4xl font-serif font-bold text-farm-green mt-2">Chi Siamo</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
            <img 
              src={data.images.aboutHero}
              alt="Matteo Corona" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              style={{ objectPosition: data.images.aboutHeroPosition || 'center center' }}
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Matteo Corona</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sono un giovane imprenditore agricolo di 27 anni, originario di questo splendido territorio. 
              La mia avventura è iniziata presto: a soli 18 anni ho deciso di trasformare la mia passione per la terra in un lavoro, fondando la mia azienda.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              L'azienda si estende su numerosi ettari a {data.contacts.city}. Ogni giorno lavoro nel rispetto della natura e delle tradizioni locali, 
              convinto che l'agricoltura sia non solo un mestiere, ma un modo per custodire il paesaggio e offrire qualità alla comunità.
            </p>
            <div className="pt-4">
              <Link to="/contatti" className="inline-flex items-center text-farm-green font-bold hover:underline">
                Vieni a trovarci <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const { data } = useSiteContext();
  return (
  <div className="pt-10 pb-20 animate-fade-in bg-farm-cream transition-colors">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-farm-green">Prodotti e Servizi</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Dalla coltivazione alla vendita, ci occupiamo di ogni fase con cura e dedizione.
          <br className="hidden md:block"/> 
          <strong>Forniamo all'ingrosso mercati e supermercati ogni giorno, garantendo freschezza e qualità costante.</strong>
        </p>
      </div>

      {/* Products Grid Layout (Restored) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        {data.products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
             <div className="h-64 overflow-hidden">
               <img 
                 src={product.image} 
                 alt={product.name} 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
               />
             </div>
             <div className="p-8">
               <span className="text-farm-light-green font-bold tracking-widest text-xs uppercase mb-2 block">{product.category}</span>
               <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">{product.name}</h3>
               <p className="text-gray-600 leading-relaxed">{product.description}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Services Section */}
      <div className="bg-farm-green rounded-3xl p-8 md:p-16 text-white shadow-2xl">
         <div className="text-center mb-12">
           <h3 className="text-3xl font-serif font-bold">I Nostri Servizi</h3>
           <p className="text-white/80 mt-2">Professionalità al servizio del territorio</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.services.map((service) => (
              <div key={service.id} className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
                <div className="bg-white text-farm-green w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  {service.iconName === 'Snowflake' ? <Snowflake className="w-6 h-6" /> : <Tractor className="w-6 h-6" />}
                </div>
                <h4 className="text-xl font-bold mb-3">{service.name}</h4>
                <p className="text-white/80">{service.description}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  </div>
);
}

const StorePage = () => {
  const { data } = useSiteContext();
  const [activeTab, setActiveTab] = useState<'fruitVeg' | 'preserves' | 'flour' | 'meat' | 'cheese'>('fruitVeg');
  
  // Tabs configuration
  const tabs = [
    { id: 'fruitVeg', label: 'Frutta & Verdura', icon: Leaf },
    { id: 'preserves', label: 'Conserve', icon: Star },
    { id: 'flour', label: 'Farine', icon: Wheat },
    { id: 'meat', label: 'Carni', icon: Beef },
    { id: 'cheese', label: 'Formaggi', icon: Milk },
  ] as const;

  return (
    <div className="pt-10 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Banner for Store */}
        <div className="relative rounded-3xl overflow-hidden mb-16 shadow-2xl h-80 md:h-[450px]">
          <img 
            src={data.images.storeHero} 
            alt="Negozio Interno" 
            className="w-full h-full object-cover"
            style={{ objectPosition: data.images.storeHeroPosition || 'center center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 md:p-16">
            <span className="bg-farm-light-green text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest w-fit mb-4">Nuova Apertura</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-2">Il Punto Vendita</h2>
            <p className="text-white/90 text-lg md:text-xl flex items-center gap-2">
              <MapPin className="w-5 h-5" /> {data.contacts.address}
            </p>
          </div>
        </div>

        {/* Intro Section */}
        <div className="grid md:grid-cols-3 gap-12 mb-20 items-start">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-serif font-bold text-farm-green mb-6 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8" />
              Sapori a Km 0
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Nel nostro nuovo punto vendita puoi trovare tutto il sapore della nostra terra. 
              Abbiamo selezionato per voi i migliori prodotti, trasformati con metodi artigianali o raccolti freschi ogni mattina.
              Un luogo dove la qualità incontra la tradizione.
            </p>
            
            {/* Categories Grid - REPLACES LIST */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
               {[
                 { icon: Wheat, label: "Farine Locali", desc: "Da cereali nostrani" },
                 { icon: Utensils, label: "Pasta Artigianale", desc: "Trafilata al bronzo" },
                 { icon: Leaf, label: "Frutta e Verdura", desc: "Fresca di giornata" },
                 { icon: Star, label: "Specialità", desc: "Sott'olio e conserve" },
               ].map((item, i) => (
                 <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="bg-farm-beige p-3 rounded-full text-farm-green">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{item.label}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Call to Action Box */}
          <div className="bg-farm-green text-white p-8 rounded-2xl shadow-xl transform rotate-1 hover:rotate-0 transition-transform">
            <h3 className="text-2xl font-bold mb-6 font-serif">Vieni a trovarci!</h3>
            <p className="mb-6 text-white/90">
              Siamo aperti per offrirti il meglio della produzione locale.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 mt-1 text-farm-light-green" />
                  <div>
                    <p className="font-bold">Indirizzo</p>
                    <p className="text-white/80 text-sm">{data.contacts.address},<br/>{data.contacts.city}</p>
                  </div>
              </div>
              <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 mt-1 text-farm-light-green" />
                  <div>
                    <p className="font-bold">Telefono</p>
                    <p className="text-white/80 text-sm">{data.contacts.phone || "Vieni in sede"}</p>
                  </div>
              </div>
            </div>
            <a 
              href="https://maps.app.goo.gl/dcYsUymcZuD3z45W8"
              target="_blank" 
              rel="noreferrer"
              className="block w-full text-center bg-white text-farm-green py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Ottieni Indicazioni
            </a>
          </div>
        </div>

        {/* Gallery Carousel with Tabs */}
        <div className="mb-20">
           <div className="text-center mb-8">
             <span className="text-farm-light-green font-bold tracking-wider uppercase text-xs">Esplora il negozio</span>
             <h3 className="text-3xl font-serif font-bold text-farm-green mb-6">Galleria Fotografica</h3>
             
             {/* Tabs */}
             <div className="flex flex-wrap justify-center gap-2 mb-8">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      activeTab === tab.id 
                      ? 'bg-farm-green text-white shadow-lg scale-105' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
             </div>
           </div>
           
           <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl">
             <ImageCarousel images={data.storeGalleries[activeTab]} />
           </div>
           
           {data.storeGalleries[activeTab].length === 0 && (
             <p className="text-center text-gray-400 text-sm mt-4 italic">Nessuna immagine in questa categoria.</p>
           )}
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const { data } = useSiteContext();
  return (
    <div className="pt-10 pb-20 animate-fade-in bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-serif font-bold text-farm-green mb-4">Contattaci</h2>
        <p className="text-gray-600 mb-12">Hai domande sui nostri prodotti o servizi? Scrivici o passa a trovarci.</p>
        
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-farm-cream p-8 rounded-xl shadow-sm border border-farm-beige transition-colors">
            <h3 className="text-xl font-bold text-farm-brown mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5" /> Scrivici
            </h3>
            <p className="text-gray-600 mb-4">Per ordini, informazioni o collaborazioni.</p>
            <a href={`mailto:${data.contacts.email}`} className="text-farm-green font-bold text-lg hover:underline break-all">
              {data.contacts.email}
            </a>
          </div>
          
          <div className="bg-farm-cream p-8 rounded-xl shadow-sm border border-farm-beige transition-colors">
            <h3 className="text-xl font-bold text-farm-brown mb-6 flex items-center gap-2">
              <Store className="w-5 h-5" /> Dove Siamo
            </h3>
            <p className="font-semibold text-gray-800">Azienda Agricola Corona Matteo</p>
            <p className="text-gray-600">{data.contacts.address}</p>
            <p className="text-gray-600 mb-4">{data.contacts.city}</p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">Seguici sui Social</h3>
          <div className="flex justify-center gap-6">
            <a href={data.contacts.instagram} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Instagram className="w-8 h-8" />
              </div>
              <span className="text-sm font-medium text-gray-500">Instagram</span>
            </a>
            <a href={data.contacts.facebook} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Facebook className="w-8 h-8" />
              </div>
              <span className="text-sm font-medium text-gray-500">Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  return (
    <SiteProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col font-sans text-gray-800 selection:bg-farm-light-green selection:text-white">
          <Routes>
             {/* Admin Route Removed */}
             <Route path="*" element={
              <>
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/chi-siamo" element={<AboutPage />} />
                    <Route path="/prodotti" element={<ProductsPage />} />
                    <Route path="/store" element={<StorePage />} />
                    <Route path="/contatti" element={<ContactPage />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </HashRouter>
    </SiteProvider>
  );
};

export default App;