import { Pressable, View } from "react-native";
import { Image } from "../data/classes";
import EtiquetaNivel from "./EtiquetaNivel";

export default function Card({ clase, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Image source={{ uri: clase.Image }} />
      <View>
        <EtiquetaNivel nivel={clase.nivel} />
      </View>
    </Pressable>
  );
}
