import { BorderRadius, FontSizes, FontWeights, Shadows, Spacing } from '@/constants/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface CardProps {
    exerciseId: string;
    name: string;
    details: string;
    reps: number;
    sets: number;
    lastWeight?: number;
}

const Card = ({ exerciseId, name, details, reps, sets, lastWeight }: CardProps) => {
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: '/(modal)/modal',
            params: {
                exerciseId,
                exerciseName: name,
                details,
                reps: reps.toString(),
                sets: sets.toString(),
                lastWeight: lastWeight?.toString() || '0',
            }
        });
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={handlePress}
            activeOpacity={0.9}
        >
            {/* Immagine di sfondo - sempre logo.png */}
            <Image
                source={require('@/assets/images/logo.png')}
                style={styles.image}
                resizeMode="cover"
            />

            {/* Gradient overlay per migliorare la leggibilità del testo */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.gradient}
            />

            {/* Contenuto della card */}
            <View style={styles.content}>
                {/* Titolo esercizio */}
                <Text style={styles.title}>{name}</Text>

                {/* Info: reps/sets e ultimo peso */}
                <View style={styles.infoContainer}>
                    {sets > 0 && reps > 0 && (
                        <Text style={styles.info}>
                            {sets}x{reps}/{sets * reps}
                        </Text>
                    )}
                    {lastWeight && lastWeight > 0 && (
                        <Text style={styles.info}>
                            Last Weight: {lastWeight}
                        </Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        width: 280,
        height: 380,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        marginRight: Spacing.md,
        ...Shadows.lg,
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
    },
    content: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: Spacing.md + 4,
    },
    title: {
        fontSize: FontSizes['2xl'],
        fontWeight: FontWeights.bold as any,
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
        marginBottom: Spacing.xs,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    info: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.regular as any,
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Roboto',
    },
})
