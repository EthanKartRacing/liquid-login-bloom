
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Bell, 
  Shield, 
  Smartphone, 
  Database, 
  HelpCircle, 
  LogOut,
  Timer,
  Gauge,
  MapPin,
  Camera,
  Wifi,
  Battery
} from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    autoLapTimer: true,
    voiceAlerts: false,
    dataSync: true,
    locationServices: true,
    cameraAccess: true,
    batteryOptimization: false,
    offlineMode: false
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const settingsGroups = [
    {
      title: "Profile",
      icon: User,
      items: [
        { label: "Edit Profile", type: "button", action: () => console.log("Edit profile") },
        { label: "Driver License", type: "input", placeholder: "License Number" },
        { label: "Racing Category", type: "input", placeholder: "e.g., Senior, Junior" },
      ]
    },
    {
      title: "Race Settings",
      icon: Timer,
      items: [
        { label: "Auto Lap Timer", type: "toggle", key: "autoLapTimer" },
        { label: "Voice Alerts", type: "toggle", key: "voiceAlerts" },
        { label: "Default Track", type: "input", placeholder: "Select default track" },
        { label: "Preferred Kart", type: "input", placeholder: "Kart number or type" },
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { label: "Push Notifications", type: "toggle", key: "notifications" },
        { label: "Race Reminders", type: "toggle", key: "notifications" },
        { label: "Best Lap Alerts", type: "toggle", key: "notifications" },
        { label: "Weather Updates", type: "toggle", key: "notifications" },
      ]
    },
    {
      title: "Data & Sync",
      icon: Database,
      items: [
        { label: "Auto Sync", type: "toggle", key: "dataSync" },
        { label: "Offline Mode", type: "toggle", key: "offlineMode" },
        { label: "Export Data", type: "button", action: () => console.log("Export data") },
        { label: "Import Data", type: "button", action: () => console.log("Import data") },
      ]
    },
    {
      title: "Permissions",
      icon: Shield,
      items: [
        { label: "Location Services", type: "toggle", key: "locationServices" },
        { label: "Camera Access", type: "toggle", key: "cameraAccess" },
        { label: "Microphone", type: "toggle", key: "voiceAlerts" },
      ]
    },
    {
      title: "Device",
      icon: Smartphone,
      items: [
        { label: "Battery Optimization", type: "toggle", key: "batteryOptimization" },
        { label: "WiFi Sync Only", type: "toggle", key: "offlineMode" },
        { label: "Storage Usage", type: "button", action: () => console.log("Storage info") },
      ]
    }
  ];

  return (
    <AppLayout title="Settings">
      <div className="space-y-6">
        {/* User Profile Card */}
        <Card className="glass-card border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center">
                <User className="h-8 w-8 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">John Racer</h3>
                <p className="text-white/60">Professional Driver</p>
                <p className="text-white/40 text-sm">Member since 2024</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-white/20 text-white hover:bg-white/5"
              >
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <Card key={groupIndex} className="glass-card border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20">
                  <group.icon className="h-5 w-5 text-red-400" />
                </div>
                {group.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div className="flex items-center justify-between">
                    <Label className="text-white/80 font-medium">
                      {item.label}
                    </Label>
                    {item.type === 'toggle' && (
                      <Switch
                        checked={settings[item.key as keyof typeof settings]}
                        onCheckedChange={() => item.key && toggleSetting(item.key)}
                        className="data-[state=checked]:bg-red-500"
                      />
                    )}
                    {item.type === 'button' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={item.action}
                        className="border-white/20 text-white hover:bg-white/5"
                      >
                        Configure
                      </Button>
                    )}
                  </div>
                  {item.type === 'input' && (
                    <Input
                      placeholder={item.placeholder}
                      className="mt-2 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    />
                  )}
                  {itemIndex < group.items.length - 1 && (
                    <Separator className="bg-white/10 mt-4" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Quick Stats */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                <Gauge className="h-5 w-5 text-blue-400" />
              </div>
              App Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">247</div>
                <div className="text-white/60 text-sm">Total Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-white/60 text-sm">Tracks Visited</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">45.2s</div>
                <div className="text-white/60 text-sm">Best Lap Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1.2GB</div>
                <div className="text-white/60 text-sm">Data Usage</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                <HelpCircle className="h-5 w-5 text-green-400" />
              </div>
              Support & About
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/5"
            >
              Help Center
            </Button>
            <Separator className="bg-white/10" />
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/5"
            >
              Contact Support
            </Button>
            <Separator className="bg-white/10" />
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/5"
            >
              Privacy Policy
            </Button>
            <Separator className="bg-white/10" />
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/5"
            >
              Terms of Service
            </Button>
            <Separator className="bg-white/10" />
            <div className="text-center text-white/40 text-sm py-2">
              KartMate v1.0.0
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="destructive"
          className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </AppLayout>
  );
};

export default Settings;
