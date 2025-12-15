import { BorderRadius, FontSizes, FontWeights, Shadows, Spacing } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

interface CardProps {
    name: string;
    details: string;
    reps: number;
    sets: number;
    lastWeight?: number;
    image: ImageSourcePropType;
}

const Card = ({ name, details, reps, sets, lastWeight, image }: CardProps) => {
    return (
        <View style={styles.card}>
            {/* Immagine di sfondo */}
            <Image
                source={image}
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
                    <Text style={styles.info}>
                        {sets}x{reps}/{sets * reps}
                    </Text>
                    {lastWeight && (
                        <Text style={styles.info}>
                            Last Weight: {lastWeight}
                        </Text>
                    )}
                </View>
            </View>
        </View>
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
        padding: Spacing.md + 4, // ~20px
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
