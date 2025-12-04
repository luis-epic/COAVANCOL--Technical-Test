// Defined based on the PDF requirements

export enum PipelineState {
  PROSPECTO = "Prospecto",
  EXPEDIENTE_CONSTRUCCION = "Expediente en Construcción",
  PENDIENTE_JURIDICO = "Pendiente Jurídico",
  PENDIENTE_CIERRE = "Pendiente Cierre de Crédito",
  PENDIENTE_FIRMA = "Pendiente Firma y Litivo",
  PENDIENTE_REVISION = "Pendiente Revisión Abogado",
  CARTERA_ACTIVA = "Cartera Activa",
  DESEMBOLSADO = "Desembolsado/Finalizado",
}

export interface Asociado {
  id: number | string; // Assuming ID can be mixed based on typical JSON responses
  nombre: string;
  identificacion: string;
  estado_pipeline: string; // Mapping to PipelineState
  aporte_49900_pagado: boolean;
  ultima_actualizacion?: string; // For the "Plus" requirement
}

export interface UpdateStateRequest {
  asociadoId: string | number;
  nuevoEstado: PipelineState;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}