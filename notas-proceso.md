# Notas del Proceso - Prueba Técnica Coavancol

## Enfoque General
Para resolver esta prueba, adopté un enfoque basado en componentes modulares y principios SOLID, utilizando React con TypeScript para garantizar la seguridad de tipos y la mantenibilidad.

### Frontend (Tarea 1)
- **Estructura**: Se separó la lógica de UI mediante un custom hook `useAsociados`. Esto facilita las pruebas y la reutilización.
- **Datos**: Dado que la URL del JSON provista (`raw.githubusercontent...`) podría fallar (error 404 o CORS) o no contener todos los campos requeridos (como `aporte_49900_pagado`), implementé un "mock data fallback". Si el fetch falla, la aplicación carga datos de prueba que permiten demostrar la funcionalidad requerida.
- **Estilos**: Se utilizó Tailwind CSS para un diseño rápido, responsivo y limpio, siguiendo la pauta de "mobile-first" y diseño organizado.

### Backend y Lógica de Negocio (Tarea 2, 4 y 5)
Dado que el entorno de entrega es un repositorio Frontend (o código React), simulé el comportamiento del Backend en el archivo `services/backendService.ts`.
- **Validación**: La función `updateEstadoPipeline` contiene la lógica crítica solicitada:
    1. Validar que el estado sea parte del Enum.
    2. **Validación de Negocio (Tarea 5)**: Se bloquea el cambio a "Pendiente Jurídico" si `aporte_49900_pagado` es `false`.
    3. **Plus**: Se valida el orden lógico de los estados (no se puede saltar arbitrariamente etapas).

### Dificultades y Soluciones
1. **API Real vs Mock**: No tener un endpoint real para hacer POST.
   - *Solución*: Crear un servicio asíncrono en el cliente que simula el retardo de red (`setTimeout`) y devuelve objetos con la misma estructura que tendría una respuesta HTTP real (`success`, `message`).
2. **Campos faltantes en JSON**: El requerimiento pide validar `aporte_49900_pagado`, pero es probable que el JSON público no lo tenga.
   - *Solución*: En el proceso de normalización de datos (`useAsociados`), se inyecta este valor o se lee si existe.

## Ejecución
La aplicación permite visualizar la lista, filtrar, y mediante el botón "Avanzar...", probar la lógica de validación del backend simulado en tiempo real.