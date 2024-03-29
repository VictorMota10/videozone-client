export const pathRoutes = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  NEW_VIDEO_UPLOAD: (channel_id: string) => `/${channel_id}/video/new`,
  VIDEO_PLAYER: "/video/",
  MANAGE_CHANNEL: (channel_id: string) => `/manage-channel/${channel_id}`,
  SESSION: {
    new: (video_uuid: string) => `/session/new/${video_uuid}`,
    player: (session_uuid: string) => `/session/${session_uuid}`,
  },
};
