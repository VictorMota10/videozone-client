export const pathRoutes = {
  NEW_VIDEO_UPLOAD: "/video/new",
  VIDEO_PLAYER: "/player/?video-uuid=",
  MANAGE_CHANNEL: (channel_id: string) => `/manage-channel/${channel_id}`
};
