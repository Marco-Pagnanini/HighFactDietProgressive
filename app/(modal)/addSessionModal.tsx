import Button from '@/components/ui/Button';
import { BorderRadius, FontSizes, FontWeights, Spacing } from '@/constants/theme';
import { saveSession } from '@/service/storage.service';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToastManager, { Toast } from 'toastify-react-native';

export default function AddSessionModal() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [weight, setWeight] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        // Validazione
        if (!reps.trim() || !sets.trim() || !weight.trim()) {
            Alert.alert('Errore', 'Compila tutti i campi');
            return;
        }

        const repsNum = parseInt(reps);
        const setsNum = parseInt(sets);
        const weightNum = parseFloat(weight);

        if (isNaN(repsNum) || isNaN(setsNum) || isNaN(weightNum)) {
            Alert.alert('Errore', 'Inserisci valori numerici validi');
            return;
        }

        if (repsNum <= 0 || setsNum <= 0 || weightNum <= 0) {
            Alert.alert('Errore', 'I valori devono essere maggiori di zero');
            return;
        }

        try {
            setLoading(true);

            // Salva la sessione con il nome e ID dell'esercizio
            const session = await saveSession(
                params.exerciseId as string,
                params.exerciseName as string,
                {
                    reps: repsNum,
                    sets: setsNum,
                    weight: weightNum,
                }
            );




            Toast.success('Aggiunto con Successo');
        } catch (error) {
            console.error('Error saving session:', error);
            Alert.alert('Errore', 'Impossibile salvare la sessione');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.content}>
                {/* Header con bottone close */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="close" size={28} color="#2F2F2F" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Aggiungi Sessione</Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* Info esercizio */}
                {params.exerciseName && (
                    <View style={styles.exerciseInfo}>
                        <Text style={styles.exerciseName}>{params.exerciseName}</Text>
                    </View>
                )}

                {/* Form inputs */}
                <View style={styles.form}>
                    {/* Sets Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Sets (Serie)</Text>
                        <TextInput
                            style={styles.input}
                            value={sets}
                            onChangeText={setSets}
                            placeholder="3"
                            keyboardType="numeric"
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Reps Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Reps (Ripetizioni)</Text>
                        <TextInput
                            style={styles.input}
                            value={reps}
                            onChangeText={setReps}
                            placeholder="8"
                            keyboardType="numeric"
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Weight Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Peso (kg)</Text>
                        <TextInput
                            style={styles.input}
                            value={weight}
                            onChangeText={setWeight}
                            placeholder="100"
                            keyboardType="numeric"
                            placeholderTextColor="#999"
                        />
                    </View>
                </View>

                {/* Bottone OK */}
                <View style={styles.buttonContainer}>
                    <Button
                        title={loading ? 'Salvando...' : 'OK'}
                        onPress={handleSave}
                        disabled={loading}
                    />
                </View>
            </View>
            <ToastManager />
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
        marginBottom: Spacing.md,
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
    exerciseInfo: {
        backgroundColor: '#F9F9F9',
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.lg,
    },
    exerciseName: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.semibold as any,
        color: '#2F2F2F',
        fontFamily: 'Montserrat',
        textAlign: 'center',
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
        fontSize: FontSizes.lg,
        color: '#2F2F2F',
        fontFamily: 'Roboto',
        backgroundColor: '#fff',
    },
    buttonContainer: {
        paddingTop: Spacing.lg,
        paddingBottom: Spacing.md,
    },
});
