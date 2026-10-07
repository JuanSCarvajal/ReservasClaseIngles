import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAlmacenamiento(clave,valorInicial){

    const [valor, setValor]= useState(valorInicial)
    const [Listo, setListo]= useState(false)

    useEffect(()=>{
        let activo = true // esto es una bandera para saber si el componenete se esta guardando o montando el componente

        AsyncStorage.getItem(clave)
        .then((guardando)=>{
            if (activo && guardando != null)setValor(JSON.parse(guardando))
        })
            .catch((Error)=>console.log('Eror Leyendo'+ clave, error))
            .finally(()=>activo &&setListo(true))

            return()=>{
                activo = false
            }

    },[clave])

    const actualizar = useCallback (
        async(nuevoValor)=>{
            setValor=(nuevoValor)
            try{
                await AsyncStorage.setItem(clave, JSON.stringify(nuevoValor))

            }catch(error){
                console.log('Error guardando'+clave,error)
            }
        }, [clave]
    )
}
