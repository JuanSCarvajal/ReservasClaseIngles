export const NIVELES = [
  " Todos ",
  " Básico ",
  " Intermedio ",
  " Avanzado ",
  " Conversacional ",
];

export const CLASES = [
  {
    id: " 1 ",
    título: " Inglés desde cero ",
    nivel: " Básico ",
    descripción:
      " Construye tus primeras frases, saludos y presentaciones personales. Ideal si nunca has estudiado inglés formalmente. ",
    profesor: {
      nombre: " Laura Gómez ",
      pais: " Colombia ",
      foto: " https://i.pravatar.cc/200?img=45 ",
    },
    imagen:
      " https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80 ",
    precio: 32000,
    duración: 50,
    modalidad: " Virtual ",
    calificación: 4.8,
    copas: 6,
    horarios: [" Lun 7:00 am ", " Mié 7:00 am ", " Vie 6:00 pm "],
  },
  {
    id: " 2 ",
    título: " Conversación cotidiana ",
    nivel: " Conversacional ",
    descripción:
      " Práctica oral en grupos pequeños con temas del día a día: viajes, comida, trabajo y cultura. ",
    profesor: {
      nombre: " Michael Reed ",
      pais: " Estados Unidos ",
      foto: " https://i.pravatar.cc/200?img=12 ",
    },
    imagen:
      " https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80 ",
    precio: 45000,
    duración: 60,
    modalidad: " Virtual ",
    calificación: 4.9,
    copas: 4,
    horarios: [" Mar 6:00 pm ", " Jue 6:00 pm ", " Sáb 10:00 am "],
  },
  {
    id: " 3 ",
    título: " Inglés para entrevistas ",
    nivel: " Avanzado ",
    descripción:
      " Prepara tu hoja de vida, responde preguntas técnicas y practica entrevistas simuladas en inglés. ",
    profesor: {
      nombre: " Sofía Ramírez ",
      pais: " México ",
      foto: " https://i.pravatar.cc/200?img=32 ",
    },
    imagen:
      " https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80 ",
    precio: 58000,
    duración: 60,
    modalidad: " Presencial ",
    calificación: 4.7,
    copas: 3,
    horarios: [" Lun 8:00 pm ", " Mié 8:00 pm "],
  },
  {
    id: " 4 ",
    título: " Gramática intermedia ",
    nivel: " Intermedio ",
    descripción:
      " Tiempos verbales, condicionales y voz pasiva explicados con ejercicios prácticos y retroalimentación. ",
    profesor: {
      nombre: " Andrés Villa ",
      pais: " Colombia ",
      foto: " https://i.pravatar.cc/200?img=68 ",
    },
    imagen:
      " https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80 ",
    precio: 38000,
    duración: 50,
    modalidad: " Virtual ",
    calificación: 4.6,
    copas: 8,
    horarios: [" Mar 7:00 am ", " Jue 7:00 am ", " Sáb 9:00 am "],
  },
  {
    id: " 5 ",
    título: " Pronunciación y acento ",
    nivel: " Intermedio ",
    descripción:
      " Trabaja sonidos difíciles, entonación y ritmo para que te entiendan a la primera. ",
    profesora: {
      nombre: " Emma Clarke ",
      país: " Reino Unido ",
      foto: " https://i.pravatar.cc/200?img=24 ",
    },
    imagen:
      " https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80 ",
    precio: 42000,
    duración: 45,
    modalidad: " Virtual ",
    calificación: 4.9,
    copas: 5,
    horarios: [" Lun 5:00 pm ", " Vie 5:00 pm "],
  },
  {
    id: " 6 ",
    título: " Inglés para negocios ",
    nivel: " Avanzado ",
    descripción:
      " Reuniones, correos y presentaciones corporativas. Vocabulario técnico y expresiones formales. ",
    profesor: {
      nombre: " Daniel Ortiz ",
      pais: " España ",
      foto: " https://i.pravatar.cc/200?img=59 ",
    },
    imagen:
      " https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80 ",
    precio: 65000,
    duración: 60,
    modalidad: " Presencial ",
    calificación: 4.8,
    copas: 4,
    horarios: [" Mié 6:00 am ", " Vie 6:00 am "],
  },
  {
    id: " 7 ",
    título: " Club de lectura en inglés ",
    nivel: " Conversacional ",
    descripción:
      " Leemos cuentos cortos y los comentamos en voz alta. Amplía vocabulario sin memorizar listas. ",
    profesor: {
      nombre: " Carolina Peña ",
      pais: " Colombia ",
      foto: " https://i.pravatar.cc/200?img=47 ",
    },
    imagen:
      " https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80 ",
    precio: 28000,
    duración: 45,
    modalidad: " Virtual ",
    calificación: 4.5,
    cupos: 10,
    horarios: [" Jue 7:00 pm ", " Sáb 11:00 am "],
  },
  {
    id: " 8 ",
    título: " Inglés para viajar ",
    nivel: " Básico ",
    descripción:
      " Aeropuerto, hotel, restaurante y emergencias. Listas de frases para usar en tu próximo viaje. ",
    profesor: {
      nombre: " Julián Mesa ",
      pais: " Colombia ",
      foto: " https://i.pravatar.cc/200?img=51 ",
    },
    imagen:
      " https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80 ",
    precio: 30000,
    duración: 45,
    modalidad: " Virtual ",
    calificación: 4.7,
    copas: 7,
    horarios: [" Mar 8:00 pm ", " Sáb 8:00 am "],
  },
];

export const formatearPrecio = (valor) =>
  " $ " + valor.toLocaleString(" es-CO ") + " COP ";
