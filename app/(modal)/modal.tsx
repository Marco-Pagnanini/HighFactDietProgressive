import Button from '@/components/ui/Button';
import { BorderRadius, FontSizes, FontWeights, Spacing } from '@/constants/theme';
import { Session } from '@/data/exercise.types';
import { getSessionsByExercise } from '@/service/storage.service';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

export default function ExerciseDetailModal() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Carica le sessioni dall'AsyncStorage
    const loadSessions = async () => {
        try {
            setLoading(true);
            const exerciseId = params.exerciseId as string;
            const data = await getSessionsByExercise(exerciseId);
            setSessions(data);
        } catch (error) {
            console.error('Error loading sessions:', error);
        } finally {
            setLoading(false);
        }
    };

    // Funzione per il refresh
    const onRefresh = async () => {
        setRefreshing(true);
        await loadSessions();
        setRefreshing(false);
    };

    useEffect(() => {
        loadSessions();
    }, [params.exerciseId]);

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const formatShortDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    };

    // Prepara i dati per il grafico
    const getChartData = () => {
        if (sessions.length === 0) {
            return {
                labels: [''],
                datasets: [{ data: [0] }]
            };
        }

        // Prendi le ultime 10 sessioni (ordinate dalla più vecchia alla più recente per il grafico)
        const recentSessions = [...sessions].reverse().slice(-10);

        return {
            labels: recentSessions.map(s => formatShortDate(s.date)),
            datasets: [
                {
                    data: recentSessions.map(s => s.weight),
                    color: (opacity = 1) => `rgba(47, 47, 47, ${opacity})`, // Linea nera
                    strokeWidth: 3
                }
            ]
        };
    };

    const chartData = getChartData();

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#2F2F2F"
                        colors={['#2F2F2F']}
                    />
                }
            >
                {/* Header con grafico */}
                <View style={styles.chartContainer}>
                    {/* Bottone back */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="chevron-back" size={24} color="#2F2F2F" />
                    </TouchableOpacity>

                    {/* Titolo esercizio */}
                    <View style={styles.headerInfo}>
                        <Text style={styles.exerciseTitle}>{params.exerciseName}</Text>
                        {sessions.length > 0 && (
                            <Text style={styles.exerciseSubtitle}>
                                Ultimo allenamento: {sessions[0].sets}x{sessions[0].reps} - {sessions[0].weight}kg
                            </Text>
                        )}
                    </View>

                    {/* Grafico dei progressi */}
                    {sessions.length > 0 ? (
                        <View style={styles.chartWrapper}>
                            <Text style={styles.chartTitle}>Progressi Peso (kg)</Text>
                            <LineChart
                                data={chartData}
                                width={screenWidth - 32}
                                height={220}
                                chartConfig={{
                                    backgroundColor: '#ffffff',
                                    backgroundGradientFrom: '#f9f9f9',
                                    backgroundGradientTo: '#ffffff',
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(47, 47, 47, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(47, 47, 47, ${opacity})`,
                                    style: {
                                        borderRadius: BorderRadius.md,
                                    },
                                    propsForDots: {
                                        r: '6',
                                        strokeWidth: '2',
                                        stroke: '#2F2F2F',
                                        fill: '#ffffff'
                                    },
                                    propsForBackgroundLines: {
                                        strokeDasharray: '', // Linee solide
                                        stroke: '#E0E0E0',
                                        strokeWidth: 1
                                    }
                                }}
                                bezier
                                style={styles.chart}
                                withInnerLines={true}
                                withOuterLines={true}
                                withVerticalLines={false}
                                withHorizontalLines={true}
                                withVerticalLabels={true}
                                withHorizontalLabels={true}
                                fromZero={false}
                            />
                        </View>
                    ) : (
                        <View style={styles.emptyChartContainer}>
                            <Ionicons name="bar-chart-outline" size={60} color="#E0E0E0" />
                            <Text style={styles.emptyChartText}>
                                Aggiungi sessioni per vedere i progressi
                            </Text>
                        </View>
                    )}
                </View>

                {/* Contenuto sotto il grafico */}
                <View style={styles.content}>
                    {/* Sezione Ultime sessioni */}
                    <Text style={styles.sectionTitle}>Ultime sessioni</Text>

                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#2F2F2F" />
                        </View>
                    ) : sessions.length > 0 ? (
                        <View style={styles.sessionsContainer}>
                            {sessions.slice(0, 5).map((session) => (
                                <View key={session.id} style={styles.sessionCard}>
                                    <View>
                                        <Text style={styles.sessionText}>
                                            Reps: {session.sets}×{session.reps}
                                        </Text>
                                        <Text style={styles.sessionDate}>
                                            {formatDate(session.date)}
                                        </Text>
                                    </View>
                                    <Text style={styles.sessionText}>
                                        Peso: {session.weight}kg
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                Nessuna sessione registrata.{'\n'}
                                Aggiungi la prima!
                            </Text>
                        </View>
                    )}

                    {/* Bottone Aggiungi Sessione */}
                    <Button
                        title="Aggiungi +"
                        onPress={() => {
                            router.push({
                                pathname: '/addSessionModal',
                                params: {
                                    exerciseId: params.exerciseId,
                                    exerciseName: params.exerciseName,
                                }
                            });
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    chartContainer: {
        backgroundColor: '#F9F9F9',
        paddingTop: Spacing.md,
        paddingBottom: Spacing.xl,
        borderBottomLeftRadius: BorderRadius.xl,
        borderBottomRightRadius: BorderRadius.xl,
    },
    backButton: {
        position: 'absolute',
        top: Spacing.md,
        left: Spacing.md,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerInfo: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.xl + Spacing.md,
        paddingBottom: Spacing.md,
    },
    exerciseTitle: {
        fontSize: 28,
        fontWeight: FontWeights.bold as any,
        color: '#2F2F2F',
        fontFamily: 'Montserrat',
        marginBottom: Spacing.xs,
    },
    exerciseSubtitle: {
        fontSize: FontSizes.sm,
        color: '#666',
        fontFamily: 'Roboto',
    },
    chartWrapper: {
        paddingHorizontal: Spacing.md,
    },
    chartTitle: {
        fontSize: FontSizes.base,
        fontWeight: FontWeights.semibold as any,
        color: '#2F2F2F',
        fontFamily: 'Montserrat',
        marginBottom: Spacing.sm,
        paddingLeft: Spacing.xs,
    },
    chart: {
        marginVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
    },
    emptyChartContainer: {
        height: 220,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Spacing.md,
        backgroundColor: '#fff',
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
    },
    emptyChartText: {
        fontSize: FontSizes.sm,
        color: '#999',
        fontFamily: 'Roboto',
        marginTop: Spacing.sm,
    },
    content: {
        padding: Spacing.lg,
    },
    sectionTitle: {
        fontSize: FontSizes.xl,
        fontWeight: FontWeights.bold as any,
        color: '#2F2F2F',
        fontFamily: 'Montserrat',
        marginBottom: Spacing.md,
    },
    sessionsContainer: {
        gap: Spacing.sm,
        marginBottom: Spacing.xl,
    },
    sessionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        borderRadius: BorderRadius.md,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        backgroundColor: '#fff',
    },
    sessionText: {
        fontSize: FontSizes.base,
        fontWeight: FontWeights.medium as any,
        color: '#2F2F2F',
        fontFamily: 'Roboto',
    },
    sessionDate: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.regular as any,
        color: '#999',
        fontFamily: 'Roboto',
        marginTop: 4,
    },
    loadingContainer: {
        paddingVertical: Spacing.xl,
        alignItems: 'center',
    },
    emptyContainer: {
        paddingVertical: Spacing.xl * 2,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: FontSizes.base,
        color: '#999',
        textAlign: 'center',
        fontFamily: 'Roboto',
        lineHeight: 24,
    },
});
