
import { Car, Zap, Trophy, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-3/4 left-1/6 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto animate-fade-in">
        {/* Enhanced Main App Preview Card */}
        <div className="glass-card-intense p-8 text-center space-y-6">
          {/* App Icon & Title with enhanced styling */}
          <div className="space-y-4">
            <div className="relative mx-auto w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-racing animate-racing-pulse">
              <Car className="w-10 h-10 text-white" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient-racing mb-2">
                KartMate
              </h1>
              <p className="text-white/80 text-sm">
                Professional karting companion for Australia
              </p>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs font-medium">
                  Ready to Race
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Feature Preview Cards */}
          <div className="space-y-3">
            <div className="glass-card p-4 hover-lift group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white font-medium text-sm">Session Tracking</h3>
                  <p className="text-white/60 text-xs">Professional lap time analysis</p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" />
              </div>
            </div>

            <div className="glass-card p-4 hover-lift group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <Zap className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white font-medium text-sm">Kart Management</h3>
                  <p className="text-white/60 text-xs">Setup optimization & maintenance</p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" />
              </div>
            </div>

            <div className="glass-card p-4 hover-lift group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white font-medium text-sm">Track Database</h3>
                  <p className="text-white/60 text-xs">Australian circuits & weather</p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" />
              </div>
            </div>
          </div>

          {/* Enhanced Action Button */}
          <Link 
            to="/login"
            className="ios-button-racing w-full flex items-center justify-center space-x-2 group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Enhanced Status */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-xs font-medium">
                Beta Version - Full Featured
              </span>
            </div>
            <p className="text-white/60 text-xs">
              iOS 16 Liquid Glass Design ✨
            </p>
          </div>
        </div>

        {/* Enhanced Bottom note */}
        <div className="mt-6 text-center">
          <p className="text-white/40 text-xs">
            Built for Australian karting enthusiasts
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
