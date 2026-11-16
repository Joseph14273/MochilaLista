# MochilaLista

## Problema
Los estudiantes suelen olvidar cuadernos, libros, uniformes o implementos específicos en casa porque cada día tienen materias diferentes y arman su mochila rápido sin revisar el horario.

## Solución
Permitirá a los estudiantes seleccionar un día de la semana (lunes a viernes) en una pantalla sencilla y marcar en una lista interactiva los materiales que ya guardaron en su mochila antes de salir a clases.

## Objetivos
- Construir una app móvil en React Native con Expo y TypeScript en una pantalla principal que cambie de lista en menos de 1 segundo al tocar cualquier botón de día (lunes a viernes).
- Mostrar al menos 4 materiales escolares precargados por cada día de la semana con el nombre de su materia asociada.
- Permitir marcar y desmarcar cada material con un toque, tachando visualmente el ítem y mostrando un mensaje de "Mochila lista" cuando el 100% de los útiles del día estén marcados.

## Habilidades
- React Native con Expo y TypeScript (.tsx)
- Componentes reutilizables y props tipadas
- Manejo de estado local con useState para marcar y desmarcar ítems
- Renderizado de listas y selección por días
- Estilos y diseño adaptable

## Alcance inicial
Incluirá una sola pantalla principal con un selector de días (lunes a viernes) y una lista interactiva donde el estudiante puede tocar cada material para marcarlo como guardado (usando materias y materiales precargados de ejemplo en el código).

## Restricciones
- Los materiales y materias vendrán precargados en el código (sin formularios para agregar ni editar ítems en esta versión).
- No incluirá barra de progreso ni cálculo de porcentajes todavía.
- No tendrá navegación entre múltiples pantallas ni pestañas inferiores.
- No usará bases de datos en la nube ni inicio de sesión.
