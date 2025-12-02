import React from 'react';
import { MOCK_INFLUENCERS } from '../constants';
import { Button, Card, Badge, RatingStars } from '../components/UIComponents';
import { MapPin, Instagram, Youtube, Twitter, MessageSquare, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  // Hardcoded to first influencer for prototype
  const profile = MOCK_INFLUENCERS[0];
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-slate-200 to-slate-300"></div>
        <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-16 mb-6">
                <div className="flex items-end gap-6">
                    <img src={profile.avatar} alt={profile.name} className="w-32 h-32 rounded-xl border-4 border-white shadow-md object-cover bg-white" />
                    <div className="mb-2">
                        <h1 className="text-3xl font-bold text-slate-900">{profile.name}</h1>
                        <div className="flex items-center text-slate-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {profile.location}
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 mb-2">
                    <Button variant="secondary" icon={Heart} className="w-10 px-0"></Button>
                    <Button onClick={() => navigate('/messages')}>Contact Creator</Button>
                </div>
            </div>

            <p className="text-slate-600 max-w-2xl text-lg leading-relaxed mb-6">
                {profile.bio}
            </p>

            <div className="flex gap-2">
                {profile.niches.map(n => <Badge key={n}>{n}</Badge>)}
            </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Left Col: Stats & Info */}
         <div className="space-y-6">
            <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Audience Metrics</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-slate-500">Followers</span>
                        <span className="font-bold text-slate-900">{(profile.metrics.followers/1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-slate-500">Engagement</span>
                        <span className="font-bold text-emerald-600">{profile.metrics.engagementRate}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-slate-500">Avg. Likes</span>
                        <span className="font-bold text-slate-900">{(profile.metrics.avgLikes/1000).toFixed(1)}k</span>
                    </div>
                </div>
                <div className="flex gap-4 mt-6 justify-center">
                    <div className="p-2 bg-slate-50 rounded-full text-slate-600"><Instagram className="w-5 h-5"/></div>
                    <div className="p-2 bg-slate-50 rounded-full text-slate-600"><Youtube className="w-5 h-5"/></div>
                    <div className="p-2 bg-slate-50 rounded-full text-slate-600"><Twitter className="w-5 h-5"/></div>
                </div>
            </Card>
            
            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                     <h3 className="font-semibold text-slate-900">Reviews</h3>
                     <div className="flex items-center gap-1">
                        <span className="font-bold text-slate-900">{profile.rating}</span>
                        <RatingStars rating={profile.rating} />
                     </div>
                </div>
                <div className="space-y-4">
                    {profile.reviews.map(r => (
                        <div key={r.id} className="text-sm">
                            <div className="flex justify-between mb-1">
                                <span className="font-medium text-slate-900">{r.authorName}</span>
                                <span className="text-slate-400 text-xs">{r.date}</span>
                            </div>
                            <RatingStars rating={r.rating} />
                            <p className="text-slate-600 mt-1 italic">"{r.comment}"</p>
                        </div>
                    ))}
                    {profile.reviews.length === 0 && <p className="text-sm text-slate-400">No reviews yet.</p>}
                </div>
            </Card>
         </div>

         {/* Right Col: Portfolio */}
         <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Featured Content</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {profile.portfolio.map((img, i) => (
                        <div key={i} className="aspect-[4/5] rounded-lg overflow-hidden relative group cursor-pointer">
                            <img src={img} alt="Portfolio" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                        </div>
                    ))}
                    <div className="aspect-[4/5] rounded-lg bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors cursor-pointer">
                        <span className="text-sm font-medium">View Full Portfolio</span>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Packages</h3>
                <div className="space-y-3">
                    <div className="p-4 border border-slate-200 rounded-lg hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors cursor-pointer flex justify-between items-center">
                        <div>
                            <p className="font-medium text-slate-900">Single Post + Story</p>
                            <p className="text-sm text-slate-500">High res photo, tag, and 3-frame story.</p>
                        </div>
                        <span className="font-bold text-slate-900">$350</span>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors cursor-pointer flex justify-between items-center">
                        <div>
                            <p className="font-medium text-slate-900">Reel Creation</p>
                            <p className="text-sm text-slate-500">30-60s edited vertical video with music.</p>
                        </div>
                        <span className="font-bold text-slate-900">$600</span>
                    </div>
                </div>
            </Card>
         </div>
      </div>
    </div>
  );
};