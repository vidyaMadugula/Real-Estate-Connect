// import {create} from "zustand";
// import apiRequest from "./apiRequest";


// export const useNotificationStore = create((set) => ({
//   number: 0,
//   fetch: async () => {
//     try {
//       console.log("Making request to /api/users/notification");
//       const res = await apiRequest.get("/api/users/notification");
//       console.log("Notification response:", res.data);
//     } catch (error) {
//       console.error("Notification fetch failed:", error);
//     }
//   },
//   decrease: () => set((prev) => ({ number: prev.number - 1 })),
//   reset: () => set({ number: 0 }),
// }));


import { create } from "zustand";
import apiRequest from "./apiRequest";

export const useNotificationStore = create((set) => ({
  number: 0,
  fetch: async () => {
    const res = await apiRequest.get("/users/notification", { withCredentials: true });
    set({ number: res.data });
  },
  decrease: () => {
    set((prev) => ({ number: prev.number - 1 }));
  },
  reset: () => {
    set({ number: 0 });
  },
}));
