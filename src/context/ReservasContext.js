import React, {useState, useEffect,useCallback, useMemo, createContext} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CLAVE_RESERVAS = '@reserva_ingles'

export const ReservasContext = createContext(null)

export function ReservaProvider(children){
    const [Reservas, setReservas] = useState([])
    const [Cargando, setCargando]= useState(true)
    
    //Cargar las reservas que tengo guardadas sino tengo nada me devuelve un arreglo vacio
    useEffect(()=>{
        const cargar = async ()=> {
            try{
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS)
                if(guardado != null){
                    setReservas(JSON.parse)
                }

            }catch(error){
                console.log('Error leyendo las reservas: ',error)
            }finally{
                setCargando(false)
            }
        }
        cargar()
    },[])


}