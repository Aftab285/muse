import { Influencer, Brand, Message } from './types';

export const MOCK_INFLUENCERS: Influencer[] = [
  {
    id: 'inf_1',
    name: 'Sarah Jenkins',
    role: 'influencer',
    avatar: 'https://picsum.photos/seed/sarah/200/200',
    bio: 'Sustainable fashion advocate living in Brooklyn. I help ethical brands tell their stories through cinematic reels and honest reviews.',
    location: 'New York, NY',
    niches: ['Fashion', 'Sustainability', 'Lifestyle'],
    metrics: {
      followers: 45000,
      engagementRate: 4.2,
      avgLikes: 1800,
    },
    portfolio: [
      'https://picsum.photos/seed/fashion1/400/500',
      'https://picsum.photos/seed/fashion2/400/500',
      'https://picsum.photos/seed/fashion3/400/500',
    ],
    priceRange: { min: 200, max: 800 },
    rating: 4.8,
    reviews: [
      { id: 'r1', authorId: 'b_1', authorName: 'EcoWear', rating: 5, comment: 'Sarah was amazing to work with! High quality content.', date: '2023-10-15' },
    ]
  },
  {
    id: 'inf_2',
    name: 'Davide Russo',
    role: 'influencer',
    avatar: 'https://picsum.photos/seed/davide/200/200',
    bio: 'Tech reviewer and minimal desk setup enthusiast. Simplifying gadget complexity for the everyday user.',
    location: 'San Francisco, CA',
    niches: ['Tech', 'Productivity', 'Design'],
    metrics: {
      followers: 120000,
      engagementRate: 2.8,
      avgLikes: 3500,
    },
    portfolio: [
      'https://picsum.photos/seed/tech1/400/500',
      'https://picsum.photos/seed/tech2/400/500',
    ],
    priceRange: { min: 500, max: 2000 },
    rating: 4.5,
    reviews: []
  },
  {
    id: 'inf_3',
    name: 'Elena Costa',
    role: 'influencer',
    avatar: 'https://picsum.photos/seed/elena/200/200',
    bio: 'Plant-based chef and yoga instructor. Sharing recipes that nourish the soul.',
    location: 'Austin, TX',
    niches: ['Food', 'Wellness', 'Fitness'],
    metrics: {
      followers: 85000,
      engagementRate: 5.5,
      avgLikes: 4200,
    },
    portfolio: [
      'https://picsum.photos/seed/food1/400/500',
      'https://picsum.photos/seed/food2/400/500',
      'https://picsum.photos/seed/food3/400/500',
    ],
    priceRange: { min: 300, max: 1200 },
    rating: 4.9,
    reviews: []
  },
  {
    id: 'inf_4',
    name: 'Marcus Chen',
    role: 'influencer',
    avatar: 'https://picsum.photos/seed/marcus/200/200',
    bio: 'Streetwear photographer and urban explorer. Capturing the city pulse.',
    location: 'Toronto, ON',
    niches: ['Photography', 'Streetwear', 'Travel'],
    metrics: {
      followers: 22000,
      engagementRate: 8.1,
      avgLikes: 1900,
    },
    portfolio: [
      'https://picsum.photos/seed/street1/400/500',
      'https://picsum.photos/seed/street2/400/500',
    ],
    priceRange: { min: 150, max: 600 },
    rating: 4.7,
    reviews: []
  }
];

export const MOCK_BRANDS: Brand[] = [
  {
    id: 'b_1',
    name: 'EcoWear',
    role: 'brand',
    avatar: 'https://picsum.photos/seed/ecowear/200/200',
    industry: 'Fashion',
    website: 'www.ecowear.com',
    location: 'Portland, OR',
    activeCampaigns: 2,
    bio: 'Sustainable clothing for the modern adventurer.'
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    senderId: 'inf_1',
    receiverId: 'b_1',
    content: 'Hi! I loved your recent collection. Are you open to collaborations?',
    timestamp: new Date(Date.now() - 86400000 * 2),
    read: true,
  },
  {
    id: 'm2',
    senderId: 'b_1',
    receiverId: 'inf_1',
    content: 'Hey Sarah! Yes, we actually have a summer campaign coming up. Your profile looks perfect.',
    timestamp: new Date(Date.now() - 86400000 * 1.9),
    read: true,
  },
  {
    id: 'm3',
    senderId: 'inf_1',
    receiverId: 'b_1',
    content: 'That sounds exciting! Could you send over the brief?',
    timestamp: new Date(Date.now() - 3600000),
    read: true,
  }
];