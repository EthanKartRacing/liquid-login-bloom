
import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { Calendar, Clock, ExternalLink, Filter, Search, Bookmark, BookmarkCheck, Share2, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';

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
  imageUrl: string;
  isBookmarked: boolean;
  isBreaking?: boolean;
  tags: string[];
}

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Australian Karting Championship Round 5 Results - Spectacular Racing at Eastern Creek',
    excerpt: 'Thrilling battles across all categories as the AKC heads into the final rounds with championship positions still up for grabs.',
    content: 'Full race report...',
    source: 'Karting Australia',
    category: 'Race Results',
    publishedAt: '2024-01-15T10:30:00Z',
    readTime: 4,
    views: 1250,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
    isBookmarked: false,
    isBreaking: true,
    tags: ['AKC', 'Eastern Creek', 'Championship']
  },
  {
    id: '2',
    title: 'New Technical Regulations Announced for 2024 Season',
    excerpt: 'Karting Australia releases updated technical specifications focusing on safety improvements and cost reduction initiatives.',
    content: 'Technical details...',
    source: 'Karting Australia',
    category: 'Technical',
    publishedAt: '2024-01-14T14:15:00Z',
    readTime: 6,
    views: 890,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
    isBookmarked: true,
    tags: ['Regulations', 'Technical', '2024']
  },
  {
    id: '3',
    title: 'Rising Star: 16-Year-Old Aussie Secures European Karting Deal',
    excerpt: 'Local talent makes the leap to international competition with backing from major Australian sponsors.',
    content: 'Driver profile...',
    source: 'General Karting',
    category: 'Driver News',
    publishedAt: '2024-01-13T09:45:00Z',
    readTime: 3,
    views: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
    isBookmarked: false,
    tags: ['Junior Driver', 'Europe', 'Scholarship']
  },
  {
    id: '4',
    title: 'Australian Kart Club Announces State Championship Calendar',
    excerpt: 'Seven rounds across NSW venues with increased prize money and new categories for electric karts.',
    content: 'Calendar details...',
    source: 'Australian Kart Club',
    category: 'Event Calendar',
    publishedAt: '2024-01-12T16:20:00Z',
    readTime: 5,
    views: 650,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
    isBookmarked: true,
    tags: ['NSW', 'State Championship', 'Electric Karts']
  },
  {
    id: '5',
    title: 'Electric Karting Revolution: Major Manufacturer Partnership Announced',
    excerpt: 'Industry-leading partnership aims to accelerate adoption of electric karting technology across Australian circuits.',
    content: 'Industry news...',
    source: 'General Karting',
    category: 'Industry News',
    publishedAt: '2024-01-11T11:10:00Z',
    readTime: 7,
    views: 1450,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
    isBookmarked: false,
    tags: ['Electric', 'Partnership', 'Technology']
  }
];

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(mockNews);
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookmarked, setShowBookmarked] = useState(false);

  const sources = ['All', 'Karting Australia', 'Australian Kart Club', 'General Karting'];
  const categories = ['All', 'Race Results', 'Championship', 'Technical', 'Driver News', 'Event Calendar', 'Industry News'];

  const toggleBookmark = (articleId: string) => {
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, isBookmarked: !article.isBookmarked }
        : article
    ));
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
    return date.toLocaleDateString('en-AU', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Karting Australia': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Australian Kart Club': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <AppLayout title="Karting News">
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="glass-card p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
            <input
              type="text"
              placeholder="Search news, drivers, events..."
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3">
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
        </div>

        {/* Breaking News Banner */}
        {filteredArticles.some(article => article.isBreaking) && (
          <div className="glass-card border-red-500/30 bg-gradient-to-r from-red-500/10 to-pink-500/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 font-semibold text-sm uppercase tracking-wide">Breaking News</span>
            </div>
            {filteredArticles.filter(article => article.isBreaking).map(article => (
              <h3 key={article.id} className="text-white font-medium">
                {article.title}
              </h3>
            ))}
          </div>
        )}

        {/* News Articles */}
        <div className="space-y-4">
          {filteredArticles.map((article, index) => (
            <article key={article.id} className={`glass-card hover:bg-white/5 transition-all duration-200 overflow-hidden ${
              index === 0 ? 'border-l-4 border-l-red-500' : ''
            }`}>
              <div className="md:flex">
                <div className="md:w-1/3 relative">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                  {article.isBreaking && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      BREAKING
                    </div>
                  )}
                </div>
                
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getSourceColor(article.source)}`}>
                        {article.source}
                      </span>
                      <span className="text-white/60 text-xs">
                        {article.category}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-red-400 transition-colors cursor-pointer">
                      {article.title}
                    </h2>

                    <p className="text-white/70 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-white/5 text-white/60 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-white/60 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime} min read</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleBookmark(article.id)}
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
                      
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4 text-white/60 hover:text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="glass-card p-8 text-center">
            <div className="text-white/40 mb-2">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-white font-medium mb-2">No articles found</h3>
            <p className="text-white/60 text-sm">
              Try adjusting your search terms or filters
            </p>
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
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default News;
