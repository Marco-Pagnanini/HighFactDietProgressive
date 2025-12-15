import { HelloWave } from '@/components/hello-wave';
import Card from '@/components/ui/Card';
import Chips from '@/components/ui/Chips';
import { Colors, FontSizes, FontWeights, Spacing } from '@/constants/theme';
import { exercisesPlaceholder } from '@/data/exercise';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ExerciseType {
    name: string,
    details: string,
    reps: number,
    time: string,
    image?: string,
    sets: string
}

export default function HomeScreen() {
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
            <Text style={styles.subtitle}>Explore Exercises</Text>
            {/* Chips Muscol */}
            <Chips />

            {/* Cards */}

            <FlatList
                data={exercisesPlaceholder}
                renderItem={({ item }) => (
                    <Card
                        name={item.name}
                        details={item.details}
                        reps={item.reps}
                        sets={item.sets}
                        lastWeight={item.lastWeight}
                        image={item.image}
                    />
                )}
                keyExtractor={(item) => item.name}
                contentContainerStyle={styles.listContent}
            />
            {/*{exercisesPlaceholder.map((item: any, index: number) => {
                return (
                    <Card
                        key={index}
                        name={item.name}
                        details={item.details}
                        reps={item.reps}
                        sets={item.sets}
                        lastWeight={item.lastWeight}
                        image={item.image} />
                )
            })}*/}


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
        fontFamily: 'Montserrat', // Montserrat-Bold se disponibile
    },
    logoContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 50,
        height: 50,
    },
    subtitle: {
        fontSize: FontSizes.base,
        color: Colors.textSecondary,
        marginTop: Spacing.xs,
        marginBottom: Spacing.lg,
        fontFamily: 'Roboto',
    },
    listContent: {
        paddingHorizontal: Spacing.md
    }
});
