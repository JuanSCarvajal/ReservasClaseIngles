import { useWindowDimensions } from "react-native";

export default function useResponsive (){
    const {width,heigth}=useWindowDimensions();
    const isTablet=width>=768;
    const isHorizontal = width>heigth;
    return{
        width,
        heigth,
        isTablet,
        isHorizontal,

        columnas:isTablet?2:1,
        ancho:isTablet?320:Math.min(width*0.72,300),
        paddingHorizontal: isTablet?32:16,
        

    };

    



}