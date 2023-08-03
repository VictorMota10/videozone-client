export interface NewChannelModalProps  {
    open: boolean
    onCancel: () => void
}

export interface CreateChannelPayload {
    name: string
    description?: string
}