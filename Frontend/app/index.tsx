import {Pressable, Text, View} from "react-native";
import { Image } from 'expo-image';
import './global.css';
import { useNavigation } from '@react-navigation/native';
import {useRouter} from "expo-router";


const ImageURL = "https://i.gifer.com/AyHP.gif"; // URL of your GIF
const testUrl = "../assets/images/test.gif";
export default function Index() {
    const router = useRouter();

    return (
        <View className="flex-1 justify-center items-center text-center border-2 rounded-lg">
            <Image
                source={require(testUrl)}
                style={{ position : "absolute", height : '100%' , width : '100%' } }
            />

            <View className="  border-dotted w-[100vw] rounded-lg flex-col justify-center items-center"
            >

                <View className={"  w-[100%] flex justify-center items-center rounded-lg mb-6"}  style={{ backgroundColor: 'rgba(33, 33, 33, 0.5)' }}>
                    <Text className={"font-bold text-[42px] text-white"}>Image Animator</Text>
                </View>
                <Pressable className={" rounded-lg h-16 flex justify-center items-center bg-blue-600 w-[70vw] shadow-2xl"} onPress={() => router.push("/askImage/image")}>
                    <Text className={"font-bold text-3xl text-white "}>Proceed</Text>
                </Pressable>
            </View>
        </View>
    );
}
