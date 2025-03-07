export interface ITodos {
    id?: string;
    title: string;
    body: string | null;
    completed: boolean;
    userId?:string | null;
    priority?: "HIGH" | "MEDIUM" | "LOW" | undefined; 
    createdAt?: Date;
}