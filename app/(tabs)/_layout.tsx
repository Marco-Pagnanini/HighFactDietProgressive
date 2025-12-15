import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { Tabs } from 'expo-router';
import { SFSymbol } from 'expo-symbols';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Colori presi dal design
const COLORS = {
    active: '#2F2F2F',    // Colore icona attiva (scuro)
    inactive: '#999999',  // Colore icona inattiva (grigio)
    background: '#FFFFFF',       // Colore del puntino rosso
};

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                // Nascondiamo il testo sotto le icone
                tabBarShowLabel: false,
                // Rimuoviamo il bordo superiore di default
                tabBarActiveTintColor: Colors.darkBackground,
                tabBarInactiveTintColor: COLORS.inactive,
                // Stile della barra flottante
                tabBarStyle: styles.tabBar,
            }}
        >
            {/* TAB 1: HOME */}
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon name="house.fill" color={color} focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
}

// --- Componente per l'Icona con il Puntino ---
const TabIcon = ({ name, color, focused }: { name: SFSymbol, color: string, focused: boolean }) => {
    return (
        <View style={styles.iconContainer}>
            <IconSymbol size={28} name={name} color={color} />
            {focused && <View style={styles.activeDot} />}
        </View>
    );
};

// --- Stili ---
const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 25, // Distanza dal fondo
        left: 20,
        right: 20,
        height: 70, // Altezza della barra
        backgroundColor: "#f5f5f5",
        borderRadius: 35, // Arrotondamento (metà dell'altezza per pillola perfetta)

        // Rimuove bordi default
        borderTopWidth: 0,
        paddingBottom: 0, // Importante per centrare le icone verticalmente
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        top: 10, // Spinge leggermente giù le icone per centrarle visivamente
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.darkBackground,
        marginTop: 6, // Distanza tra icona e puntino
    },
});
