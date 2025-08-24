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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* 3D Background */}
      <Scene3D />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary-glow/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-primary/50 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Professional 
            <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Invoice Generator
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Create stunning invoices with smart product management, barcode scanning, 
            and seamless export options. Perfect for businesses of all sizes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              variant="hero"
              onClick={handleGetStarted}
              className="text-lg px-8 py-4 shadow-glow hover:shadow-glow hover:scale-105 transition-all duration-300"
            >
              <MaterialIcon name="rocket_launch" size={24} className="mr-2" />
              Start Creating Invoices
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 bg-card/10 border-border text-foreground hover:bg-card/20 backdrop-blur-sm"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MaterialIcon name="play_circle" size={24} className="mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Email Signup */}
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email"
                placeholder="Enter your email for updates"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-card/10 border-border text-foreground placeholder:text-muted-foreground backdrop-blur-sm"
              />
              <Button variant="hero" className="whitespace-nowrap">
                Get Updates
              </Button>
            </div>
            <p className="text-muted-foreground text-sm mt-2">Join 10,000+ businesses already using InvoiceGen</p>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {[
            { icon: "qr_code_scanner", title: "Barcode Scanning", desc: "Scan products instantly" },
            { icon: "auto_awesome", title: "Smart Templates", desc: "Professional designs" },
            { icon: "download", title: "Multiple Exports", desc: "PDF, PNG, JPG formats" }
          ].map((feature, index) => (
            <div key={index} className="bg-card/10 backdrop-blur-sm rounded-xl p-6 border border-border">
              <MaterialIcon name={feature.icon} size={32} className="text-primary mb-3 mx-auto" />
              <h3 className="text-foreground font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <MaterialIcon name="keyboard_arrow_down" size={32} className="text-muted-foreground" />
      </div>
    </section>
  );
};