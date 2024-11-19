import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Embarcacion } from './types';
import { EmbarcacionForm } from './components/EmbarcacionForm';
import { EmbarcacionTable } from './components/EmbarcacionTable';

const App: React.FC = () => {
  const [embarcaciones, setEmbarcaciones] = useState<Embarcacion[]>([]);
  const [selectedEmbarcacion, setSelectedEmbarcacion] = useState<Embarcacion | undefined>();

  const fetchEmbarcaciones = async () => {
    try {
      const response = await axios.get('/api/embarcaciones');
      setEmbarcaciones(response.data);
    } catch (error) {
      console.error('Error fetching embarcaciones:', error);
    }
  };

  useEffect(() => {
    fetchEmbarcaciones();
  }, []);

  const handleCreateEmbarcacion = async (embarcacion: Omit<Embarcacion, 'id'>) => {
    try {
      await axios.post('/api/embarcaciones', embarcacion);
      await fetchEmbarcaciones();
      setSelectedEmbarcacion(undefined);
    } catch (error) {
      console.error('Error creating embarcacion:', error);
    }
  };

  const handleUpdateEmbarcacion = async (embarcacion: Omit<Embarcacion, 'id'>) => {
    if (selectedEmbarcacion) {
      try {
        await axios.put(`/api/embarcaciones/${selectedEmbarcacion.id}`, embarcacion);
        await fetchEmbarcaciones();
        setSelectedEmbarcacion(undefined);
      } catch (error) {
        console.error('Error updating embarcacion:', error);
      }
    }
  };

  const handleDeleteEmbarcacion = async (id: number) => {
    try {
      await axios.delete(`/api/embarcaciones/${id}`);
      await fetchEmbarcaciones();
    } catch (error) {
      console.error('Error deleting embarcacion:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestión de Embarcaciones</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {selectedEmbarcacion ? 'Editar Embarcación' : 'Nueva Embarcación'}
          </h2>
          <EmbarcacionForm
            onSubmit={selectedEmbarcacion ? handleUpdateEmbarcacion : handleCreateEmbarcacion}
            onCancel={() => setSelectedEmbarcacion(undefined)}
            initialData={selectedEmbarcacion}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Lista de Embarcaciones</h2>
          <EmbarcacionTable
            embarcaciones={embarcaciones}
            onEdit={setSelectedEmbarcacion}
            onDelete={handleDeleteEmbarcacion}
          />
        </div>
      </div>
    </div>
  );
};

export default App;