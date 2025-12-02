import React, { useState } from 'react';
import { Search as SearchIcon, Filter, MapPin, Heart, Sparkles, X } from 'lucide-react';
import { Card, Button, Badge, RatingStars, Input } from '../components/UIComponents';
import { MOCK_INFLUENCERS } from '../constants';
import { Influencer } from '../types';
import { useNavigate } from 'react-router-dom';
import { smartMatchInfluencers } from '../services/geminiService';

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Influencer[]>(MOCK_INFLUENCERS);
  const [isMatching, setIsMatching] = useState(false);
  const [smartMode, setSmartMode] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) {
      setResults(MOCK_INFLUENCERS);
      return;
    }

    if (smartMode) {
        handleSmartSearch();
    } else {
        // Basic Filter
        const filtered = MOCK_INFLUENCERS.filter(inf => 
            inf.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            inf.niches.some(n => n.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setResults(filtered);
    }
  };

  const handleSmartSearch = async () => {
    setIsMatching(true);
    const ids = await smartMatchInfluencers(searchTerm);
    if (ids.length > 0) {
        const matched = MOCK_INFLUENCERS.filter(inf => ids.includes(inf.id));
        setResults(matched);
    } else {
        setResults([]);
    }
    setIsMatching(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Discover Creators</h1>
        <div className="flex gap-2">
            <Button variant="outline" icon={Filter}>Filters</Button>
            <Button 
                variant={smartMode ? "primary" : "outline"} 
                icon={Sparkles}
                onClick={() => setSmartMode(!smartMode)}
                className={smartMode ? "bg-gradient-to-r from-indigo-500 to-violet-500 border-none text-white" : ""}
            >
                AI Match
            </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card className={`p-2 ${smartMode ? 'ring-2 ring-indigo-100 border-indigo-200' : ''}`}>
        <form onSubmit={handleSearch} className="flex items-center">
            <SearchIcon className={`w-5 h-5 ml-3 ${smartMode ? 'text-indigo-500' : 'text-slate-400'}`} />
            <input 
                type="text"
                className="flex-1 h-12 px-4 focus:outline-none text-slate-900 placeholder:text-slate-400 bg-transparent"
                placeholder={smartMode ? "Describe your campaign (e.g. 'Looking for a vegan chef in Austin for under $1k')..." : "Search by name, niche, or location..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <button type="button" onClick={() => {setSearchTerm(''); setResults(MOCK_INFLUENCERS)}} className="p-2 text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                </button>
            )}
            <Button type="submit" disabled={isMatching} className="mr-1">
                {isMatching ? 'Thinking...' : 'Search'}
            </Button>
        </form>
      </Card>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((inf) => (
            <Card key={inf.id} className="overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
                <div onClick={() => navigate('/profile')}>
                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                        <img 
                            src={inf.portfolio[0] || inf.avatar} 
                            alt={inf.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-slate-900 shadow-sm">
                            ${inf.priceRange.min} - ${inf.priceRange.max}
                        </div>
                    </div>
                    
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">{inf.name}</h3>
                                <div className="flex items-center text-xs text-slate-500 mt-0.5">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {inf.location}
                                </div>
                            </div>
                            <div className="text-right">
                                <RatingStars rating={inf.rating} />
                            </div>
                        </div>

                        <p className="text-sm text-slate-600 line-clamp-2 mb-4 h-10">
                            {inf.bio}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {inf.niches.slice(0, 3).map(n => (
                                <Badge key={n} variant="neutral">{n}</Badge>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="text-center">
                                <p className="text-xs text-slate-500 uppercase font-semibold">Followers</p>
                                <p className="font-bold text-slate-900">{(inf.metrics.followers / 1000).toFixed(1)}k</p>
                            </div>
                            <div className="text-center border-l border-slate-100 pl-4">
                                <p className="text-xs text-slate-500 uppercase font-semibold">Eng. Rate</p>
                                <p className="font-bold text-slate-900">{inf.metrics.engagementRate}%</p>
                            </div>
                            <div className="text-center border-l border-slate-100 pl-4">
                                <p className="text-xs text-slate-500 uppercase font-semibold">Avg Likes</p>
                                <p className="font-bold text-slate-900">{(inf.metrics.avgLikes / 1000).toFixed(1)}k</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        ))}
        {results.length === 0 && (
            <div className="col-span-full py-20 text-center">
                <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
                    <SearchIcon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No results found</h3>
                <p className="text-slate-500">Try adjusting your filters or search terms.</p>
            </div>
        )}
      </div>
    </div>
  );
};