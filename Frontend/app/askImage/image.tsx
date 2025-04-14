import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import {useRouter} from "expo-router";


export default function Image() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<Camera>(null); // camera reference
    const router = useRouter();
    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    async function takePhoto() {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });

            console.log('Captured image:', photo.uri);

            // Prepare file for upload
            const formData = new FormData();
            formData.append('image', {
                uri: photo.uri,
                type: 'image/jpeg',
                name: 'captured.jpg',
            } as any);

            try {
                const response = await fetch('http://192.168.1.37:3000/api/upload/captured', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                });

                const result = await response.json();
                console.log('Response from server:', result);
                Alert.alert('Success', 'Image uploaded and processed');
                router.push("/animationOptions/animationOption")
            } catch (err) {
                console.error(err);
                Alert.alert('Error', 'Failed to upload image');
            }
        }
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePhoto}>
                        <Text style={styles.text}>Capture</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: '#00000088',
        padding: 10,
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});
