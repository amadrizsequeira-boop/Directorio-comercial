import React, { useState, useMemo } from 'react';
import { HashRouter } from 'react-router-dom';
import { Search, MapPin, PlusCircle, Filter, Store } from 'lucide-react';
import { CATEGORY_ICONS, INITIAL_BUSINESSES, LOCATIONS } from './constants';
import { Business, Category } from './types';
import { StarRating } from './components/StarRating';
import { AddBusinessModal } from './components/AddBusinessModal';
import { BusinessDetailModal } from './components/BusinessDetailModal';
import { AIAssistant } from './components/AIAssistant';

function App() {
  const [businesses, setBusinesses] = useState<Business[]>(INITIAL_BUSINESSES);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedLocation, setSelectedLocation] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [categories, setCategories] = useState<string[]>(Object.values(Category));

  const filteredBusinesses = useMemo(() => {
    return businesses.filter(b => {
      const matchesCategory = selectedCategory === 'Todos' || b.category === selectedCategory;
      const matchesLocation = selectedLocation === 'Todos' || b.location === selectedLocation;
      const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            b.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesLocation && matchesSearch;
    });
  }, [businesses, selectedCategory, selectedLocation, searchTerm]);

  const handleAddBusiness = (newBusiness: Business) => {
    setBusinesses([newBusiness, ...businesses]);
  };

  const handleAddCategory = (newCat: string) => {
    if (!categories.includes(newCat)) {
      setCategories([...categories, newCat]);
    }
  };

  return (
    <HashRouter>
      <div className="min-h-screen pb-20">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
                setSelectedCategory('Todos');
                setSearchTerm('');
              }}>
                <div className="bg-indigo-600 p-2 rounded-lg">
                    <Store className="text-white" size={24} />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Comunidad Connect
                </h1>
              </div>
              
              <div className="hidden md:flex items-center gap-4">
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-md hover:shadow-lg"
                >
                  <PlusCircle size={18} />
                  <span>Publicar Negocio</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero / Search Section */}
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white py-12 px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                    Encuentra lo mejor de tu comunidad
                </h2>
                <p className="text-indigo-100 text-lg md:text-xl">
                    Apoya el comercio local. Descubre servicios, alimentos y productos cerca de ti.
                </p>
                
                <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
                    <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-xl border border-transparent focus-within:border-indigo-500 focus-within:bg-white transition-all">
                        <Search className="text-slate-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="¿Qué estás buscando?" 
                            className="w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 py-3 px-2 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="md:w-48 flex items-center px-4 bg-slate-50 rounded-xl border border-transparent focus-within:border-indigo-500 focus-within:bg-white transition-all">
                        <MapPin className="text-slate-400" size={20} />
                        <select 
                            className="w-full bg-transparent border-none focus:ring-0 text-slate-800 py-3 px-2 outline-none cursor-pointer"
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                        >
                            <option value="Todos">Ubicación</option>
                            {LOCATIONS.map(loc => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Category Filter */}
            <div className="mb-10 overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-4 min-w-max">
                    <button
                        onClick={() => setSelectedCategory('Todos')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all w-24 ${
                            selectedCategory === 'Todos' 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' 
                            : 'bg-white text-slate-600 hover:bg-slate-50 border hover:border-indigo-200'
                        }`}
                    >
                        <Filter size={24} />
                        <span className="text-sm font-medium">Todos</span>
                    </button>
                    {categories.map((cat) => {
                        // Dynamically find icon or fallback
                        const IconComponent = CATEGORY_ICONS[cat] || CATEGORY_ICONS[Category.OTHER];
                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all w-24 ${
                                    selectedCategory === cat 
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' 
                                    : 'bg-white text-slate-600 hover:bg-slate-50 border hover:border-indigo-200'
                                }`}
                            >
                                <IconComponent size={24} />
                                <span className="text-xs font-medium text-center truncate w-full">{cat}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Business Grid */}
            <div className="mb-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-slate-800">
                    {selectedCategory === 'Todos' ? 'Negocios Destacados' : selectedCategory}
                </h3>
                <span className="text-slate-500 text-sm">{filteredBusinesses.length} resultados</span>
            </div>

            {filteredBusinesses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBusinesses.map((business) => (
                        <div 
                            key={business.id}
                            onClick={() => setSelectedBusiness(business)}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 cursor-pointer group flex flex-col h-full"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={business.photos[0]} 
                                    alt={business.name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-indigo-700 shadow-sm uppercase tracking-wide">
                                    {business.category}
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <img 
                                        src={business.logo} 
                                        alt="Logo" 
                                        className="w-12 h-12 rounded-full border-2 border-white shadow-md bg-white object-cover"
                                    />
                                </div>
                            </div>
                            
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                        {business.name}
                                    </h4>
                                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-yellow-700 text-xs font-bold">
                                        <span>{business.rating}</span>
                                        <StarRating rating={1} size={12} />
                                    </div>
                                </div>
                                
                                <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">
                                    {business.description}
                                </p>
                                
                                <div className="space-y-2 mt-auto border-t pt-4">
                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                        <MapPin size={16} className="text-indigo-400" />
                                        <span className="truncate">{business.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                        <Store size={16} className="text-indigo-400" />
                                        <span className="truncate">{business.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                    <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Search className="text-slate-300" size={32} />
                    </div>
                    <h3 className="text-xl font-medium text-slate-800 mb-2">No se encontraron negocios</h3>
                    <p className="text-slate-500">Intenta con otra categoría o ubicación.</p>
                </div>
            )}
        </main>

        {/* Mobile FAB for adding business */}
        <div className="fixed bottom-6 left-6 md:hidden z-20">
             <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-slate-900 text-white p-4 rounded-full shadow-lg hover:bg-slate-800 transition-all active:scale-95"
            >
                <PlusCircle size={24} />
            </button>
        </div>

        {/* AI Assistant FAB */}
        <AIAssistant />

        {/* Modals */}
        <AddBusinessModal 
            isOpen={isAddModalOpen} 
            onClose={() => setIsAddModalOpen(false)} 
            onAdd={handleAddBusiness}
            categories={categories}
            onAddCategory={handleAddCategory}
        />

        <BusinessDetailModal 
            business={selectedBusiness} 
            onClose={() => setSelectedBusiness(null)} 
        />
      </div>
    </HashRouter>
  );
}

export default App;