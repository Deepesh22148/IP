import React, { useState } from "react";
import { View, Text ,Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImageUploader = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [processedImageUri, setProcessedImageUri] = useState<string | null>(null);

    const IP_ADDRESS = "192.168.10.146";
    const PORT = 8080;

    // Function to pick an image from the camera
    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.status !== "granted") {
            Alert.alert("Permission required", "You need to allow camera access.");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            uploadImage(result.assets[0].uri);
        }
    };

    // Function to upload image and get processed image URL
    const uploadImage = async (uri: string) => {
        let formData = new FormData();
        formData.append("image", {
            uri,
            name: "photo.jpg",
            type: "image/jpeg",
        } as any);

        try {
            let response = await fetch(`http://${IP_ADDRESS}:${PORT}/upload`, {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            let json = await response.json();

            if (json.success) {
                setProcessedImageUri(json.processed_image_url);
            } else {
                Alert.alert("Processing Failed", json.message);
            }
        } catch (error) {
            Alert.alert("Upload Failed", "Something went wrong.");
            console.error(error);
        }
    };

    return (
        <View style={{ alignItems: "center", marginTop: 50 }}>
            <Button title="Capture Image" onPress={pickImage} />
            {imageUri && (
                <>
                    <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20 }} />
                </>
            )}
            {processedImageUri && (
                <>
                    <Text>console.log();</Text>
                    <Image source={{ uri: processedImageUri }} style={{ width: 200, height: 200, marginTop: 20 }} />
                </>
            )}
        </View>
    );
};

export default ImageUploader;
