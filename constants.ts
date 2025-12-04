import { PipelineState } from './types';

export const API_URL = 'https://raw.githubusercontent.com/managerrojo/COAVANCOL-Prueba-T-cnica-/refs/heads/main/IndexAsociados';

// List for the select filter
export const FILTER_OPTIONS = [
  { label: "Todos", value: "ALL" },
  { label: "Prospecto", value: PipelineState.PROSPECTO },
  { label: "Expediente en Construcción", value: PipelineState.EXPEDIENTE_CONSTRUCCION },
  { label: "Pendiente Jurídico", value: PipelineState.PENDIENTE_JURIDICO },
  { label: "Pendiente Cierre de Crédito", value: PipelineState.PENDIENTE_CIERRE },
];

// Logical order for validation "Plus" requirement
export const STATE_ORDER = [
  PipelineState.PROSPECTO,
  PipelineState.EXPEDIENTE_CONSTRUCCION,
  PipelineState.PENDIENTE_JURIDICO,
  PipelineState.PENDIENTE_CIERRE,
  PipelineState.PENDIENTE_FIRMA,
  PipelineState.PENDIENTE_REVISION,
  PipelineState.CARTERA_ACTIVA,
  PipelineState.DESEMBOLSADO
];