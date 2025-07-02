
import { Car, Zap, Trophy, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto animate-fade-in">
        {/* Main App Preview Card */}
        <div className="glass-card-intense p-8 text-center space-y-6">
          {/* App Icon & Title */}
          <div className="space-y-4">
            <div className="relative mx-auto w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-racing animate-racing-pulse">
              <Car className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient-racing mb-2">
                KartMate
              </h1>
              <p className="text-white/80 text-sm">
                Your karting companion for iOS
              </p>
            </div>
          </div>

          {/* Feature Preview Cards */}
          <div className="space-y-3">
            <div className="glass-card p-4 hover-lift">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white font-medium text-sm">Session Tracking</h3>
                  <p className="text-white/60 text-xs">Log lap times & performance</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-4 hover-lift">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white font-medium text-sm">Kart Setups</h3>
                  <p className="text-white/60 text-xs">Manage configurations</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-4 hover-lift">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white font-medium text-sm">Track Records</h3>
                  <p className="text-white/60 text-xs">Australian karting tracks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-xs font-medium">
                Building Phase 1: Design System
              </span>
            </div>
            <p className="text-white/60 text-xs mt-2">
              iOS 16 Liquid Glass Theme ✨
            </p>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-6 text-center">
          <p className="text-white/40 text-xs">
            Next: Authentication & Core Features
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
