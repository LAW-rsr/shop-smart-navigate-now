
import React, { useState } from 'react';
import { MapPin, Home, ShoppingCart, Maximize2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StoreItem } from '../types/store';
import { storeLayout } from '../data/storeData';

interface StoreMapProps {
  items: StoreItem[];
  currentStep?: number;
}

const StoreMap: React.FC<StoreMapProps> = ({ items, currentStep = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  
  const mapWidth = isExpanded ? 600 : 400;
  const mapHeight = isExpanded ? 450 : 300;
  
  // Scale coordinates to fit the map
  const scaleX = (x: number) => (x / 100) * mapWidth;
  const scaleY = (y: number) => (y / 100) * mapHeight;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[rgb(0,113,206)] to-[rgb(51,144,255)] p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6" />
            <div>
              <h3 className="text-xl font-bold">Store Layout</h3>
              <p className="text-blue-100 text-sm">Interactive navigation map</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 rounded-lg"
            >
              {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 rounded-lg"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="p-6">
        <div className="relative border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50">
          <svg width={mapWidth} height={mapHeight} className="bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Store Sections */}
            {Object.entries(storeLayout.sections).map(([sectionName, section]) => (
              <g key={sectionName}>
                <rect
                  x={scaleX(section.x)}
                  y={scaleY(section.y)}
                  width={scaleX(section.width)}
                  height={scaleY(section.height)}
                  fill="rgba(0, 113, 206, 0.1)"
                  stroke="rgb(0, 113, 206)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  rx="8"
                  className="animate-pulse-soft"
                />
                {showDetails && (
                  <text
                    x={scaleX(section.x + section.width / 2)}
                    y={scaleY(section.y + section.height / 2)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-bold fill-[rgb(0,113,206)]"
                  >
                    {sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}
                  </text>
                )}
              </g>
            ))}
            
            {/* Entrance */}
            <g>
              <circle
                cx={scaleX(storeLayout.entrance.x)}
                cy={scaleY(storeLayout.entrance.y)}
                r="12"
                fill="rgb(34, 197, 94)"
                stroke="white"
                strokeWidth="3"
                className="animate-bounce-gentle"
              />
              <foreignObject
                x={scaleX(storeLayout.entrance.x) - 10}
                y={scaleY(storeLayout.entrance.y) - 10}
                width="20"
                height="20"
              >
                <Home className="w-5 h-5 text-white" />
              </foreignObject>
            </g>
            
            {/* Checkout */}
            <g>
              <circle
                cx={scaleX(storeLayout.checkout.x)}
                cy={scaleY(storeLayout.checkout.y)}
                r="12"
                fill="rgb(255, 194, 32)"
                stroke="white"
                strokeWidth="3"
                className="animate-bounce-gentle"
              />
              <foreignObject
                x={scaleX(storeLayout.checkout.x) - 10}
                y={scaleY(storeLayout.checkout.y) - 10}
                width="20"
                height="20"
              >
                <ShoppingCart className="w-5 h-5 text-white" />
              </foreignObject>
            </g>
            
            {/* Item Locations */}
            {items.map((item, index) => (
              <g key={item.id}>
                <circle
                  cx={scaleX(item.location.position.x)}
                  cy={scaleY(item.location.position.y)}
                  r="8"
                  fill={index <= currentStep ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                  stroke="white"
                  strokeWidth="2"
                  className="animate-pulse-soft"
                />
                <circle
                  cx={scaleX(item.location.position.x)}
                  cy={scaleY(item.location.position.y)}
                  r="12"
                  fill="none"
                  stroke={index <= currentStep ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                  strokeWidth="2"
                  opacity="0.5"
                  className="animate-ping"
                />
                {showDetails && (
                  <text
                    x={scaleX(item.location.position.x)}
                    y={scaleY(item.location.position.y - 20)}
                    textAnchor="middle"
                    className="text-xs font-bold fill-gray-700 bg-white"
                  >
                    {index + 1}
                  </text>
                )}
              </g>
            ))}
            
            {/* Path Line */}
            {items.length > 0 && (
              <g>
                <path
                  d={`M ${scaleX(storeLayout.entrance.x)} ${scaleY(storeLayout.entrance.y)} 
                     ${items.map(item => 
                       `L ${scaleX(item.location.position.x)} ${scaleY(item.location.position.y)}`
                     ).join(' ')} 
                     L ${scaleX(storeLayout.checkout.x)} ${scaleY(storeLayout.checkout.y)}`}
                  stroke="rgb(0, 113, 206)"
                  strokeWidth="3"
                  strokeDasharray="8,4"
                  fill="none"
                  className="animate-pulse"
                />
                
                {/* Path glow effect */}
                <path
                  d={`M ${scaleX(storeLayout.entrance.x)} ${scaleY(storeLayout.entrance.y)} 
                     ${items.map(item => 
                       `L ${scaleX(item.location.position.x)} ${scaleY(item.location.position.y)}`
                     ).join(' ')} 
                     L ${scaleX(storeLayout.checkout.x)} ${scaleY(storeLayout.checkout.y)}`}
                  stroke="rgb(255, 194, 32)"
                  strokeWidth="6"
                  strokeDasharray="8,4"
                  fill="none"
                  opacity="0.3"
                  className="animate-pulse"
                />
              </g>
            )}
          </svg>
          
          {/* Legend */}
          {showDetails && (
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 text-xs shadow-lg border border-gray-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                  <span className="font-medium">Entrance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[rgb(255,194,32)] rounded-full shadow-sm"></div>
                  <span className="font-medium">Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
                  <span className="font-medium">Your Items</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-[rgb(0,113,206)] rounded-full shadow-sm"></div>
                  <span className="font-medium">Optimal Path</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreMap;
