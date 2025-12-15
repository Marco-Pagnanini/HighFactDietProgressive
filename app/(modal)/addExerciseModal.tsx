import Button from '@/components/ui/Button';
import { BorderRadius, FontSizes, FontWeights, Spacing } from '@/constants/theme';
import { saveExercise } from '@/service/storage.service';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddExerciseModal() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        // Validazione
        if (!name.trim()) {
            Alert.alert('Errore', 'Inserisci il nome dell\'esercizio');
            return;
        }

        try {
            setLoading(true);

            const exercise = await saveExercise({
                name: name.trim(),
                details: details.trim() || 'Nessun dettaglio',
                image: imageUri,
            });

            console.log('Exercise saved:', exercise);

            Alert.alert(
                'Successo', 'Esercizio aggiunto con successo!',

                [
                    {
                        text: 'OK',
                        onPress: () => router.back(),
                    }
                ]
            );
        } catch (error) {
            console.error('Error saving exercise:', error);
            Alert.alert('Errore', 'Impossibile salvare l\'esercizio');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="close" size={28} color="#2F2F2F" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Nuovo Esercizio</Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* Form */}
                <View style={styles.form}>
                    {/* Nome Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nome Esercizio</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="es. Panca Piana"
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Dettagli Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Dettagli (opzionale)</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={details}
                            onChangeText={setDetails}
                            placeholder="es. adduzione scapolare"
                            placeholderTextColor="#999"
                            multiline
                            numberOfLines={3}
                        />
                    </View>
                </View>

                {/* Bottone Salva */}
                <View style={styles.buttonContainer}>
                    <Button
                        title={loading ? 'Salvando...' : 'Salva Esercizio'}
                        onPress={handleSave}
                        disabled={loading}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: Spacing.lg,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Spacing.xl,
    },
    closeButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: FontSizes['2xl'],
        fontWeight: FontWeights.bold as any,
        color: '#2F2F2F',
        fontFamily: 'Montserrat',
    },
    form: {
        flex: 1,
        gap: Spacing.lg,
    },
    inputContainer: {
        gap: Spacing.sm,
    },
    label: {
        fontSize: FontSizes.base,
        fontWeight: FontWeights.semibold as any,
        color: '#2F2F2F',
        fontFamily: 'Montserrat',
    },
    input: {
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        fontSize: FontSizes.base,
        color: '#2F2F2F',
        fontFamily: 'Roboto',
        backgroundColor: '#fff',
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    imagePicker: {
        height: 200,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: BorderRadius.md,
        overflow: 'hidden',
        backgroundColor: '#F9F9F9',
    },
    imagePickerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.sm,
    },
    imagePickerText: {
        fontSize: FontSizes.sm,
        color: '#999',
        fontFamily: 'Roboto',
    },
    imagePreview: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        paddingTop: Spacing.lg,
        paddingBottom: Spacing.md,
    },
});
