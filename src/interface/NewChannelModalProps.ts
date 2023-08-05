export interface NewChannelModalProps  {
    open: boolean
    onCancel: () => void
    handleRefreshChannels: () => void
}

export interface CreateChannelPayload {
    name: string
    description?: string
}