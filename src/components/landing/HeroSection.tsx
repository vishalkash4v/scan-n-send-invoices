import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Scene3D } from "@/components/3d/Scene3D";

export const HeroSection = () => {
  const [email, setEmail] = useState("");

  const handleGetStarted = () => {
    window.location.href = '/admin';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/20"></div>
      
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-40">
        <Scene3D />
      </div>
      
      {/* Modern Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-glow/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-2xl rotate-45 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-l from-primary/15 to-primary-glow/15 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-8">
            <MaterialIcon name="new_releases" size={16} className="text-primary mr-2" />
            <span className="text-sm font-medium text-primary">2025 Modern Design</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              Next-Gen
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              Invoice Platform
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Revolutionary invoice creation with AI-powered insights, real-time collaboration, 
            and advanced analytics. The future of business invoicing is here.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button 
              size="lg" 
              variant="hero"
              onClick={handleGetStarted}
              className="text-lg px-10 py-6 shadow-glow hover:shadow-glow hover:scale-105 transition-all duration-300 group"
            >
              <MaterialIcon name="auto_awesome" size={24} className="mr-3 group-hover:rotate-12 transition-transform" />
              Launch Dashboard
              <MaterialIcon name="arrow_forward" size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-10 py-6 bg-background/50 border-border backdrop-blur-sm hover:bg-background/80 group"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MaterialIcon name="play_circle_filled" size={24} className="mr-3 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { number: "50K+", label: "Active Users" },
              { number: "1M+", label: "Invoices Created" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {[
              { 
                icon: "qr_code_scanner", 
                title: "Smart Scanning", 
                desc: "AI-powered barcode recognition with instant product lookup",
                gradient: "from-blue-500/10 to-cyan-500/10"
              },
              { 
                icon: "auto_awesome", 
                title: "Dynamic Templates", 
                desc: "Adaptive designs that adjust to your brand automatically",
                gradient: "from-purple-500/10 to-pink-500/10"
              },
              { 
                icon: "cloud_sync", 
                title: "Real-time Sync", 
                desc: "Instant collaboration with live updates across devices",
                gradient: "from-green-500/10 to-emerald-500/10"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`relative group p-8 rounded-2xl border border-border bg-gradient-to-br ${feature.gradient} backdrop-blur-sm hover:scale-105 transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-glow/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                    <MaterialIcon name={feature.icon} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-xs text-muted-foreground">Scroll</span>
        </div>
      </div>
    </section>
  );
};