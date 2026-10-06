import { Colors } from "../constants/theme";

export const color = {
  fondo: "#F5F5F5",
  primario: "#4CAF50",
  texto: "#111827",
  borde: "#E5E7EB",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

export const typography = {
  titulo: { fontSize: 26, fontWeight: 600, color: Colors.texto },
  subtitulo: { fontSize: 18, fontWeight: 600, color: Colors.texto },
  cuerpo: { fontSize: 14, fontWeight: 400, color: Colors.texto },
  secundario: { fontSize: 12, fontWeight: 400 },
  etiqueta: { fontSize: 10, fontWeight: 600 },
};

export default { color, spacing, typography };
