import { Text, View } from "react-native";
import ImageUploader from "@/app/components/ImageUploader";

export default function Index() {
  return (
    <View
      className={"flex-1 justify-center items-center "}
    >
      <ImageUploader />
    </View>
  );
}
