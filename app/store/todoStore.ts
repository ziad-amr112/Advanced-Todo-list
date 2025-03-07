import { create } from "zustand";
import { ITodos } from "@/interfaces";
import { getTodo } from "@/actions/todoActions";

interface TodoStore {
  todos: ITodos[];
  totalTodos: number;
  setTodos: (todos: ITodos[]) => void;
  setTotalTodos: (total: number) => void;
  fetchTodos: (userId: string | null, page: number) => Promise<void>;
  addTodoUI: (todo: ITodos) => void;
  updateTodoUI: (updatedTodo: ITodos) => void;
  deleteTodoUI: (id: string) => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  totalTodos: 0,

  setTodos: (todos) => set({ todos }),

  setTotalTodos: (total) => set({ totalTodos: total }),

  fetchTodos: async (userId, page) => {
    const { todos, totalTodos } = await getTodo({ userId: userId ?? null, page });
    set({ 
      todos,
      totalTodos 
    });
  },

  addTodoUI: (todo) => {
    set((state) => {
      const updatedTodos = [todo, ...state.todos]; 
      return { todos: updatedTodos };
    });
  },

  updateTodoUI: (updatedTodo) => {
    set((state) => {
      const updatedTodos = state.todos
        .map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
      return { todos: updatedTodos };
    });
  },

  deleteTodoUI: (id) => {
    set((state) => {
      const updatedTodos = state.todos
        .filter((todo) => todo.id !== id);
      return { todos: updatedTodos };
    });
  },
}));
