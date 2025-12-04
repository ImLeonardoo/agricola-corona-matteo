import React, { useState } from 'react';
import { useSiteContext } from '../context/SiteContext';
import { Lock, Save, RotateCcw, Upload, Image as ImageIcon, Plus, Trash2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import { Product, Service } from '../types';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // About Image Position State
  const { data, updateData, resetToDefaults } = useSiteContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'agricola2024') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Password errata');
    }
  };

  const handleImageUpload = (file: File, callback: (result: string) => void) => {
    if (file) {
      if (file.size > 4000000) { // 4MB limit
        alert("L'immagine è troppo grande. Per favore usa un'immagine inferiore a 4MB per non rallentare il sito.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Recipe Management ---
  const [newRecipeTitle, setNewRecipeTitle] = useState('');
  const [newRecipeContent, setNewRecipeContent] = useState('');

  const addRecipe = () => {
    if (!newRecipeTitle || !newRecipeContent) return;
    const newRecipe = {
      id: Date.now().toString(),
      title: newRecipeTitle,
      content: newRecipeContent
    };
    updateData('recipes', [...data.recipes, newRecipe]);
    setNewRecipeTitle('');
    setNewRecipeContent('');
  };

  const deleteRecipe = (id: string) => {
    if (window.confirm('Cancellare questa ricetta?')) {
      updateData('recipes', data.recipes.filter(r => r.id !== id));
    }
  };

  // --- Product Management ---
  const updateProduct = (id: string, field: keyof Product, value: string) => {
    const updatedProducts = data.products.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    );
    updateData('products', updatedProducts);
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    const updatedServices = data.services.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    );
    updateData('services', updatedServices);
  };

  // --- Image Position Logic ---
  const handlePositionChange = (axis: 'x' | 'y', value: number) => {
    const currentPos = data.images.aboutHeroPosition ? data.images.aboutHeroPosition.split(' ') : ['50%', '50%'];
    if (axis === 'x') currentPos[0] = `${value}%`;
    if (axis === 'y') currentPos[1] = `${value}%`;
    updateData('images', { aboutHeroPosition: currentPos.join(' ') });
  };
  
  const getPositionValue = (axis: 'x' | 'y') => {
    const currentPos = data.images.aboutHeroPosition ? data.images.aboutHeroPosition.split(' ') : ['50%', '50%'];
    return parseInt(axis === 'x' ? currentPos[0] : currentPos[1]);
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-farm-cream px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-farm-green w-full max-w-md">
          <div className="flex justify-center mb-6 text-farm-green">
            <Lock className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-center mb-6 text-farm-green">Area Riservata</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Amministratore</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-green focus:outline-none"
                placeholder="Inserisci password"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-farm-green text-white py-3 rounded-lg font-bold hover:bg-emerald-900 transition-colors"
            >
              Accedi
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-farm-green text-white p-6 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-2xl font-serif font-bold">Pannello di Controllo</h1>
          <button 
            onClick={resetToDefaults}
            className="flex items-center gap-2 text-sm bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Reset Sito
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-12">
          
          {/* Recipes Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
              <Plus className="w-5 h-5 text-farm-green" /> Gestione Ricette
            </h2>
            <div className="mb-6 bg-farm-beige/30 p-4 rounded-lg border border-farm-beige">
              <h3 className="font-bold text-sm mb-2 text-farm-brown">Aggiungi Nuova Ricetta</h3>
              <input 
                type="text" 
                placeholder="Titolo Ricetta" 
                className="w-full p-2 mb-2 border rounded"
                value={newRecipeTitle}
                onChange={(e) => setNewRecipeTitle(e.target.value)}
              />
              <textarea 
                placeholder="Ingredienti e Procedimento..." 
                className="w-full p-2 mb-2 border rounded h-24"
                value={newRecipeContent}
                onChange={(e) => setNewRecipeContent(e.target.value)}
              />
              <button 
                onClick={addRecipe}
                disabled={!newRecipeTitle || !newRecipeContent}
                className="bg-farm-light-green text-white px-4 py-2 rounded font-bold text-sm hover:bg-farm-green disabled:opacity-50"
              >
                Aggiungi
              </button>
            </div>
            
            <div className="space-y-4">
              {data.recipes.map(recipe => (
                <div key={recipe.id} className="bg-white border p-4 rounded-lg flex justify-between items-start shadow-sm">
                  <div>
                    <h4 className="font-bold text-farm-green">{recipe.title}</h4>
                    <p className="text-xs text-gray-500 truncate max-w-md">{recipe.content}</p>
                  </div>
                  <button 
                    onClick={() => deleteRecipe(recipe.id)}
                    className="text-red-500 hover:bg-red-50 p-1 rounded"
                    title="Elimina"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {data.recipes.length === 0 && <p className="text-gray-500 italic text-sm">Nessuna ricetta inserita.</p>}
            </div>
          </section>

          {/* Products Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Modifica Prodotti</h2>
            <div className="grid grid-cols-1 gap-6">
              {data.products.map((product) => (
                <div key={product.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="w-32 flex-shrink-0">
                      <img src={product.image} className="w-32 h-24 object-cover rounded bg-gray-200" alt={product.name} />
                       <div className="mt-2 relative">
                         <input
                            type="file"
                            accept="image/*"
                            id={`file-${product.id}`}
                            className="hidden"
                            onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], (res) => updateProduct(product.id, 'image', res))}
                          />
                          <label htmlFor={`file-${product.id}`} className="block w-full text-center bg-white border border-gray-300 text-xs py-1 rounded cursor-pointer hover:bg-gray-100">
                            Cambia Foto
                          </label>
                       </div>
                    </div>
                    <div className="flex-1 space-y-2">
                       <input 
                          type="text" 
                          value={product.name} 
                          onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                          className="w-full font-bold border-b bg-transparent focus:bg-white focus:border-farm-green outline-none py-1"
                        />
                       <textarea 
                          value={product.description} 
                          onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                          className="w-full text-sm text-gray-600 border rounded p-1 h-20"
                        />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

           {/* Services Section */}
           <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Modifica Servizi</h2>
            <div className="grid grid-cols-1 gap-6">
              {data.services.map((service) => (
                <div key={service.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                   <input 
                      type="text" 
                      value={service.name} 
                      onChange={(e) => updateService(service.id, 'name', e.target.value)}
                      className="w-full font-bold border-b bg-transparent focus:bg-white focus:border-farm-green outline-none py-1 mb-2"
                    />
                   <textarea 
                      value={service.description} 
                      onChange={(e) => updateService(service.id, 'description', e.target.value)}
                      className="w-full text-sm text-gray-600 border rounded p-1 h-16"
                    />
                </div>
              ))}
            </div>
          </section>

          {/* About Image Position & Upload */}
          <section>
             <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Immagine "Chi Siamo"</h2>
             <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-1/3 space-y-3">
                     <img 
                        src={data.images.aboutHero} 
                        className="w-full h-40 object-cover rounded shadow-sm bg-gray-200" 
                        style={{ objectPosition: data.images.aboutHeroPosition || 'center center' }}
                      />
                     <div className="relative">
                         <input
                            type="file"
                            accept="image/*"
                            id="about-hero-upload"
                            className="hidden"
                            onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], (res) => updateData('images', { aboutHero: res }))}
                          />
                          <label htmlFor="about-hero-upload" className="block w-full text-center bg-farm-green text-white py-2 rounded text-sm font-bold cursor-pointer hover:bg-emerald-900">
                            Carica Nuova Foto
                          </label>
                       </div>
                  </div>
                  <div className="flex-1 space-y-6">
                    <div>
                      <h4 className="font-bold text-sm text-gray-700 mb-1">Posizione Orizzontale (X)</h4>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={getPositionValue('x')} 
                        onChange={(e) => handlePositionChange('x', parseInt(e.target.value))}
                        className="w-full accent-farm-green"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Sinistra</span>
                        <span>Destra</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-700 mb-1">Posizione Verticale (Y)</h4>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={getPositionValue('y')} 
                        onChange={(e) => handlePositionChange('y', parseInt(e.target.value))}
                        className="w-full accent-farm-green"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Alto</span>
                        <span>Basso</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 italic">
                      Usa gli slider per decidere quale parte della foto mostrare nel riquadro.
                    </p>
                  </div>
                </div>
              </div>
          </section>

          {/* General Images */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Altre Immagini Generali</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo Upload */}
               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-bold text-gray-700 mb-2">Logo Sito</label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-white border rounded-full overflow-hidden flex items-center justify-center">
                    {data.images.logo ? <img src={data.images.logo} className="h-full w-full object-contain"/> : <span className="text-xs text-gray-400">Default</span>}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], (res) => updateData('images', { logo: res }))}
                    className="text-xs text-gray-500 w-full"
                  />
                  {data.images.logo && (
                    <button onClick={() => updateData('images', { logo: '' })} className="text-red-500 text-xs underline">Rimuovi</button>
                  )}
                </div>
              </div>

              {/* Home Hero */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-bold text-gray-700 mb-2">Copertina Home</label>
                <div className="flex items-center gap-4">
                  <img src={data.images.homeHero} className="w-16 h-10 object-cover rounded bg-gray-200" />
                   <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], (res) => updateData('images', { homeHero: res }))}
                    className="text-xs text-gray-500 w-full"
                  />
                </div>
              </div>

              {/* Store Hero */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-bold text-gray-700 mb-2">Immagine Negozio</label>
                <div className="flex items-center gap-4">
                  <img src={data.images.storeHero} className="w-16 h-10 object-cover rounded bg-gray-200" />
                   <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], (res) => updateData('images', { storeHero: res }))}
                    className="text-xs text-gray-500 w-full"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Informazioni Base</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Indirizzo</label>
                <input
                  type="text"
                  value={data.contacts.address}
                  onChange={(e) => updateData('contacts', { address: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Città</label>
                <input
                  type="text"
                  value={data.contacts.city}
                  onChange={(e) => updateData('contacts', { city: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
                <input
                  type="text"
                  value={data.contacts.phone}
                  onChange={(e) => updateData('contacts', { phone: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={data.contacts.email}
                  onChange={(e) => updateData('contacts', { email: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </section>
          
           {/* Colors Section */}
           <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Palette Colori</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(data.colors).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">{key.replace('farm', '')}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => updateData('colors', { [key]: e.target.value })}
                      className="h-10 w-10 p-0 border-0 rounded cursor-pointer"
                    />
                    <span className="text-xs font-mono">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-end pt-6 border-t">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg cursor-default">
              <Save className="w-5 h-5" /> Modifiche Salvate
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminPage;