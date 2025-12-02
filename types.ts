export type UserRole = 'brand' | 'influencer' | 'guest';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
  bio?: string;
  location?: string;
}

export interface Influencer extends User {
  role: 'influencer';
  niches: string[];
  metrics: {
    followers: number;
    engagementRate: number;
    avgLikes: number;
  };
  portfolio: string[]; // URLs to images
  priceRange: {
    min: number;
    max: number;
  };
  rating: number;
  reviews: Review[];
}

export interface Brand extends User {
  role: 'brand';
  industry: string;
  website: string;
  activeCampaigns: number;
}

export interface Review {
  id: string;
  authorId: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface ChatSession {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: Message;
  unreadCount: number;
}