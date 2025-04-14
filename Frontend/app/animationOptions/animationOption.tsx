import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const OPTIONS = ['Dab', 'Dance', 'Jumping Jacks', 'Jumping', 'Hello Weaving', 'Zombie'];

export default function AnimationSelector() {
    const [selected, setSelected] = useState([]);

    const toggleOption = (option) => {
        setSelected((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    const submitSelection = async () => {
        try {
            const response = await fetch('http://192.168.1.37:3000/api/animations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ selectedAnimations: selected }),
            });

            const result = await response.json();
            console.log(result);
            Alert.alert('Success', 'Animations sent successfully!');
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Failed to send animations');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Select Animations</Text>
            <ScrollView contentContainerStyle={styles.optionsContainer}>
                {OPTIONS.map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.optionButton,
                            selected.includes(option) && styles.selected,
                        ]}
                        onPress={() => toggleOption(option)}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                selected.includes(option) && styles.selectedText,
                            ]}
                        >
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.submitButton} onPress={submitSelection}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    optionButton: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        margin: 5,
        minWidth: 140,
        alignItems: 'center',
    },
    selected: {
        backgroundColor: '#00b894',
    },
    optionText: {
        color: '#fff',
        fontWeight: '500',
    },
    selectedText: {
        fontWeight: 'bold',
        color: '#000',
    },
    submitButton: {
        marginTop: 30,
        backgroundColor: '#0984e3',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
