import React, { useState } from 'react';
import { Loader2, ChefHat, Sparkles } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';

const RecipeGenerator: React.FC = () => {
  const { data } = useSiteContext();
  const [recipe, setRecipe] = useState<{title: string, content: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setRecipe(null);

    // Simulate "Thinking" time
    setTimeout(() => {
      const recipes = data.recipes;
      if (recipes.length > 0) {
        const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
        setRecipe(randomRecipe);
      } else {
        setRecipe({
          title: "Nessuna ricetta disponibile",
          content: "L'amministratore non ha ancora caricato ricette. Torna a trovarci presto!"
        });
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-farm-beige max-w-2xl mx-auto my-12">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-serif text-farm-green font-bold flex items-center justify-center gap-2">
          <ChefHat className="w-8 h-8" />
          L'Angolo dello Chef
        </h3>
        <p className="text-gray-600 mt-2">
          Non sai cosa cucinare oggi? Clicca qui sotto per ricevere un consiglio culinario con i nostri prodotti!
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="bg-farm-green hover:bg-emerald-900 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-md flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          {loading ? "Il nostro chef sta pensando..." : "Dammi una Ricetta a Caso"}
        </button>
      </div>

      {recipe && (
        <div className="bg-farm-beige/30 p-6 rounded-lg border border-farm-beige animate-fadeIn text-left">
          <h4 className="text-xl font-bold text-farm-brown mb-3 border-b border-farm-brown/20 pb-2">
            {recipe.title}
          </h4>
          <div className="prose prose-stone max-w-none whitespace-pre-line text-gray-700">
            {recipe.content}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;