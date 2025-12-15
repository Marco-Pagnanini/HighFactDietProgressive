
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';



export const unstable_settings = {
    anchor: '(tabs)',
};

export default function RootLayout() {

    return (
        <>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(modal)/modal" options={{ headerShown: false }} />
                <Stack.Screen name="(modal)/addSessionModal" options={{ headerShown: false, presentation: "modal" }} />
                <Stack.Screen name="(modal)/addExerciseModal" options={{ headerShown: false, presentation: "modal" }} />

            </Stack>
            <StatusBar style="auto" />
        </>
    );
}
