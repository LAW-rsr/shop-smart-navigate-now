
import React from 'react';
import { MapPin, Clock, Footprints, CheckCircle, Navigation } from 'lucide-react';
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Stats */}
      <Card className="p-6 bg-gradient-hero text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white bg-opacity-20 rounded-lg">
            <Navigation className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Your Optimal Route</h2>
            <p className="opacity-90">Follow these steps for the shortest path</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Footprints className="w-5 h-5" />
              <span className="text-2xl font-bold">{path.totalDistance}ft</span>
            </div>
            <p className="text-sm opacity-80">Total Distance</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock className="w-5 h-5" />
              <span className="text-2xl font-bold">{formatTime(path.estimatedTime)}</span>
            </div>
            <p className="text-sm opacity-80">Estimated Time</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <MapPin className="w-5 h-5" />
              <span className="text-2xl font-bold">{path.totalSteps}</span>
            </div>
            <p className="text-sm opacity-80">Total Steps</p>
          </div>
        </div>
      </Card>

      {/* Step-by-Step Directions */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-buyway-blue" />
          Step-by-Step Directions
        </h3>
        
        <div className="space-y-4">
          {path.steps.map((step, index) => (
            <div key={step.id} className="flex gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step.id === 'checkout' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-buyway-blue text-white'
                }`}>
                  {step.id === 'checkout' ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-gray-800 mb-1">{step.instruction}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {step.location}
                  </span>
                  {step.distance > 0 && (
                    <span className="flex items-center gap-1">
                      <Footprints className="w-3 h-3" />
                      {step.distance} steps
                    </span>
                  )}
                  {step.item && (
                    <span className="bg-buyway-yellow text-buyway-blue px-2 py-1 rounded-full text-xs font-medium">
                      📦 {step.item}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={onReset}
          variant="outline"
          className="flex-1 py-3 text-lg"
        >
          Create New List
        </Button>
        <Button
          onClick={() => window.print()}
          className="flex-1 bg-buyway-blue hover:bg-buyway-blue-dark py-3 text-lg"
        >
          Print Directions
        </Button>
      </div>
      
      {/* Pro Tips */}
      <Card className="p-4 bg-buyway-yellow bg-opacity-10 border-buyway-yellow border-opacity-30">
        <h4 className="font-semibold text-buyway-blue mb-2">💡 Pro Shopping Tips</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Check off items as you collect them to track progress</li>
          <li>• Keep your phone handy for easy reference</li>
          <li>• Consider peak hours - mornings are usually less crowded</li>
          <li>• Bring a quarter for shopping carts if needed</li>
        </ul>
      </Card>
    </div>
  );
};

export default NavigationPathComponent;
