import React, { useState, useMemo } from 'react';
import { useAsociados } from '../hooks/useAsociados';
import { FILTER_OPTIONS, STATE_ORDER } from '../constants';
import { PipelineState } from '../types';

export const AsociadosList: React.FC = () => {
  const { asociados, loading, error, updateAsociadoState } = useAsociados();
  const [filter, setFilter] = useState<string>("ALL");
  const [updatingId, setUpdatingId] = useState<string | number | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // Requirement 4 & 5: Filter and Sort
  const filteredAsociados = useMemo(() => {
    let result = [...asociados];

    if (filter !== "ALL") {
      result = result.filter(a => a.estado_pipeline === filter);
    }

    result.sort((a, b) => a.nombre.localeCompare(b.nombre));

    return result;
  }, [asociados, filter]);

  const handleStateChange = async (id: string | number, newState: PipelineState) => {
    setUpdatingId(id);
    setFeedbackMsg(null);
    
    const result = await updateAsociadoState(id, newState);
    
    setFeedbackMsg({
      type: result.success ? 'success' : 'error',
      text: result.message
    });

    setTimeout(() => setFeedbackMsg(null), 5000);
    setUpdatingId(null);
  };

  const getNextState = (currentState: string): PipelineState | null => {
    const currentIndex = STATE_ORDER.indexOf(currentState as PipelineState);
    if (currentIndex !== -1 && currentIndex < STATE_ORDER.length - 1) {
      return STATE_ORDER[currentIndex + 1];
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-brand-600"></div>
        <p className="mt-4 text-sm text-gray-400 font-medium animate-pulse">Cargando asociados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-12 p-6 bg-white border border-red-100 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 text-red-600">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="font-semibold">Error de Carga</h3>
        </div>
        <p className="mt-2 text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Asociados</h1>
          <p className="mt-1 text-sm text-gray-500">Gestión y seguimiento del pipeline comercial.</p>
        </div>

        {/* Minimalist Filter */}
        <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Filtrar por</span>
            <div className="relative">
              <select
                id="pipeline-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 block w-64 p-2.5 pr-8 hover:border-gray-300 transition-colors cursor-pointer outline-none"
              >
                {FILTER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
        </div>
      </div>

      {/* Alert / Feedback */}
      {feedbackMsg && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg border flex items-center gap-3 animate-fade-in-up transform transition-all duration-300
          ${feedbackMsg.type === 'success' ? 'bg-white border-green-100 text-green-700' : 'bg-white border-red-100 text-red-700'}`}>
          <div className={`w-2 h-2 rounded-full ${feedbackMsg.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm font-medium">{feedbackMsg.text}</span>
        </div>
      )}

      {/* Minimalist Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th scope="col" className="px-6 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Asociado
                </th>
                <th scope="col" className="px-6 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Estado Actual
                </th>
                <th scope="col" className="px-6 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Pago Aporte
                </th>
                <th scope="col" className="px-6 py-5 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredAsociados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                       <svg className="w-12 h-12 text-gray-200 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                       <span className="text-gray-500 text-sm">No se encontraron resultados</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAsociados.map((asociado) => {
                  const nextState = getNextState(asociado.estado_pipeline);
                  const isProcessing = updatingId === asociado.id;

                  // Status Badge Logic
                  let badgeClass = "bg-gray-100 text-gray-600";
                  if (asociado.estado_pipeline === PipelineState.PENDIENTE_JURIDICO) badgeClass = "bg-orange-50 text-orange-600 border border-orange-100";
                  else if (asociado.estado_pipeline === PipelineState.DESEMBOLSADO) badgeClass = "bg-emerald-50 text-emerald-600 border border-emerald-100";
                  else if (asociado.estado_pipeline === PipelineState.PROSPECTO) badgeClass = "bg-blue-50 text-blue-600 border border-blue-100";
                  else badgeClass = "bg-indigo-50 text-indigo-600 border border-indigo-100";

                  return (
                    <tr key={asociado.id} className="group hover:bg-gray-50/50 transition-colors duration-150">
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs mr-3">
                            {asociado.nombre.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 group-hover:text-brand-600 transition-colors">
                              {asociado.nombre}
                            </div>
                            {asociado.ultima_actualizacion && (
                              <div className="text-[10px] text-gray-400 mt-0.5">
                                {new Date(asociado.ultima_actualizacion).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-gray-500 font-mono tracking-tight">{asociado.identificacion}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-2.5 py-1 inline-flex text-xs font-medium rounded-full ${badgeClass}`}>
                          {asociado.estado_pipeline}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                         {asociado.aporte_49900_pagado ? (
                             <div className="flex items-center text-emerald-600 text-xs font-medium">
                               <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                               </svg>
                               Pagado
                             </div>
                         ) : (
                             <div className="flex items-center text-gray-400 text-xs">
                               <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></div>
                               Pendiente
                             </div>
                         )}
                      </td>
                      <td className="px-6 py-5 text-right">
                        {nextState && (
                          <button
                            onClick={() => handleStateChange(asociado.id, nextState)}
                            disabled={isProcessing}
                            className={`
                              text-xs font-medium px-4 py-2 rounded-lg transition-all
                              ${isProcessing 
                                ? 'bg-gray-50 text-gray-400 cursor-not-allowed' 
                                : 'bg-white text-gray-700 hover:text-brand-600 hover:bg-brand-50 border border-gray-200 hover:border-brand-200 shadow-sm hover:shadow-md'}
                            `}
                          >
                            {isProcessing ? 'Procesando...' : `Avanzar Etapa`}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between">
           <span className="text-xs text-gray-400">Mostrando {filteredAsociados.length} registros</span>
        </div>
      </div>
    </div>
  );
};