export interface ITodos {
    id?: string;
    title: string;
    body: string | null;
    completed: boolean;
    priority?: "HIGH" | "MEDIUM" | "LOW" | undefined; 
    createdAt?: Date;
}