import { HelloWave } from '@/components/hello-wave';
import Chips from '@/components/ui/Chips';
import ExerciseList from '@/components/ui/ExerciseList';
import { Colors, FontSizes, FontWeights, Spacing } from '@/constants/theme';
import { Exercise } from '@/data/exercise.types';
import { getExercises } from '@/service/storage.service';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const router = useRouter();
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);

    // Carica gli esercizi dall'AsyncStorage
    const loadExercises = async () => {
        try {
            setLoading(true);
            const data = await getExercises();
            setExercises(data);
        } catch (error) {
            console.error('Error loading exercises:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header con titolo e logo */}
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Hi, Marco</Text>
                    <HelloWave />
                </View>

                <View style={styles.logoContainer}>
                    <Image
                        source={require("@/assets/images/logo.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
            </View>

            {/* Sottotitolo */}
            <Text style={styles.subtitle}>Explore the world</Text>

            {/* Search bar con bottone + */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#999" />
                    <Text style={styles.searchPlaceholder}>Search places</Text>
                </View>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push('/(modal)/addExerciseModal')}
                >
                    <Ionicons name="add" size={24} color="#2F2F2F" />
                </TouchableOpacity>
            </View>

            {/* Chips per filtrare */}
            <Chips />


            {/* Lista esercizi */}
            <ExerciseList
                exercises={exercises}
                loading={loading}
                onRefresh={loadExercises}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: Spacing.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Spacing.sm,
        paddingBottom: Spacing.xs,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: FontWeights.bold as any,
        color: '#2F2F2F',
        fontFamily: 'Montserrat',
    },
    logoContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 32,
        height: 32,
        tintColor: Colors.primaryBlue,
    },
    subtitle: {
        fontSize: FontSizes.base,
        color: Colors.textSecondary,
        marginTop: Spacing.xs,
        marginBottom: Spacing.lg,
        fontFamily: 'Roboto',
    },
    searchContainer: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginBottom: Spacing.sm,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm + 4,
        gap: Spacing.sm,
    },
    searchPlaceholder: {
        fontSize: FontSizes.base,
        color: '#999',
        fontFamily: 'Roboto',
    },
    addButton: {
        width: 48,
        height: 48,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
