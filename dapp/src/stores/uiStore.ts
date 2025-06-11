import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { UIState, Notification } from "../types/store";

interface UIStore extends UIState {
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;

  // Notification methods
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp">
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        sidebarOpen: false,
        theme: "system",
        notifications: [],

        // Actions
        toggleSidebar: () =>
          set(
            (state) => ({ sidebarOpen: !state.sidebarOpen }),
            false,
            "ui/toggleSidebar"
          ),

        setSidebarOpen: (open) =>
          set({ sidebarOpen: open }, false, "ui/setSidebarOpen"),

        setTheme: (theme) => set({ theme }, false, "ui/setTheme"),

        addNotification: (notification) => {
          const id = `notification-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;
          const newNotification: Notification = {
            ...notification,
            id,
            timestamp: Date.now(),
          };

          set(
            (state) => ({
              notifications: [...state.notifications, newNotification],
            }),
            false,
            "ui/addNotification"
          );

          // Auto-remove notification after duration
          if (notification.duration !== 0) {
            const duration = notification.duration || 5000;
            setTimeout(() => {
              get().removeNotification(id);
            }, duration);
          }
        },

        removeNotification: (id) =>
          set(
            (state) => ({
              notifications: state.notifications.filter((n) => n.id !== id),
            }),
            false,
            "ui/removeNotification"
          ),

        clearNotifications: () =>
          set({ notifications: [] }, false, "ui/clearNotifications"),
      }),
      {
        name: "ui-store",
        partialize: (state) => ({
          sidebarOpen: state.sidebarOpen,
          theme: state.theme,
        }),
      }
    ),
    {
      name: "ui-store",
    }
  )
);
