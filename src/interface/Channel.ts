import { VideoResponseProps } from "./Video";

export interface ChannelProps {
  id: string;
  name: string;
  logo_url?: string;
  description?: string;
  created_at?: string;
}

export interface ManagmentChannelResponse {
  channelData: ChannelData | undefined;
  videos: VideoResponseProps[] | undefined;
  dashboardData: DashboardData | undefined;
}

export interface ChannelData {
  id: string;
  name: string;
  logo_url: string;
  description: string;
  created_at: string;
  followers: string;
}

export interface ManagmentDashboardData {
  countViews: number;
  countLikes: number;
  countDislikes: number;
  countVideos: number;
}

interface DashboardData {
  countViews: number;
  countLikes: number;
  countDislikes: number;
  countVideos: number;
}
