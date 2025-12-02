import React from 'react';
import { UserRole } from '../types';
import { Card, Button, Badge } from '../components/UIComponents';
import { TrendingUp, Users, DollarSign, Briefcase, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Simple charts using Recharts
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', views: 4000, clicks: 2400 },
  { name: 'Tue', views: 3000, clicks: 1398 },
  { name: 'Wed', views: 2000, clicks: 9800 },
  { name: 'Thu', views: 2780, clicks: 3908 },
  { name: 'Fri', views: 1890, clicks: 4800 },
  { name: 'Sat', views: 2390, clicks: 3800 },
  { name: 'Sun', views: 3490, clicks: 4300 },
];

export const Dashboard: React.FC<{ userRole: UserRole }> = ({ userRole }) => {
  const navigate = useNavigate();

  const StatCard = ({ title, value, icon: Icon, trend }: any) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        </div>
        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className={`mt-4 text-xs font-medium ${trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
        {trend} <span className="text-slate-400 font-normal">from last month</span>
      </div>
    </Card>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <Button onClick={() => navigate('/search')}>
            {userRole === 'brand' ? 'Create Campaign' : 'Find Opportunities'}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Impressions" value="128.5K" icon={TrendingUp} trend="+12.5%" />
        <StatCard title={userRole === 'brand' ? "Active Collaborations" : "Active Jobs"} value="3" icon={Briefcase} trend="+1" />
        <StatCard title="Profile Views" value="2,450" icon={Users} trend="+8.2%" />
        <StatCard title="Earnings / Spent" value="$4,200" icon={DollarSign} trend="+15%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2">
            <Card className="p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-slate-900">Performance Overview</h3>
                    <select className="text-sm border-none bg-slate-50 rounded-md px-2 py-1 text-slate-600 focus:ring-0 cursor-pointer">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                    </select>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>

        {/* Recent Activity / Messages */}
        <div className="lg:col-span-1">
            <Card className="p-0 h-full overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-900">Recent Messages</h3>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/messages')}>View All</Button>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors" onClick={() => navigate('/messages')}>
                            <img src={`https://picsum.photos/seed/${i}/40/40`} className="w-10 h-10 rounded-full object-cover" alt="Avatar" />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <p className="text-sm font-medium text-slate-900 truncate">Sarah Jenkins</p>
                                    <span className="text-xs text-slate-400">2h ago</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate mt-0.5">Looking forward to the draft!</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                    <Button variant="outline" className="w-full text-xs">Start New Chat</Button>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};