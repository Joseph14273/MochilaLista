export type DiaSemana =
  | "Lunes"
  | "Martes"
  | "Miércoles"
  | "Jueves"
  | "Viernes";

export interface MaterialItem {
  id: string;
  nombre: string;
  materia: string;
  completado: boolean;
}

export interface MateriaHorario {
  id: string;
  nombre: string;
  horaInicio: string;
  horaFin: string;
  materiales: MaterialItem[];
}

export type DatosSemanales = Record<DiaSemana, MateriaHorario[]>;
