import { BorderRadius, Colors, FontSizes, FontWeights, Spacing } from '@/constants/theme';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ChipItemProps {
    item: string;
    isSelected: boolean;
    onPress: () => void;
}

const ChipItem = ({ item, isSelected, onPress }: ChipItemProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.chip,
                isSelected && styles.chipSelected
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[
                styles.chipText,
                isSelected && styles.chipTextSelected
            ]}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
        </TouchableOpacity>
    )
}

const Chips = () => {
    const [selectedChip, setSelectedChip] = useState('schiena');

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                data={DATA}
                renderItem={({ item }) => (
                    <ChipItem
                        item={item}
                        isSelected={selectedChip === item}
                        onPress={() => setSelectedChip(item)}
                    />
                )}
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </View>
    )
}

export default Chips

const styles = StyleSheet.create({
    container: {
        marginVertical: Spacing.md,
    },
    listContent: {
        paddingHorizontal: Spacing.md,
        gap: Spacing.sm,
    },
    chip: {
        paddingVertical: Spacing.sm + 4, // ~12px
        paddingHorizontal: Spacing.lg,
        borderRadius: BorderRadius.xl,
        backgroundColor: 'transparent',
        marginRight: Spacing.sm,
    },
    chipSelected: {
        backgroundColor: Colors.darkBackground, // Nero come nel design
    },
    chipText: {
        fontSize: FontSizes.base,
        fontWeight: FontWeights.medium as any,
        color: '#999999', // Grigio per chip non selezionate
        fontFamily: 'Montserrat',
    },
    chipTextSelected: {
        color: '#FFFFFF',
        fontWeight: FontWeights.semibold as any,
    }
})

const DATA = [
    "schiena",
    "petto",
    "gambe",
    "spalle",
    "bicipiti",
    "tricipiti",
]
