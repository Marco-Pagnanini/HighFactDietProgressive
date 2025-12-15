import Card from '@/components/ui/Card'
import { FontSizes, FontWeights, Spacing } from '@/constants/theme'
import { Exercise } from '@/data/exercise.types'
import { getLastSession } from '@/service/storage.service'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'

interface ExerciseListProps {
    exercises: Exercise[];
    loading?: boolean;
    onRefresh?: () => void;
}

interface ExerciseWithLastSession extends Exercise {
    lastWeight?: number;
    lastReps?: number;
    lastSets?: number;
}

const ExerciseList = ({ exercises, loading = false, onRefresh }: ExerciseListProps) => {
    const [exercisesWithSessions, setExercisesWithSessions] = useState<ExerciseWithLastSession[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    // Carica l'ultima sessione per ogni esercizio
    const loadLastSessions = async () => {
        const exercisesWithData = await Promise.all(
            exercises.map(async (exercise) => {
                const lastSession = await getLastSession(exercise.id);
                return {
                    ...exercise,
                    lastWeight: lastSession?.weight,
                    lastReps: lastSession?.reps,
                    lastSets: lastSession?.sets,
                };
            })
        );
        setExercisesWithSessions(exercisesWithData);
    };

    useEffect(() => {
        loadLastSessions();
    }, [exercises]);

    const handleRefresh = async () => {
        setRefreshing(true);
        if (onRefresh) {
            await onRefresh();
        }
        await loadLastSessions();
        setRefreshing(false);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2F2F2F" />
            </View>
        );
    }

    if (exercises.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                    Nessun esercizio salvato.{'\n'}
                    Tocca il pulsante + per aggiungerne uno!
                </Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    tintColor={"#2F2F2F"}

                />
            }
        >
            {/* Header con titolo e "View all" */}
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>Exercise</Text>
                <Text style={styles.viewAll}>View all</Text>
            </View>

            {/* Lista orizzontale di card */}
            <FlatList
                horizontal
                data={exercisesWithSessions}
                renderItem={({ item }) => (
                    <Card
                        exerciseId={item.id}
                        name={item.name}
                        details={item.details}
                        reps={item.lastReps || 0}
                        sets={item.lastSets || 0}
                        lastWeight={item.lastWeight}
                    />
                )}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </ScrollView>
    )
}

export default ExerciseList

const styles = StyleSheet.create({
    container: {
        marginTop: Spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        marginBottom: Spacing.md,
    },
    sectionTitle: {
        fontSize: FontSizes.xl,
        fontWeight: FontWeights.bold as any,
        color: '#2F2F2F',
        fontFamily: 'Montserrat',
    },
    viewAll: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.medium as any,
        color: '#999999',
        fontFamily: 'Roboto',
    },
    listContent: {
        paddingHorizontal: Spacing.md,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Spacing.xl * 2,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Spacing.xl * 2,
        paddingHorizontal: Spacing.xl,
    },
    emptyText: {
        fontSize: FontSizes.base,
        color: '#999',
        textAlign: 'center',
        fontFamily: 'Roboto',
        lineHeight: 24,
    },
})
