import { Asociado, PipelineState, UpdateStateRequest, ApiResponse } from '../types';
import { STATE_ORDER } from '../constants';

/**
 * TAREA 2 & TAREA 5: Backend Logic Simulation
 * 
 * This function simulates the HTTP POST endpoint `updateEstadoPipeline`.
 * Since we don't have a real server, this function acts as the controller + service layer.
 */
export const updateEstadoPipeline = async (
  currentAsociado: Asociado, 
  request: UpdateStateRequest
): Promise<ApiResponse<Asociado>> => {
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  const { nuevoEstado } = request;

  // 1. Validate that the new state is a valid enum value (Task 2.2)
  const isValidState = Object.values(PipelineState).includes(nuevoEstado);
  if (!isValidState) {
    return {
      success: false,
      message: `Error: El estado '${nuevoEstado}' no es válido.`
    };
  }

  // 2. Validate "Plus" Requirement: Logical Transitions
  // We can't jump from Prospecto to Finalizado arbitrarily.
  const currentIndex = STATE_ORDER.indexOf(currentAsociado.estado_pipeline as PipelineState);
  const newIndex = STATE_ORDER.indexOf(nuevoEstado);

  // If the current state is not in our known list (maybe raw data has typos), we might allow reset to Prospecto
  if (currentIndex !== -1 && newIndex !== -1) {
    // Only allow moving forward 1 step, or moving back (correction)
    // NOTE: The requirements didn't specify strict forward-only, but "Lógica básica" suggests
    // one shouldn't skip steps. For flexibility in this demo, I'll block skipping forward > 1 step.
    if (newIndex > currentIndex + 1) {
       return {
        success: false,
        message: `Error de Lógica: No se puede saltar etapas de ${currentAsociado.estado_pipeline} a ${nuevoEstado}.`
      };
    }
  }

  // 3. TAREA 5: Validation specific to "Pendiente Jurídico"
  if (nuevoEstado === PipelineState.PENDIENTE_JURIDICO) {
    if (currentAsociado.aporte_49900_pagado === false) {
      return {
        success: false,
        message: "Bloqueo de Negocio: No se puede avanzar a 'Pendiente Jurídico' porque el aporte 49900 no ha sido pagado."
      };
    }
  }

  // 4. Update the document (Task 2.3)
  const updatedAsociado: Asociado = {
    ...currentAsociado,
    estado_pipeline: nuevoEstado,
    ultima_actualizacion: new Date().toISOString() // "Plus" Requirement
  };

  return {
    success: true,
    data: updatedAsociado,
    message: "Estado actualizado exitosamente."
  };
};