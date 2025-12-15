import { Exercise, Session } from '@/types/exercise.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EXERCISES_KEY = '@fitness_exercises';
const SESSIONS_KEY = '@fitness_sessions';

// ==================== EXERCISES ====================

/**
 * Ottiene tutti gli esercizi salvati
 */
export const getExercises = async (): Promise<Exercise[]> => {
    try {
        const data = await AsyncStorage.getItem(EXERCISES_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error getting exercises:', error);
        return [];
    }
};

/**
 * Salva un nuovo esercizio o aggiorna uno esistente
 * Se esiste già un esercizio con lo stesso nome, ritorna quello esistente
 */
export const saveExercise = async (exercise: Omit<Exercise, 'id' | 'createdAt'>): Promise<Exercise> => {
    try {
        const exercises = await getExercises();

        // Cerca se esiste già un esercizio con lo stesso nome (case insensitive)
        const existingExercise = exercises.find(
            ex => ex.name.toLowerCase().trim() === exercise.name.toLowerCase().trim()
        );

        if (existingExercise) {
            console.log('Exercise already exists, returning existing:', existingExercise.name);
            return existingExercise;
        }

        // Crea nuovo esercizio
        const newExercise: Exercise = {
            ...exercise,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };

        exercises.push(newExercise);
        await AsyncStorage.setItem(EXERCISES_KEY, JSON.stringify(exercises));

        return newExercise;
    } catch (error) {
        console.error('Error saving exercise:', error);
        throw error;
    }
};

/**
 * Ottiene un esercizio per ID
 */
export const getExerciseById = async (id: string): Promise<Exercise | null> => {
    try {
        const exercises = await getExercises();
        return exercises.find(ex => ex.id === id) || null;
    } catch (error) {
        console.error('Error getting exercise by id:', error);
        return null;
    }
};

/**
 * Ottiene un esercizio per nome
 */
export const getExerciseByName = async (name: string): Promise<Exercise | null> => {
    try {
        const exercises = await getExercises();
        return exercises.find(
            ex => ex.name.toLowerCase().trim() === name.toLowerCase().trim()
        ) || null;
    } catch (error) {
        console.error('Error getting exercise by name:', error);
        return null;
    }
};

/**
 * Elimina un esercizio e tutte le sue sessioni
 */
export const deleteExercise = async (id: string): Promise<void> => {
    try {
        const exercises = await getExercises();
        const filtered = exercises.filter(ex => ex.id !== id);
        await AsyncStorage.setItem(EXERCISES_KEY, JSON.stringify(filtered));

        // Elimina anche tutte le sessioni di questo esercizio
        const sessions = await getSessions();
        const filteredSessions = sessions.filter(s => s.exerciseId !== id);
        await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(filteredSessions));
    } catch (error) {
        console.error('Error deleting exercise:', error);
        throw error;
    }
};

// ==================== SESSIONS ====================

/**
 * Ottiene tutte le sessioni salvate
 */
export const getSessions = async (): Promise<Session[]> => {
    try {
        const data = await AsyncStorage.getItem(SESSIONS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error getting sessions:', error);
        return [];
    }
};

/**
 * Ottiene le sessioni di un esercizio specifico
 */
export const getSessionsByExercise = async (exerciseId: string): Promise<Session[]> => {
    try {
        const sessions = await getSessions();
        return sessions
            .filter(s => s.exerciseId === exerciseId)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Più recente prima
    } catch (error) {
        console.error('Error getting sessions by exercise:', error);
        return [];
    }
};

/**
 * Salva una nuova sessione
 */
export const saveSession = async (
    exerciseId: string,
    exerciseName: string,
    sessionData: { reps: number; sets: number; weight: number }
): Promise<Session> => {
    try {
        const sessions = await getSessions();

        const newSession: Session = {
            id: Date.now().toString(),
            exerciseId,
            exerciseName,
            reps: sessionData.reps,
            sets: sessionData.sets,
            weight: sessionData.weight,
            date: new Date().toISOString(),
        };

        sessions.push(newSession);
        await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));

        return newSession;
    } catch (error) {
        console.error('Error saving session:', error);
        throw error;
    }
};

/**
 * Elimina una sessione
 */
export const deleteSession = async (sessionId: string): Promise<void> => {
    try {
        const sessions = await getSessions();
        const filtered = sessions.filter(s => s.id !== sessionId);
        await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(filtered));
    } catch (error) {
        console.error('Error deleting session:', error);
        throw error;
    }
};

/**
 * Ottiene l'ultima sessione di un esercizio
 */
export const getLastSession = async (exerciseId: string): Promise<Session | null> => {
    try {
        const sessions = await getSessionsByExercise(exerciseId);
        return sessions.length > 0 ? sessions[0] : null;
    } catch (error) {
        console.error('Error getting last session:', error);
        return null;
    }
};

// ==================== UTILITY ====================

/**
 * Resetta tutto (per debug)
 */
export const clearAllData = async (): Promise<void> => {
    try {
        await AsyncStorage.multiRemove([EXERCISES_KEY, SESSIONS_KEY]);
        console.log('All data cleared');
    } catch (error) {
        console.error('Error clearing data:', error);
        throw error;
    }
};

/**
 * Esporta tutti i dati (per backup)
 */
export const exportAllData = async () => {
    try {
        const exercises = await getExercises();
        const sessions = await getSessions();
        return { exercises, sessions };
    } catch (error) {
        console.error('Error exporting data:', error);
        return { exercises: [], sessions: [] };
    }
};
