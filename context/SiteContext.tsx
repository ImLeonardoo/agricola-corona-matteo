import React, { createContext, useContext, ReactNode } from 'react';
import { Product, Service } from '../types';

export interface Recipe {
  id: string;
  title: string;
  content: string;
}

export interface StoreGalleries {
  fruitVeg: string[];
  preserves: string[];
  flour: string[];
  meat: string[];
  cheese: string[];
}

// --- STATIC DATA CONFIGURATION ---
// Modify this object to change the website content permanently.
const staticSiteData = {
  contacts: {
    address: 'Viale XXV Aprile snc',
    city: 'Marinella di Sarzana (SP)',
    phone: '+39 352 087 4506',
    email: 'agricolamatteocorona@gmail.com',
    facebook: 'https://www.facebook.com/aziendaagricolamatteocorona/',
    instagram: 'https://www.instagram.com/p/DQRbYpaAtwe/',
  },
  images: {
    homeHero: 'https://i.ibb.co/0yBZGSD0/Immagine-Whats-App-2025-12-02-ore-20-52-50-74426538.jpg',
    aboutHero: 'https://i.ibb.co/1frYkRpP/Screenshot-2025-12-04-130519.png',
    aboutHeroPosition: '50% 0%', // Minimum Y (Top)
    storeHero: 'https://i.ibb.co/FbP27q0J/Immagine-Whats-App-2025-12-02-ore-20-52-50-195b65bd.jpg',
    storeHeroPosition: '50% 25%', // Raised Y (Upper Center)
    logo: 'https://i.ibb.co/C3tFMwN4/Immagine-Whats-App-2025-12-04-ore-12-46-22-8ef191e0.jpg' 
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
      description: 'Verdure fresche coltivate in pieno campo, seguendo i ritmi naturali delle stagioni. Raccogliamo ogni mattina per garantire il massimo sapore.',
      image: 'https://i.ibb.co/pjxBmR0J/Screenshot-2025-12-04-185410.png',
      category: 'Ortaggi'
    },
    {
      id: '2',
      name: 'Mais Zootecnico',
      description: 'Mais di alta qualità per alimentazione animale, prodotto nei nostri terreni con metodi che rispettano la fertilità del suolo.',
      image: 'https://www.mangimiealimenti.it/wp-content/uploads/2021/03/mais_coltura_pixabay.png',
      category: 'Cereali'
    },
    {
      id: '3',
      name: 'Farine Macinate a Pietra',
      description: 'Farine integrali e semi-integrali ottenute dai nostri cereali locali. Ideali per pane, pasta e dolci fatti in casa.',
      image: 'https://i.ibb.co/8LzK41QY/white-flour.webp',
      category: 'Farine'
    },
    {
      id: '4',
      name: 'Fieno',
      description: 'Produzione di foraggio di prima scelta per allevamenti. Essiccato naturalmente per preservare i valori nutrizionali.',
      image: 'https://i.ibb.co/KZN6McF/Screenshot-2025-12-04-184918.png',
      category: 'Altro'
    }
  ] as Product[],
  services: [
    {
      id: '1',
      name: 'Sgombero Neve',
      description: 'Servizio attivo nei mesi invernali con mezzi appositi per garantire strade pulite e sicure.',
      iconName: 'Snowflake'
    },
    {
      id: '2',
      name: 'Lavorazioni Agricole Conto Terzi',
      description: 'Mettiamo a disposizione i nostri mezzi e la nostra esperienza per lavorazioni su altri terreni.',
      iconName: 'Tractor'
    }
  ] as Service[],
  recipes: [
    {
      id: 'r1',
      title: 'Vellutata di Zucca e Rosmarino',
      content: 'Ingredienti:\n- 500g Zucca\n- 2 Patate\n- Rosmarino fresco\n- Olio EVO\n\nPreparazione:\nTagliare la zucca e le patate a cubetti. Rosolare con cipolla e olio. Coprire con acqua e cuocere per 30 min. Frullare tutto e servire con rosmarino e crostini.'
    },
    {
      id: 'r2',
      title: 'Pasta al Pesto di Zucchine',
      content: 'Ingredienti:\n- 3 Zucchine\n- 50g Mandorle\n- Basilico\n- Parmigiano\n\nPreparazione:\nGrattugiare le zucchine e saltarle in padella. Frullarle con mandorle, basilico e parmigiano. Condire la pasta aggiungendo un po\' di acqua di cottura.'
    },
    {
      id: 'r3',
      title: 'Minestrone alla Ligure',
      content: 'Ingredienti:\n- Verdure di stagione (fagioli, patate, zucchine, bietole)\n- Pesto genovese\n- Olio EVO\n\nPreparazione:\nTagliare tutte le verdure a pezzetti. Bollire in acqua salata per 1 ora. A fine cottura, a fuoco spento, aggiungere due cucchiai generosi di pesto.'
    },
    {
      id: 'r4',
      title: 'Biscotti di Meliga',
      content: 'Ingredienti:\n- 200g Farina di Mais\n- 200g Farina 00\n- 150g Zucchero\n- 150g Burro\n\nPreparazione:\nImpastare le due farine con burro, zucchero e uova. Formare delle ciambelline e cuocere in forno a 180°C per 15-20 minuti finché dorati.'
    }
  ] as Recipe[],
  storeGalleries: {
    fruitVeg: [
      'https://i.ibb.co/B5fj0VKB/Immagine-Whats-App-2025-12-04-ore-20-48-22-ae096fe9.jpg',
      'https://i.ibb.co/FLXzyY66/Immagine-Whats-App-2025-12-04-ore-20-48-23-872f4aed.jpg',
      'https://i.ibb.co/HftqXBbh/Immagine-Whats-App-2025-12-04-ore-20-48-24-bd71fb56.jpg',
      'https://i.ibb.co/N2TN68dz/Screenshot-2025-12-05-100829.png',
      'https://i.ibb.co/tpmRPX9F/Screenshot-2025-12-05-100809.png',
      'https://i.ibb.co/VWD0bvqp/Screenshot-2025-12-05-100800.png',
      'https://i.ibb.co/JR2SBChf/Screenshot-2025-12-05-100754.png',
      'https://i.ibb.co/39hw4jnn/Screenshot-2025-12-05-100739.png',
      'https://i.ibb.co/F43rCwHK/Screenshot-2025-12-05-100735.png',
      'https://i.ibb.co/LzjFLPT5/Screenshot-2025-12-05-100719.png',
      'https://i.ibb.co/Mk4JY5rD/Screenshot-2025-12-05-100653.png'
    ],
    preserves: [],
    flour: [],
    meat: [],
    cheese: []
  } as StoreGalleries
};

// --- Context Setup ---

interface SiteContextType {
  data: typeof staticSiteData;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // In the static version, we simply provide the constant data.
  // No localStorage, no updates.
  return (
    <SiteContext.Provider value={{ data: staticSiteData }}>
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