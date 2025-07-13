
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { 
  ArrowLeft, Calendar, Clock, Eye, ThumbsUp, MessageCircle, Share2, 
  Bookmark, BookmarkCheck, User, Tag
} from 'lucide-react';
import { Button } from '../components/ui/button';

// Mock news data (in a real app, this would come from an API)
const mockNewsData = {
  '1': {
    id: '1',
    title: 'Australian Karting Championship Round 5 Results - Spectacular Racing at Eastern Creek',
    content: `
      <p>The Australian Karting Championship delivered another thrilling weekend of racing at Eastern Creek Raceway, with spectacular battles across all categories keeping spectators on the edge of their seats.</p>
      
      <h2>Championship Standings Shake-Up</h2>
      <p>With only two rounds remaining in the championship, the title fights in multiple categories remain wide open. The KA2 Senior category saw a dramatic change at the top, with defending champion Jake Morrison extending his lead after a dominant weekend performance.</p>
      
      <p>"The car felt absolutely perfect today," Morrison commented after his feature race victory. "The team has worked incredibly hard to get the setup right, and it's paying off when it matters most."</p>
      
      <h2>Record Attendance</h2>
      <p>Eastern Creek Raceway welcomed a record crowd of over 8,000 spectators across the weekend, demonstrating the growing popularity of karting in Australia. The atmosphere was electric, with families and motorsport enthusiasts alike enjoying the close-quarters racing action.</p>
      
      <h2>Junior Categories Shine</h2>
      <p>The junior categories once again provided some of the most exciting racing of the weekend. The KA4 Junior Light category saw five different leaders throughout the 20-lap feature race, with 16-year-old Sarah Chen ultimately taking victory in a thrilling last-lap battle.</p>
      
      <p>"This is what karting is all about," said Chen after her victory. "Close racing, great competition, and having fun while doing what we love. I can't wait for the next round."</p>
      
      <h2>Looking Ahead</h2>
      <p>The championship now moves to Queensland Raceway for Round 6, scheduled for March 15-17. With championship positions still up for grabs in most categories, the penultimate round promises to deliver even more excitement.</p>
      
      <p>Tickets for Queensland Raceway are now available through the Karting Australia website, with early bird pricing available until February 28th.</p>
    `,
    author: 'Mike Thompson',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    publishedAt: '2024-01-15T10:30:00Z',
    readTime: 4,
    views: 1250,
    likes: 89,
    comments: 23,
    shares: 15,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=400&fit=crop',
    source: 'Karting Australia',
    category: 'Race Results',
    tags: ['AKC', 'Eastern Creek', 'Championship', 'Results'],
    isBookmarked: false
  },
  // Add more mock articles as needed
};

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = mockNewsData[id as keyof typeof mockNewsData];

  if (!article) {
    return (
      <AppLayout title="Article Not Found">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
          <Button onClick={() => navigate('/news')} variant="outline">
            Back to News
          </Button>
        </div>
      </AppLayout>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <AppLayout title="News">
      <article className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/news')}
          className="mb-6 text-white/70 hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to News
        </Button>

        {/* Article Header */}
        <div className="glass-card overflow-hidden mb-6">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-sm font-medium">
                {article.source}
              </span>
              <span className="text-white/60 text-sm">{article.category}</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-white/60 text-sm mb-4">
              <div className="flex items-center gap-2">
                <img
                  src={article.authorAvatar}
                  alt={article.author}
                  className="w-8 h-8 rounded-full"
                />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} min read</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-white/60 text-sm">
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
          </div>
        </div>

        {/* Article Content */}
        <div className="glass-card p-6 mb-6">
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              lineHeight: '1.7',
              fontSize: '16px'
            }}
          />
        </div>

        {/* Tags */}
        <div className="glass-card p-6 mb-6">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-white/5 text-white/70 rounded-full text-sm hover:bg-white/10 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                <ThumbsUp className="w-4 h-4 mr-1" />
                Like ({article.likes})
              </Button>
              
              <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                <MessageCircle className="w-4 h-4 mr-1" />
                Comment ({article.comments})
              </Button>
              
              <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
            
            <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
              {article.isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 mr-1 text-red-400" />
              ) : (
                <Bookmark className="w-4 h-4 mr-1" />
              )}
              Bookmark
            </Button>
          </div>
        </div>
      </article>
    </AppLayout>
  );
};

export default NewsDetail;
