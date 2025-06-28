
import React from 'react';
import { MapPin, Clock, Route, CheckCircle, Navigation, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { NavigationPath } from '../types/store';

interface NavigationPathProps {
  path: NavigationPath | null;
  onReset: () => void;
}

const NavigationPathComponent: React.FC<NavigationPathProps> = ({ path, onReset }) => {
  if (!path) return null;

  const formatTime = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds} seconds`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s`;
    }
  };

  // Group steps by store sections for better navigation flow
  const navigationSections = [
    { section: 'Start', icon: '🚪', color: 'bg-green-500', items: ['Enter store through main entrance'] },
    { section: 'Fresh Produce', icon: '🥬', color: 'bg-[rgb(0,113,206)]', items: path.steps.filter(s => s.location?.includes('Fruits') || s.location?.includes('Produce')).map(s => s.item || s.instruction) },
    { section: 'Frozen & Bakery', icon: '🧊', color: 'bg-[rgb(0,113,206)]', items: path.steps.filter(s => s.location?.includes('Frozen') || s.location?.includes('Bakery')).map(s => s.item || s.instruction) },
    { section: 'Special Offers', icon: '⭐', color: 'bg-[rgb(255,194,32)]', items: path.steps.filter(s => s.location?.includes('Endcap')).map(s => s.item || s.instruction) },
    { section: 'Grocery Aisles', icon: '🛒', color: 'bg-slate-500', items: path.steps.filter(s => s.location?.includes('Aisle')).map(s => s.item || s.instruction) },
    { section: 'Checkout', icon: '💳', color: 'bg-[rgb(255,194,32)]', items: ['Complete your purchase'] },
  ].filter(section => section.items.length > 0 || section.section === 'Start' || section.section === 'Checkout');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Stats */}
      <Card className="p-6 bg-gradient-to-r from-[rgb(0,113,206)] to-[rgb(255,194,32)] text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white bg-opacity-20 rounded-lg">
            <Route className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Your Navigation Route</h2>
            <p className="opacity-90">Follow the visual path through store sections</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Route className="w-5 h-5" />
              <span className="text-2xl font-bold">{navigationSections.length - 2}</span>
            </div>
            <p className="text-sm opacity-80">Store Sections</p>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-1">
            <Clock className="w-5 h-5" />
            <span className="text-2xl font-bold">{formatTime(path.estimatedTime)}</span>
          </div>
          <p className="text-sm opacity-80">Estimated Time</p>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <MapPin className="w-5 h-5" />
              <span className="text-2xl font-bold">{path.steps.filter(s => s.item).length}</span>
            </div>
            <p className="text-sm opacity-80">Items to Collect</p>
          </div>
        </div>
      </Card>

      {/* Visual Navigation Route */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Navigation className="w-5 h-5 text-[rgb(0,113,206)]" />
          Store Navigation Route
        </h3>
        
        <div className="space-y-4">
          {navigationSections.map((section, index) => (
            <div key={section.section} className="relative">
              {/* Connection Line */}
              {index < navigationSections.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-8 bg-gradient-to-b from-[rgb(0,113,206)] to-[rgb(255,194,32)] opacity-50"></div>
              )}
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-yellow-50 transition-all duration-300">
                <div className={`w-16 h-16 ${section.color} rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                  {section.icon}
                </div>
                
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{section.section}</h4>
                  
                  {section.items.length > 0 && (
                    <div className="space-y-2">
                      {section.items.slice(0, 4).map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-2 h-2 bg-[rgb(0,113,206)] rounded-full"></div>
                          <span className="font-medium">{item}</span>
                        </div>
                      ))}
                      {section.items.length > 4 && (
                        <div className="text-sm text-gray-500 font-medium">
                          +{section.items.length - 4} more items in this section
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center">
                  {index < navigationSections.length - 1 ? (
                    <ArrowRight className="w-6 h-6 text-[rgb(0,113,206)]" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Navigation Tips */}
      <Card className="p-4 bg-gradient-to-r from-[rgb(255,194,32)]/10 to-[rgb(255,194,32)]/5 border-[rgb(255,194,32)]/30">
        <h4 className="font-semibold text-[rgb(0,113,206)] mb-3 flex items-center gap-2">
          💡 Smart Shopping Tips
        </h4>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <span className="text-[rgb(255,194,32)] font-bold">•</span>
            <span>Follow the route order to minimize walking distance</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[rgb(255,194,32)] font-bold">•</span>
            <span>Check off items as you collect them</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[rgb(255,194,32)] font-bold">•</span>
            <span>Start with fresh items and end with frozen foods</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[rgb(255,194,32)] font-bold">•</span>
            <span>Look for special offers in the endcap sections</span>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={onReset}
          variant="outline"
          className="flex-1 py-3 text-lg border-[rgb(0,113,206)] text-[rgb(0,113,206)] hover:bg-[rgb(0,113,206)] hover:text-white"
        >
          Create New Route
        </Button>
        <Button
          onClick={() => window.print()}
          className="flex-1 bg-gradient-to-r from-[rgb(0,113,206)] to-[rgb(255,194,32)] hover:from-[rgb(0,85,155)] hover:to-[rgb(255,180,0)] py-3 text-lg"
        >
          Print Route Map
        </Button>
      </div>
    </div>
  );
};

export default NavigationPathComponent;
