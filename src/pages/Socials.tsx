
import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { Users, Trophy, MessageCircle, Share2, UserPlus, Crown, Medal, Award, Zap, TrendingUp, Star, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

const Socials = () => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'friends' | 'feed'>('leaderboard');

  // Mock data for demonstration
  const leaderboardData = [
    { id: 1, name: 'Alex Rodriguez', avatar: '/placeholder.svg', bestTime: '1:23.45', points: 2450, position: 1, change: '+2' },
    { id: 2, name: 'Sarah Chen', avatar: '/placeholder.svg', bestTime: '1:24.12', points: 2380, position: 2, change: '-1' },
    { id: 3, name: 'Mike Thompson', avatar: '/placeholder.svg', bestTime: '1:24.67', points: 2320, position: 3, change: '+1' },
    { id: 4, name: 'Emma Wilson', avatar: '/placeholder.svg', bestTime: '1:25.23', points: 2250, position: 4, change: '0' },
    { id: 5, name: 'David Park', avatar: '/placeholder.svg', bestTime: '1:25.89', points: 2180, position: 5, change: '+3' },
  ];

  const friendsData = [
    { id: 1, name: 'Jake Morrison', avatar: '/placeholder.svg', status: 'online', lastRace: '2 hours ago', mutual: 12 },
    { id: 2, name: 'Lisa Chang', avatar: '/placeholder.svg', status: 'racing', lastRace: 'Racing now', mutual: 8 },
    { id: 3, name: 'Tom Bradley', avatar: '/placeholder.svg', status: 'offline', lastRace: '1 day ago', mutual: 15 },
    { id: 4, name: 'Maria Santos', avatar: '/placeholder.svg', status: 'online', lastRace: '30 min ago', mutual: 6 },
  ];

  const feedData = [
    {
      id: 1,
      user: 'Alex Rodriguez',
      avatar: '/placeholder.svg',
      action: 'set a new personal best',
      details: 'Silverstone Circuit - 1:23.45',
      time: '2 hours ago',
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      user: 'Sarah Chen',
      avatar: '/placeholder.svg',
      action: 'completed a race session',
      details: 'Monaco Street Circuit - 15 laps',
      time: '4 hours ago',
      likes: 18,
      comments: 5
    },
    {
      id: 3,
      user: 'Mike Thompson',
      avatar: '/placeholder.svg',
      action: 'joined the weekly championship',
      details: 'GT Series Championship',
      time: '1 day ago',
      likes: 32,
      comments: 12
    }
  ];

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-300" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-white/60 font-bold">#{position}</span>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'racing': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <AppLayout title="Social Hub">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card p-4 text-center">
            <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">127</div>
            <div className="text-sm text-white/60">Friends</div>
          </div>
          <div className="glass-card p-4 text-center">
            <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">#12</div>
            <div className="text-sm text-white/60">Global Rank</div>
          </div>
          <div className="glass-card p-4 text-center">
            <Zap className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">2,340</div>
            <div className="text-sm text-white/60">Points</div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="glass-card p-1 flex rounded-2xl">
          {[
            { key: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { key: 'friends', label: 'Friends', icon: Users },
            { key: 'feed', label: 'Activity', icon: MessageCircle }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                activeTab === key
                  ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 shadow-racing'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Global Leaderboard</h3>
              <button className="text-red-400 text-sm hover:text-red-300 transition-colors">
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              {leaderboardData.map((racer) => (
                <div key={racer.id} className="glass-card p-4 flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    {getPositionIcon(racer.position)}
                    <Avatar>
                      <AvatarImage src={racer.avatar} />
                      <AvatarFallback>{racer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-semibold text-white">{racer.name}</div>
                    <div className="text-sm text-white/60">Best: {racer.bestTime}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-white">{racer.points}</div>
                    <div className={`text-xs flex items-center gap-1 ${
                      racer.change.startsWith('+') ? 'text-green-400' : 
                      racer.change.startsWith('-') ? 'text-red-400' : 'text-white/60'
                    }`}>
                      {racer.change !== '0' && (
                        <TrendingUp size={12} className={racer.change.startsWith('-') ? 'rotate-180' : ''} />
                      )}
                      {racer.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Your Friends</h3>
              <button className="glass-card px-4 py-2 flex items-center gap-2 text-white hover:bg-white/10 transition-colors">
                <UserPlus size={16} />
                Add Friend
              </button>
            </div>
            
            <div className="space-y-3">
              {friendsData.map((friend) => (
                <div key={friend.id} className="glass-card p-4 flex items-center gap-4">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={friend.avatar} />
                      <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${getStatusColor(friend.status)}`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-semibold text-white">{friend.name}</div>
                    <div className="text-sm text-white/60">{friend.lastRace}</div>
                    <div className="text-xs text-white/40">{friend.mutual} mutual friends</div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="p-2 glass-card hover:bg-white/10 transition-colors">
                      <MessageCircle size={16} className="text-white/60" />
                    </button>
                    <button className="p-2 glass-card hover:bg-white/10 transition-colors">
                      <Share2 size={16} className="text-white/60" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'feed' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Activity Feed</h3>
              <button className="text-red-400 text-sm hover:text-red-300 transition-colors">
                Share Activity
              </button>
            </div>
            
            <div className="space-y-4">
              {feedData.map((activity) => (
                <div key={activity.id} className="glass-card p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar>
                      <AvatarImage src={activity.avatar} />
                      <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="text-white">
                        <span className="font-semibold">{activity.user}</span>
                        <span className="text-white/60"> {activity.action}</span>
                      </div>
                      <div className="text-red-400 font-medium mt-1">{activity.details}</div>
                      <div className="text-xs text-white/40 mt-2">{activity.time}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 pt-3 border-t border-white/10">
                    <button className="flex items-center gap-2 text-white/60 hover:text-red-400 transition-colors">
                      <Heart size={16} />
                      <span className="text-sm">{activity.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-white/60 hover:text-blue-400 transition-colors">
                      <MessageCircle size={16} />
                      <span className="text-sm">{activity.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-white/60 hover:text-green-400 transition-colors">
                      <Share2 size={16} />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Socials;
