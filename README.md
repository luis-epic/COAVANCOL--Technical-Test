# COAVANCOL — Prueba Técnica Fullstack

> Solución desarrollada para la evaluación técnica de Desarrollador Fullstack Junior (React).

Este repositorio contiene una aplicación web construida con **React**, **TypeScript** y **Tailwind CSS** que gestiona el pipeline de asociados de COAVANCOL. La solución simula una arquitectura Fullstack integrando lógica de negocio y validaciones de backend directamente en el cliente.

## 🚀 Funcionalidades Implementadas

### 1. Frontend (UI/UX)
*   **Visualización de Datos:** Tabla minimalista con renderizado de listas de asociados.
*   **Filtrado Avanzado:** Filtro por estado del pipeline (`select`) como se solicitó.
*   **Ordenamiento:** Orden alfabético automático por nombre.
*   **Feedback Visual:** Indicadores de carga (Spinners), manejo de errores y notificaciones "Toast" tras acciones.
*   **Diseño:** Interfaz moderna y limpia utilizando la fuente **Inter** y una paleta de colores profesional.

### 2. Lógica de Negocio (Simulación Backend)
Para cumplir con la **Tarea 2** y **Tarea 5** en un entorno frontend, se implementó un servicio simulado (`backendService.ts`) que actúa como API:

*   **Validación de Transiciones:** Control lógico para evitar saltos de estado inválidos (Plus).
*   **Regla de Negocio Crítica (Tarea 5):** Bloqueo del paso al estado **"Pendiente Jurídico"** si el campo `aporte_49900_pagado` es `false`.
*   **Persistencia Simulada:** Actualización optimista de la UI con delay artificial para simular latencia de red.

## 🛠 Stack Tecnológico

*   **Core:** React 18, TypeScript.
*   **Estilos:** Tailwind CSS (CDN para portabilidad).
*   **Gestión de Estado:** React Hooks (`useState`, `useEffect`, `useCallback`, Custom Hook `useAsociados`).
*   **Tipado:** Interfaces estrictas y Enums para los estados del pipeline.

## 📂 Estructura del Proyecto

```bash
/
├── components/
│   └── AsociadosList.tsx  # Componente principal de la vista
├── hooks/
│   └── useAsociados.ts    # Lógica de fetching y manejo de estado
├── services/
│   └── backendService.ts  # Simulación de API y validaciones de negocio
├── types.ts               # Definiciones de Tipos y Enums
├── constants.ts           # Configuración y constantes globales
├── App.tsx                # Layout principal
└── index.tsx              # Punto de entrada
```

## 🧪 Cómo Probar la Solución

1. **Visualizar la Lista:** Al cargar, la aplicación intentará consumir el JSON provisto. Si falla (por disponibilidad del enlace), cargará datos "Mock" automáticamente para demostración.
2. **Filtrar:** Use el desplegable superior derecho para filtrar por estado (ej. "Expediente en Construcción").
3. **Probar Validaciones (Backend):**
    *   Busque un asociado con estado **"Expediente en Construcción"** y cuyo pago esté marcado como **Pendiente** (punto gris).
    *   Haga clic en el botón **"Avanzar Etapa"**.
    *   **Resultado:** Verá una alerta roja indicando que no se puede avanzar a "Pendiente Jurídico" debido a la falta de pago (Cumplimiento Tarea 5).

## 📝 Notas Adicionales

Se incluye un archivo detallado `notas-proceso.md` explicando las decisiones técnicas y las dificultades encontradas durante el desarrollo.

---
**Author:** Candidato Fullstack
**Commit Reference:** `0001 Completed fullstack react technical test`
