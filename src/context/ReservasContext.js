import React, {useState, useEffect,useCallback, useMemo, createContext} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CLAVE_RESERVAS = '@reserva_ingles'

export const ReservasContext = createContext(null)

export function ReservaProvider({children}){
    const [Reservas, setReservas] = useState([])
    const [Cargando, setCargando]= useState(true)
    
    //Cargar las reservas que tengo guardadas sino tengo nada me devuelve un arreglo vacio
    useEffect(()=>{
        const cargar = async ()=> {
            try{
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS)
                if(guardado != null){
                    setReservas(JSON.parse(guardado))
                }

            }catch(error){
                console.log('Error leyendo las reservas: ',error)
            }finally{
                setCargando(false)
            }
        }
        cargar()
    },[])

    useEffect(()=>{
        if(Cargando )return; //Evita sobreescribir el arreglo
        AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(Reservas)).catch((error)=>
            console.log('ocurrio un error guardando la reserva' , error)
        
    
    )
    },[Reservas, Cargando])

        const agregarReserva = useCallback((clase, horario) => {
            if (!clase || !horario) return { ok: false, mensaje: 'Datos incompletos' };

        const profeObj = clase.profesor || clase.profesora;
        const nombreProfe = typeof profeObj === 'object' ? `${profeObj?.nombre || ''} ${profeObj?.apellido || ''}`.trim() : (profeObj || '');

        const nueva = {
            id: `${clase.id}-${horario}`,
            claseId: clase.id,
            titulo: clase.titulo || '',
            nivel: clase.nivel || '',
            profesor: nombreProfe,
            precio: clase.precio || 0,
            horario,
            creadaEn: new Date().toISOString(),
    };

            let resultados = {ok: true}
            setReservas((previa)=>{
                if(previa.some((r)=>r.id===nueva.id)){
                    resultados = {ok: false, mensaje: 'Data duplicada'}
                    return previa
                }
                return[nueva, ...previa]

            })
            return resultados


        },[]) // cierra el callback

        const valor = useMemo(
            ()=>({Reservas,Cargando,agregarReserva}),[Reservas,Cargando,agregarReserva]
        )

        return <ReservasContext.Provider value={valor}>{children}</ReservasContext.Provider>

}//llave de cierre para la funcion