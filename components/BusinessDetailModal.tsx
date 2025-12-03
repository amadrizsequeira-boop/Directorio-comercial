import React from 'react';
import { X, MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { Business } from '../types';
import { StarRating } from './StarRating';

interface BusinessDetailModalProps {
  business: Business | null;
  onClose: () => void;
}

export const BusinessDetailModal: React.FC<BusinessDetailModalProps> = ({ business, onClose }) => {
  if (!business) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
        <div className="relative h-64 md:h-80 bg-slate-200">
          <img 
            src={business.photos[0]} 
            alt={business.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-8 w-full text-white flex justify-between items-end">
              <div className="flex items-end gap-4">
                <img 
                  src={business.logo} 
                  alt="Logo" 
                  className="w-24 h-24 rounded-xl border-4 border-white shadow-lg bg-white object-cover"
                />
                <div className="mb-2">
                  <h2 className="text-3xl font-bold">{business.name}</h2>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="bg-indigo-500/80 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider">
                      {business.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <MapPin size={14} /> {business.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors backdrop-blur-md"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Sobre Nosotros</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {business.description}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Galería</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {business.photos.map((photo, index) => (
                  <img 
                    key={index} 
                    src={photo} 
                    alt={`Gallery ${index + 1}`} 
                    className="w-full h-32 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer bg-slate-100"
                  />
                ))}
              </div>
            </section>

             <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800">Reseñas</h3>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-slate-900">{business.rating}</span>
                    <div className="flex flex-col">
                        <StarRating rating={business.rating} />
                        <span className="text-xs text-slate-500">{business.reviewCount} opiniones</span>
                    </div>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl text-center text-slate-500">
                <p>Las reseñas estarán disponibles próximamente.</p>
                <button className="mt-4 text-indigo-600 font-medium hover:underline">
                    Escribir una reseña
                </button>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border rounded-xl p-6 shadow-sm sticky top-4">
              <h4 className="font-bold text-slate-800 mb-4 pb-2 border-b">Información de Contacto</h4>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-slate-600">
                    <MapPin className="text-indigo-500 mt-1 shrink-0" size={20} />
                    <span>{business.address}</span>
                </div>
                
                <div className="flex items-center gap-3 text-slate-600">
                    <Phone className="text-indigo-500 shrink-0" size={20} />
                    <a href={`tel:${business.phone}`} className="hover:text-indigo-600 transition-colors">{business.phone}</a>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                    <Mail className="text-indigo-500 shrink-0" size={20} />
                    <a href={`mailto:${business.email}`} className="hover:text-indigo-600 transition-colors break-all">{business.email}</a>
                </div>

                <div className="flex items-start gap-3 text-slate-600">
                    <Clock className="text-indigo-500 mt-1 shrink-0" size={20} />
                    <span className="whitespace-pre-line">{business.hours}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                 <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg">
                    <ShieldCheck size={20} />
                    <span className="text-sm font-medium">Negocio Verificado</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};