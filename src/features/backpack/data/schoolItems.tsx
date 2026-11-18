import { Day, SchoolItem } from "../types";

export const schoolItemsByDay: Record<Day, SchoolItem[]> = {
  Lunes: [
    { id: "lunes-matematicas", name: "Cuaderno de matemáticas", subject: "Matemáticas" },
    { id: "lunes-lengua", name: "Libro de lectura", subject: "Lengua" },
    { id: "lunes-lapices", name: "Estuche de lápices", subject: "Arte" },
    { id: "lunes-regla", name: "Regla", subject: "Geometría" },
  ],
  Martes: [
    { id: "martes-ciencias", name: "Cuaderno de ciencias", subject: "Ciencias naturales" },
    { id: "martes-atlas", name: "Atlas", subject: "Geografía" },
    { id: "martes-colores", name: "Lápices de colores", subject: "Arte" },
    { id: "martes-calculadora", name: "Calculadora", subject: "Matemáticas" },
  ],
  Miércoles: [
    { id: "miercoles-historia", name: "Libro de historia", subject: "Historia" },
    { id: "miercoles-ingles", name: "Cuaderno de inglés", subject: "Inglés" },
    { id: "miercoles-diccionario", name: "Diccionario", subject: "Lengua" },
    { id: "miercoles-usb", name: "Memoria USB", subject: "Tecnología" },
  ],
  Jueves: [
    { id: "jueves-biologia", name: "Cuaderno de biología", subject: "Biología" },
    { id: "jueves-flauta", name: "Flauta", subject: "Música" },
    { id: "jueves-compas", name: "Compás", subject: "Geometría" },
    { id: "jueves-cuaderno", name: "Cuaderno de tareas", subject: "Tutoría" },
  ],
  Viernes: [
    { id: "viernes-educacion-fisica", name: "Uniforme deportivo", subject: "Educación física" },
    { id: "viernes-toalla", name: "Toalla pequeña", subject: "Educación física" },
    { id: "viernes-cuaderno", name: "Cuaderno de proyectos", subject: "Tecnología" },
    { id: "viernes-materiales", name: "Materiales reciclables", subject: "Ciencias" },
  ],
};
