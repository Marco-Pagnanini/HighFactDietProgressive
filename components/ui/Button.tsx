import { BorderRadius, Colors, FontSizes, FontWeights, Spacing } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
}

const Button = ({ title, onPress, variant = 'primary', style, ...rest }: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                variant === 'primary' && styles.primary,
                variant === 'secondary' && styles.secondary,
                variant === 'outline' && styles.outline,
                style
            ]}
            onPress={onPress}
            activeOpacity={0.8}
            {...rest}
        >
            <Text style={[
                styles.text,
                variant === 'outline' && styles.outlineText
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        width: "90%",
        paddingVertical: Spacing.md + 2, // ~18px
        paddingHorizontal: Spacing.lg,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    primary: {
        backgroundColor: Colors.darkBackground // Nero come nel design
    },
    secondary: {
        backgroundColor: Colors.darkBackground,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: '#1A1A1A',
    },
    text: {
        color: '#FFFFFF',
        fontSize: FontSizes.base,
        fontWeight: FontWeights.semibold as any,
        fontFamily: 'Montserrat', // Usa Montserrat-SemiBold se disponibile
    },
    outlineText: {
        color: '#1A1A1A',
    }
})
