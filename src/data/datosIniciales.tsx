import { DatosSemanales, DiaSemana, MaterialItem } from "../types/mochila";

const material = (id: string, nombre: string, materia: string): MaterialItem => ({
  id,
  nombre,
  materia,
  completado: false,
});

export const DIAS_SEMANA: DiaSemana[] = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
];

export const datosIniciales: DatosSemanales = {
  Lunes: [
    {
      id: "lunes-matematicas",
      nombre: "Matemáticas",
      horaInicio: "07:00",
      horaFin: "08:00",
      materiales: [
        material("lunes-cuaderno", "Cuaderno de cuadros", "Matemáticas"),
        material("lunes-calculadora", "Calculadora científica", "Matemáticas"),
      ],
    },
    {
      id: "lunes-lengua",
      nombre: "Lengua",
      horaInicio: "08:00",
      horaFin: "09:00",
      materiales: [material("lunes-lectura", "Libro de lectura", "Lengua")],
    },
    {
      id: "lunes-fisica",
      nombre: "Física",
      horaInicio: "09:00",
      horaFin: "10:00",
      materiales: [material("lunes-fisica-cuaderno", "Cuaderno de fórmulas", "Física")],
    },
  ],
  Martes: [
    {
      id: "martes-quimica",
      nombre: "Química",
      horaInicio: "07:00",
      horaFin: "08:00",
      materiales: [
        material("martes-mandil", "Mandil de laboratorio", "Química"),
        material("martes-tabla", "Tabla periódica", "Química"),
      ],
    },
    {
      id: "martes-historia",
      nombre: "Historia",
      horaInicio: "08:00",
      horaFin: "09:00",
      materiales: [material("martes-historia-cuaderno", "Cuaderno de historia", "Historia")],
    },
    {
      id: "martes-deporte",
      nombre: "Educación Física",
      horaInicio: "10:00",
      horaFin: "11:00",
      materiales: [material("martes-uniforme", "Uniforme de deportes", "Educación Física")],
    },
  ],
  Miércoles: [
    {
      id: "miercoles-ingles",
      nombre: "Inglés",
      horaInicio: "07:00",
      horaFin: "08:00",
      materiales: [material("miercoles-ingles-libro", "Libro de inglés", "Inglés")],
    },
    {
      id: "miercoles-arte",
      nombre: "Arte",
      horaInicio: "08:00",
      horaFin: "09:00",
      materiales: [
        material("miercoles-colores", "Colores y marcadores", "Arte"),
        material("miercoles-cartulina", "Cartulina blanca", "Arte"),
      ],
    },
  ],
  Jueves: [
    {
      id: "jueves-biologia",
      nombre: "Biología",
      horaInicio: "07:00",
      horaFin: "08:00",
      materiales: [material("jueves-biologia-cuaderno", "Cuaderno de biología", "Biología")],
    },
    {
      id: "jueves-informatica",
      nombre: "Informática",
      horaInicio: "09:00",
      horaFin: "10:00",
      materiales: [material("jueves-usb", "Memoria USB", "Informática")],
    },
  ],
  Viernes: [
    {
      id: "viernes-matematicas",
      nombre: "Matemáticas",
      horaInicio: "07:00",
      horaFin: "08:00",
      materiales: [material("viernes-geometria", "Juego de geometría", "Matemáticas")],
    },
    {
      id: "viernes-proyecto",
      nombre: "Proyecto",
      horaInicio: "08:00",
      horaFin: "10:00",
      materiales: [material("viernes-agenda", "Agenda y apuntes", "Proyecto")],
    },
  ],
};
