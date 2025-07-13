
import React, { useState, useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { 
  Calendar, Clock, ExternalLink, Filter, Search, Bookmark, BookmarkCheck, 
  Share2, Eye, TrendingUp, MessageCircle, ThumbsUp, RefreshCw, X,
  ChevronDown, Hash, Users, Play, Bell, BellOff
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  source: 'Karting Australia' | 'Australian Kart Club' | 'General Karting';
  category: 'Race Results' | 'Championship' | 'Technical' | 'Driver News' | 'Event Calendar' | 'Industry News';
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  imageUrl: string;
  isBookmarked: boolean;
  isBreaking?: boolean;
  isTrending?: boolean;
  isPremium?: boolean;
  tags: string[];
  author: string;
  authorAvatar: string;
  readProgress?: number;
}

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Australian Karting Championship Round 5 Results - Spectacular Racing at Eastern Creek',
    excerpt: 'Thrilling battles across all categories as the AKC heads into the final rounds with championship positions still up for grabs. Record attendance and fierce competition.',
    content: 'Full race report...',
    source: 'Karting Australia',
    category: 'Race Results',
    publishedAt: '2024-01-15T10:30:00Z',
    readTime: 4,
    views: 1250,
    likes: 89,
    comments: 23,
    shares: 15,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=300&fit=crop',
    isBookmarked: false,
    isBreaking: true,
    isTrending: true,
    tags: ['AKC', 'Eastern Creek', 'Championship', 'Results'],
    author: 'Mike Thompson',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    readProgress: 65
  },
  {
    id: '2',
    title: 'New Technical Regulations Announced for 2024 Season',
    excerpt: 'Karting Australia releases updated technical specifications focusing on safety improvements and cost reduction initiatives. Major changes to engine specifications.',
    content: 'Technical details...',
    source: 'Karting Australia',
    category: 'Technical',
    publishedAt: '2024-01-14T14:15:00Z',
    readTime: 6,
    views: 890,
    likes: 67,
    comments: 34,
    shares: 22,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop',
    isBookmarked: true,
    isPremium: true,
    isTrending: true,
    tags: ['Regulations', 'Technical', '2024', 'Safety'],
    author: 'Sarah Johnson',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '3',
    title: 'Rising Star: 16-Year-Old Aussie Secures European Karting Deal',
    excerpt: 'Local talent makes the leap to international competition with backing from major Australian sponsors. Exclusive interview with the young champion.',
    content: 'Driver profile...',
    source: 'General Karting',
    category: 'Driver News',
    publishedAt: '2024-01-13T09:45:00Z',
    readTime: 3,
    views: 2100,
    likes: 156,
    comments: 67,
    shares: 43,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=300&fit=crop',
    isBookmarked: false,
    isTrending: true,
    tags: ['Junior Driver', 'Europe', 'Scholarship', 'Interview'],
    author: 'David Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    readProgress: 100
  },
  {
    id: '4',
    title: 'Australian Kart Club Announces State Championship Calendar',
    excerpt: 'Seven rounds across NSW venues with increased prize money and new categories for electric karts. Registration opens next week.',
    content: 'Calendar details...',
    source: 'Australian Kart Club',
    category: 'Event Calendar',
    publishedAt: '2024-01-12T16:20:00Z',
    readTime: 5,
    views: 650,
    likes: 45,
    comments: 12,
    shares: 8,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop',
    isBookmarked: true,
    tags: ['NSW', 'State Championship', 'Electric Karts', 'Calendar'],
    author: 'Rachel Green',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '5',
    title: 'Electric Karting Revolution: Major Manufacturer Partnership Announced',
    excerpt: 'Industry-leading partnership aims to accelerate adoption of electric karting technology across Australian circuits. $2M investment revealed.',
    content: 'Industry news...',
    source: 'General Karting',
    category: 'Industry News',
    publishedAt: '2024-01-11T11:10:00Z',
    readTime: 7,
    views: 1450,
    likes: 98,
    comments: 45,
    shares: 29,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=300&fit=crop',
    isBookmarked: false,
    isPremium: true,
    tags: ['Electric', 'Partnership', 'Technology', 'Investment'],
    author: 'Tom Wilson',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    readProgress: 30
  },
  {
    id: '6',
    title: 'Melbourne Cup Karting Festival Breaks Attendance Records',
    excerpt: 'Three-day festival attracts over 10,000 spectators and 500 competitors from across Australia and New Zealand.',
    content: 'Festival coverage...',
    source: 'Australian Kart Club',
    category: 'Championship',
    publishedAt: '2024-01-10T08:30:00Z',
    readTime: 4,
    views: 1850,
    likes: 234,
    comments: 89,
    shares: 67,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop',
    isBookmarked: false,
    isTrending: true,
    tags: ['Melbourne Cup', 'Festival', 'Records', 'Championship'],
    author: 'Lisa Anderson',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
  }
];

const trendingTopics = [
  { tag: 'AKC Championship', count: 45 },
  { tag: 'Electric Karts', count: 32 },
  { tag: 'Junior Development', count: 28 },
  { tag: 'Technical Updates', count: 24 },
  { tag: 'Safety Regulations', count: 19 }
];

const searchSuggestions = [
  'Australian Karting Championship',
  'Junior karting scholarships',
  'Electric kart technology',
  'Track safety updates',
  'Championship standings',
  'Driver interviews'
];

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(mockNews);
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const sources = ['All', 'Karting Australia', 'Australian Kart Club', 'General Karting'];
  const categories = ['All', 'Race Results', 'Championship', 'Technical', 'Driver News', 'Event Calendar', 'Industry News'];

  const toggleBookmark = (articleId: string) => {
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, isBookmarked: !article.isBookmarked }
        : article
    ));
  };

  const toggleLike = (articleId: string) => {
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, likes: article.likes + 1 }
        : article
    ));
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const filteredArticles = articles.filter(article => {
    const matchesSource = selectedSource === 'All' || article.source === selectedSource;
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesBookmark = !showBookmarked || article.isBookmarked;
    
    return matchesSource && matchesCategory && matchesSearch && matchesBookmark;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Karting Australia': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Australian Kart Club': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 0
  );

  return (
    <AppLayout title="Karting News">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNotifications(!notifications)}
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              {notifications ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
            </Button>
          </div>
          <div className="text-white/60 text-sm">
            {filteredArticles.length} articles
          </div>
        </div>

        {/* Advanced Search */}
        <div className="glass-card p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
            <input
              type="text"
              placeholder="Search news, drivers, events, topics..."
              className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8"
            >
              <Filter className="w-4 h-4" />
            </Button>
            
            {/* Search Suggestions */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg z-50">
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2 text-left text-white/80 hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    <Search className="w-3 h-3 inline mr-2 text-white/40" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="flex flex-wrap gap-3 border-t border-white/10 pt-4">
              <select
                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-red-500/50"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
              >
                {sources.map(source => (
                  <option key={source} value={source} className="bg-gray-900 text-white">
                    {source}
                  </option>
                ))}
              </select>

              <select
                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-red-500/50"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-gray-900 text-white">
                    {category}
                  </option>
                ))}
              </select>

              <Button
                variant={showBookmarked ? "default" : "outline"}
                size="sm"
                onClick={() => setShowBookmarked(!showBookmarked)}
                className="px-3 py-2"
              >
                <Bookmark className="w-4 h-4 mr-1" />
                Bookmarked
              </Button>
            </div>
          )}
        </div>

        {/* Trending Topics */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="w-5 h-5 text-red-400" />
              Trending Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {trendingTopics.map((topic, index) => (
                <button
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-white/80 transition-colors"
                  onClick={() => setSearchQuery(topic.tag)}
                >
                  <Hash className="w-3 h-3" />
                  {topic.tag}
                  <span className="text-white/60">({topic.count})</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Breaking News Banner */}
        {filteredArticles.some(article => article.isBreaking) && (
          <div className="glass-card border-red-500/30 bg-gradient-to-r from-red-500/10 to-pink-500/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 font-semibold text-sm uppercase tracking-wide">Breaking News</span>
            </div>
            {filteredArticles.filter(article => article.isBreaking).map(article => (
              <h3 key={article.id} className="text-white font-medium cursor-pointer hover:text-red-400 transition-colors">
                {article.title}
              </h3>
            ))}
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
              {category !== 'All' && (
                <span className="ml-1 text-xs opacity-60">
                  ({articles.filter(a => a.category === category).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <article className="glass-card overflow-hidden border-l-4 border-l-red-500">
            <div className="relative">
              <img
                src={filteredArticles[0].imageUrl}
                alt={filteredArticles[0].title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  {filteredArticles[0].isBreaking && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      BREAKING
                    </span>
                  )}
                  {filteredArticles[0].isTrending && (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      TRENDING
                    </span>
                  )}
                  {filteredArticles[0].isPremium && (
                    <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold">
                      PREMIUM
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  {filteredArticles[0].title}
                </h2>
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <img
                      src={filteredArticles[0].authorAvatar}
                      alt={filteredArticles[0].author}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{filteredArticles[0].author}</span>
                  </div>
                  <span>{formatDate(filteredArticles[0].publishedAt)}</span>
                  <span>{filteredArticles[0].readTime} min read</span>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* News Articles Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredArticles.slice(1).map((article) => (
            <article key={article.id} className="glass-card hover:bg-white/5 transition-all duration-200 overflow-hidden group">
              <div className="relative">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {article.readProgress && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div 
                      className="h-full bg-red-500 transition-all duration-300"
                      style={{ width: `${article.readProgress}%` }}
                    />
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  {article.isBreaking && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      BREAKING
                    </span>
                  )}
                  {article.isTrending && (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      HOT
                    </span>
                  )}
                  {article.isPremium && (
                    <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold">
                      PREMIUM
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getSourceColor(article.source)}`}>
                    {article.source}
                  </span>
                  <span className="text-white/60 text-xs">
                    {article.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 hover:text-red-400 transition-colors cursor-pointer">
                  {article.title}
                </h3>

                <p className="text-white/70 mb-4 line-clamp-2 text-sm">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={article.authorAvatar}
                    alt={article.author}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="text-white text-sm font-medium">{article.author}</div>
                    <div className="text-white/60 text-xs">{formatDate(article.publishedAt)}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white/5 text-white/60 rounded text-xs hover:bg-white/10 cursor-pointer transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}m</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{article.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{article.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{article.comments}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(article.id);
                      }}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4 text-white/60 hover:text-red-400" />
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(article.id);
                      }}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {article.isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-red-400" />
                      ) : (
                        <Bookmark className="w-4 h-4 text-white/60 hover:text-white" />
                      )}
                    </button>
                    
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4 text-white/60 hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="glass-card p-12 text-center">
            <div className="text-white/40 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
            <p className="text-white/60 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedSource('All');
                setSelectedCategory('All');
                setShowBookmarked(false);
              }}
              variant="outline"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {filteredArticles.length > 0 && (
          <div className="text-center">
            <Button 
              variant="outline" 
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              Load More Articles
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default News;
