import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

import type { ModalStore } from "../types/modalStore.tsx";

const store: StateCreator<ModalStore> = (set) => ({
    state: 'closed',
    toggleModal: () => set((state) => ({ state: state.state === 'closed' ? 'open' : 'closed' }))
});

const useModalStore =
    import.meta.env.DEV
        ? create(devtools(store, { name: 'ModalStore' }))
        : create(store);

export {
    useModalStore
}