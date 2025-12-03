import React, { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import { Category, Business } from '../types';
import { LOCATIONS } from '../constants';

interface AddBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (business: Business) => void;
  categories: string[];
  onAddCategory: (newCat: string) => void;
}

export const AddBusinessModal: React.FC<AddBusinessModalProps> = ({ 
  isOpen, 
  onClose, 
  onAdd, 
  categories,
  onAddCategory
}) => {
  const [formData, setFormData] = useState<Partial<Business>>({
    name: '',
    category: Category.FOOD,
    description: '',
    phone: '',
    email: '',
    address: '',
    hours: '',
    location: LOCATIONS[0],
    logo: 'https://picsum.photos/100/100?random=' + Math.random(),
    photos: ['https://picsum.photos/600/400?random=' + Math.random()]
  });
  
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) return;

    const newBusiness: Business = {
      id: Date.now().toString(),
      name: formData.name!,
      category: formData.category!,
      description: formData.description!,
      logo: formData.logo!,
      photos: formData.photos!,
      phone: formData.phone || '',
      email: formData.email || '',
      address: formData.address || '',
      hours: formData.hours || '',
      rating: 0,
      reviewCount: 0,
      reviews: [],
      location: formData.location || LOCATIONS[0]
    };

    onAdd(newBusiness);
    onClose();
  };

  const handleNewCategory = () => {
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName);
      setFormData({...formData, category: newCategoryName});
      setNewCategoryName('');
      setIsAddingCategory(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-slate-800">Registrar Nuevo Negocio</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <X size={24} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del Negocio</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Ej. Panadería del Sol"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
                <div className="flex gap-2">
                  <select 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <button 
                    type="button"
                    onClick={() => setIsAddingCategory(!isAddingCategory)}
                    className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
                    title="Agregar categoría"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                {isAddingCategory && (
                  <div className="mt-2 flex gap-2">
                    <input 
                      type="text"
                      className="flex-1 px-3 py-1 border rounded-md text-sm"
                      placeholder="Nueva categoría..."
                      value={newCategoryName}
                      onChange={e => setNewCategoryName(e.target.value)}
                    />
                    <button 
                      type="button"
                      onClick={handleNewCategory}
                      className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
                    >
                      Guardar
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Localidad</label>
                <select 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                >
                  {LOCATIONS.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-4">
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe tus productos o servicios..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Dirección Física</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Registrar Negocio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};