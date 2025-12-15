export interface Exercise {
    id: string;
    name: string;
    details: string;
    image: string; // URI dell'immagine
    createdAt: string; // ISO date string
}

export interface Session {
    id: string;
    exerciseId: string; // ID dell'esercizio a cui appartiene
    exerciseName: string; // Nome dell'esercizio per riferimento veloce
    reps: number;
    sets: number;
    weight: number;
    date: string; // ISO date string
}

export interface ExerciseWithSessions extends Exercise {
    sessions: Session[];
    lastSession?: Session;
}
