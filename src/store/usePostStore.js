import { create } from "zustand";
import { persist } from "zustand/middleware";

// 전역 상태 관리(나이, 시력, 태그, 이미지)
export const usePostStore = create(
  persist(
    (set) => ({
      age: 0,
      vision: 0.0,
      tags: [],
      images: [],
      setAge: (age) => set({ age }),
      setVision: (vision) => set({ vision }),
      setTags: (tags) => set({ tags }),
      setImages: (images) => set({ images }),
    }),
    {
      name: "blinker-storage", 
    }
  )
);
