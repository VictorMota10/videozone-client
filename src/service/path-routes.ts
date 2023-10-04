export const pathRoutes = {
  HOME: '/',
  NEW_VIDEO_UPLOAD: (channel_id: string) => `/${channel_id}/video/new`,
  VIDEO_PLAYER: "/video/",
  MANAGE_CHANNEL: (channel_id: string) => `/manage-channel/${channel_id}`,
};
