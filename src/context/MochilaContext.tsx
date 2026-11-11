import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { datosIniciales } from "../data/datosIniciales";
import { DatosSemanales, DiaSemana, MaterialItem } from "../types/mochila";

const STORAGE_KEY = "@mochilalista/datos";

interface MochilaContextValue {
  datos: DatosSemanales;
  cargando: boolean;
  alternarMaterial: (dia: DiaSemana, materialId: string) => void;
  agregarMaterial: (dia: DiaSemana, nombre: string, materia: string) => void;
  eliminarMaterial: (dia: DiaSemana, materialId: string) => void;
  reiniciarDia: (dia: DiaSemana) => void;
  materialesDeDia: (dia: DiaSemana) => MaterialItem[];
}

const MochilaContext = createContext<MochilaContextValue | undefined>(undefined);

export function MochilaProvider({ children }: { children: React.ReactNode }) {
  const [datos, setDatos] = useState<DatosSemanales>(datosIniciales);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const guardados = await AsyncStorage.getItem(STORAGE_KEY);
        if (guardados) {
          setDatos(JSON.parse(guardados) as DatosSemanales);
        }
      } catch (error) {
        console.error("No se pudieron cargar los datos de MochilaLista.", error);
      } finally {
        setCargando(false);
      }
    };
    void cargarDatos();
  }, []);

  useEffect(() => {
    if (cargando) {
      return;
    }
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(datos)).catch((error: unknown) => {
      console.error("No se pudieron guardar los datos de MochilaLista.", error);
    });
  }, [datos, cargando]);

  const actualizarDia = useCallback((dia: DiaSemana, actualizar: (items: MaterialItem[]) => MaterialItem[]) => {
    setDatos((actuales) => {
      const materiales = actuales[dia].flatMap((materia) => materia.materiales);
      const nuevosMateriales = actualizar(materiales);
      const porId = new Map(nuevosMateriales.map((item) => [item.id, item]));
      return {
        ...actuales,
        [dia]: actuales[dia].map((materia) => ({
          ...materia,
          materiales: materia.materiales
            .map((item) => porId.get(item.id))
            .filter((item): item is MaterialItem => item !== undefined),
        })),
      };
    });
  }, []);

  const alternarMaterial = useCallback((dia: DiaSemana, materialId: string) => {
    actualizarDia(dia, (items) =>
      items.map((item) => (item.id === materialId ? { ...item, completado: !item.completado } : item)),
    );
  }, [actualizarDia]);

  const agregarMaterial = useCallback((dia: DiaSemana, nombre: string, materia: string) => {
    const nuevo: MaterialItem = {
      id: `${dia}-${Date.now()}`,
      nombre: nombre.trim(),
      materia: materia.trim(),
      completado: false,
    };
    setDatos((actuales) => {
      const indice = actuales[dia].findIndex((item) => item.nombre.toLowerCase() === materia.trim().toLowerCase());
      if (indice >= 0) {
        return {
          ...actuales,
          [dia]: actuales[dia].map((item, itemIndex) =>
            itemIndex === indice ? { ...item, materiales: [...item.materiales, nuevo] } : item,
          ),
        };
      }
      return {
        ...actuales,
        [dia]: [
          ...actuales[dia],
          { id: `${dia}-${Date.now()}-materia`, nombre: materia.trim(), horaInicio: "--:--", horaFin: "--:--", materiales: [nuevo] },
        ],
      };
    });
  }, []);

  const eliminarMaterial = useCallback((dia: DiaSemana, materialId: string) => {
    actualizarDia(dia, (items) => items.filter((item) => item.id !== materialId));
  }, [actualizarDia]);

  const reiniciarDia = useCallback((dia: DiaSemana) => {
    actualizarDia(dia, (items) => items.map((item) => ({ ...item, completado: false })));
  }, [actualizarDia]);

  const materialesDeDia = useCallback((dia: DiaSemana) => datos[dia].flatMap((materia) => materia.materiales), [datos]);

  const value = useMemo(() => ({
    datos, cargando, alternarMaterial, agregarMaterial, eliminarMaterial, reiniciarDia, materialesDeDia,
  }), [datos, cargando, alternarMaterial, agregarMaterial, eliminarMaterial, reiniciarDia, materialesDeDia]);

  return <MochilaContext.Provider value={value}>{children}</MochilaContext.Provider>;
}

export function useMochila() {
  const context = useContext(MochilaContext);
  if (!context) {
    throw new Error("useMochila debe usarse dentro de MochilaProvider.");
  }
  return context;
}
