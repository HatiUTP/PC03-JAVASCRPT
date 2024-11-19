import { Embarcacion } from '../types';
import React, { useEffect, useState } from 'react';

export interface EmbarcacionFormProps {
    onSubmit: (embarcacion: Omit<Embarcacion, 'id'>) => void;
    onCancel?: () => void;
    initialData?: Embarcacion;
}

export const EmbarcacionForm: React.FC<EmbarcacionFormProps> = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        capacidad: 0,
        descripcion: '',
        fechaProgramada: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre,
                capacidad: initialData.capacidad,
                descripcion: initialData.descripcion,
                fechaProgramada: initialData.fechaProgramada
            });
        } else {
            setFormData({
                nombre: '',
                capacidad: 0,
                descripcion: '',
                fechaProgramada: ''
            });
        }

        return () => {
            setFormData({
                nombre: '',
                capacidad: 0,
                descripcion: '',
                fechaProgramada: ''
            });
        };
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'capacidad' ? parseInt(value) : value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Nombre:
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Capacidad:
                    <input
                        type="number"
                        name="capacidad"
                        value={formData.capacidad}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                        min="0"
                    />
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Descripción:
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Fecha Programada:
                    <input
                        type="date"
                        name="fechaProgramada"
                        value={formData.fechaProgramada}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </label>
            </div>
            <div className="flex justify-end space-x-2">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Guardar
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default EmbarcacionForm;