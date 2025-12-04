import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Service } from '../types';

interface Recipe {
  id: string;
  title: string;
  content: string;
}

// Default Data
const defaultSiteData = {
  contacts: {
    address: 'Viale XXV Aprile snc',
    city: 'Marinella di Sarzana (SP)',
    phone: '',
    email: 'agricolamatteocorona@gmail.com',
    facebook: '#',
    instagram: '#',
  },
  images: {
    homeHero: 'https://i.ibb.co/0yBZGSD0/Immagine-Whats-App-2025-12-02-ore-20-52-50-74426538.jpg',
    aboutHero: 'https://i.ibb.co/1frYkRpP/Screenshot-2025-12-04-130519.png',
    aboutHeroPosition: '50% 50%', // center center
    storeHero: 'https://i.ibb.co/FbP27q0J/Immagine-Whats-App-2025-12-02-ore-20-52-50-195b65bd.jpg',
    logo: 'https://i.ibb.co/1f3Y2p05/Immagine-Whats-App-2025-12-04-ore-12-46-22-8ef191e0.jpg' // empty string means use default SVG component
  },
  colors: {
    farmGreen: '#2F5233',
    farmLightGreen: '#76B947',
    farmBrown: '#5D4037',
    farmBeige: '#F5F5DC',
    farmCream: '#FAF9F6',
  },
  products: [
    {
      id: '1',
      name: 'Ortaggi di Stagione',
      description: 'Verdure fresche coltivate in pieno campo, seguendo i ritmi naturali delle stagioni.',
      image: 'https://i.ibb.co/pjxBmR0J/Screenshot-2025-12-04-185410.png',
      category: 'Ortaggi'
    },
    {
      id: '2',
      name: 'Mais Zootecnico',
      description: 'Mais di alta qualità per alimentazione animale, prodotto nei nostri terreni.',
      image: 'https://www.mangimiealimenti.it/wp-content/uploads/2021/03/mais_coltura_pixabay.png',
      category: 'Cereali'
    },
    {
      id: '3',
      name: 'Farine Macinate a Pietra',
      description: 'Farine integrali e semi-integrali ottenute dai nostri cereali locali.',
      image: 'https://i.ibb.co/YBpyRkcm/image.png',
      category: 'Farine'
    },
    {
      id: '4',
      name: 'Fieno',
      description: 'Produzione di foraggio di prima scelta per allevamenti.',
      image: 'https://i.ibb.co/KZN6McF/Screenshot-2025-12-04-185308.png',
      category: 'Altro'
    }
  ] as Product[],
  services: [
    {
      id: 's1',
      name: 'Sgombero Neve',
      description: 'Servizio attivo nei mesi invernali per strade pubbliche e private.',
      iconName: 'Snowflake'
    },
    {
      id: 's2',
      name: 'Lavorazioni Conto Terzi',
      description: 'Supporto per attività agricole con macchinari specializzati.',
      iconName: 'Tractor'
    }
  ] as Service[],
  recipes: [
    {
      id: 'r1',
      title: 'Polenta alla Sarzanese',
      content: "Ingredienti:\n- 500g Farina di Mais\n- 2L Acqua\n- Sale q.b.\n- Sugo di funghi o salsiccia\n\nProcedimento:\nPortare a bollore l'acqua salata. Versare a pioggia la farina mescolando energicamente per evitare grumi. Cuocere per circa 40-50 minuti mescolando spesso. Servire calda con il condimento scelto."
    },
    {
      id: 'r2',
      title: 'Pasta fresca con verdure dell\'orto',
      content: "Ingredienti:\n- 300g Pasta Artigianale\n- 2 Zucchine\n- 10 Pomodorini\n- Olio EVO, Basilico\n\nProcedimento:\nTagliare le zucchine a rondelle e saltarle in padella con olio e aglio. Aggiungere i pomodorini a fine cottura. Cuocere la pasta al dente, scolarla e saltarla nel condimento con abbondante basilico fresco."
    }
  ] as Recipe[]
};

export type SiteData = typeof defaultSiteData;

interface SiteContextType {
  data: SiteData;
  updateData: (section: keyof SiteData, newData: any) => void;
  resetToDefaults: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(() => {
    const saved = localStorage.getItem('site_data_v2');
    return saved ? JSON.parse(saved) : defaultSiteData;
  });

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem('site_data_v2', JSON.stringify(data));
  }, [data]);

  // Update CSS Variables for Colors
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--farm-green', data.colors.farmGreen);
    root.style.setProperty('--farm-light-green', data.colors.farmLightGreen);
    root.style.setProperty('--farm-brown', data.colors.farmBrown);
    root.style.setProperty('--farm-beige', data.colors.farmBeige);
    root.style.setProperty('--farm-cream', data.colors.farmCream);
  }, [data.colors]);

  const updateData = (section: keyof SiteData, newData: any) => {
    setData(prev => {
      // Handle arrays specifically to replace them fully if passed as array, 
      // or merge objects if passed as object
      if (Array.isArray(newData)) {
         return { ...prev, [section]: newData };
      }
      return {
        ...prev,
        [section]: { ...prev[section], ...newData }
      };
    });
  };

  const resetToDefaults = () => {
    if(window.confirm("Sei sicuro di voler ripristinare le impostazioni originali?")) {
      setData(defaultSiteData);
    }
  };

  return (
    <SiteContext.Provider value={{ data, updateData, resetToDefaults }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteContext must be used within a SiteProvider');
  }
  return context;
};
