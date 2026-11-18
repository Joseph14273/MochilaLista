export const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"] as const;

export type Day = (typeof DAYS)[number];

export type SchoolItem = {
  id: string;
  name: string;
  subject: string;
};
