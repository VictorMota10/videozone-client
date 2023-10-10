export interface VideoResponseProps {
  video_url: string;
  thumbnail_url: string;
  create_at: string;
  views: string;
  likes: string;
  dislikes: string;
  title: string;
  video_uuid_firebase: string;
  logo_url: string;
  tag_name: string;
  description: string;
  author?: string;
  channel_logo?: string
}

export interface UploadVideoPayload {
  video_url: string
  thumbnail_url: string
  created_at: string
  title: string
  description: string
  channel_id: string
  video_uuid_firebase: string
  videoFile?: any
  thumbFile?: any
}
