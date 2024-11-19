import { Embarcacion } from '../types';
import React from 'react';

export interface EmbarcacionTableProps {
    embarcaciones: Embarcacion[];
    onEdit: (embarcacion: Embarcacion) => void;
    onDelete: (id: number) => void;
}

export const EmbarcacionTable: React.FC<EmbarcacionTableProps> = ({ embarcaciones, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacidad</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Programada</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {embarcaciones.map((embarcacion) => (
                        <tr key={embarcacion.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{embarcacion.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{embarcacion.nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{embarcacion.capacidad}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{embarcacion.descripcion}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{embarcacion.fechaProgramada}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="table-actions">
                                    <button onClick={() => onEdit(embarcacion)} className="btn-edit">
                                        Editar
                                    </button>
                                    <button onClick={() => onDelete(embarcacion.id)} className="btn-delete">
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmbarcacionTable;