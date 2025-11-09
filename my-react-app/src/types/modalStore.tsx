interface ModalStore {
    state: 'closed' | 'open',
    toggleModal: () => void
}

export {
    type ModalStore
}