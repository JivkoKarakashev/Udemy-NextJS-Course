interface Message {
    id: number,
    text: string
}

type NewMessage = Omit<Message, 'id'>;

export {
    type Message,
    type NewMessage
}