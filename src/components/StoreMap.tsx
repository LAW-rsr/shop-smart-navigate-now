
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
  
  const mapWidth = isExpanded ? 800 : 500;
  const mapHeight = isExpanded ? 600 : 375;
  
  // Scale coordinates to fit the map
  const scaleX = (x: number) => (x / 100) * mapWidth;
  const scaleY = (y: number) => (y / 100) * mapHeight;

  // Define clear store sections with better positioning
  const storeSections = {
    'entrance': { x: 5, y: 5, width: 15, height: 8, color: 'rgb(34, 197, 94)', label: 'Store Entrance' },
    'fruits': { x: 5, y: 20, width: 18, height: 15, color: 'rgb(0,113,206)', label: 'Fresh Fruits' },
    'produce': { x: 28, y: 20, width: 18, height: 15, color: 'rgb(0,113,206)', label: 'Fresh Produce' },
    'frozen': { x: 51, y: 20, width: 18, height: 15, color: 'rgb(0,113,206)', label: 'Frozen Foods' },
    'bakery': { x: 74, y: 20, width: 18, height: 15, color: 'rgb(0,113,206)', label: 'Fresh Bakery' },
    'endcaps': { x: 5, y: 40, width: 87, height: 8, color: 'rgb(255,194,32)', label: 'Special Offers' },
    'aisle1': { x: 5, y: 55, width: 20, height: 35, color: 'rgb(148, 163, 184)', label: 'Aisle 1-2' },
    'aisle2': { x: 30, y: 55, width: 20, height: 35, color: 'rgb(148, 163, 184)', label: 'Aisle 3-4' },
    'aisle3': { x: 55, y: 55, width: 20, height: 35, color: 'rgb(148, 163, 184)', label: 'Aisle 5-6' },
    'checkout': { x: 80, y: 5, width: 15, height: 8, color: 'rgb(255,194,32)', label: 'Checkout' },
  };

  // Create navigation route through sections
  const createNavigationRoute = () => {
    if (items.length === 0) return '';
    
    const route = [
      { x: 12, y: 9 }, // Start at entrance
    ];

    // Add item locations in order
    items.forEach(item => {
      route.push({
        x: item.location.position.x,
        y: item.location.position.y
      });
    });

    // End at checkout
    route.push({ x: 87, y: 9 });

    return route.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${scaleX(point.x)} ${scaleY(point.y)}`
    ).join(' ');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[rgb(0,113,206)] to-[rgb(51,144,255)] p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6" />
            <div>
              <h3 className="text-xl font-bold">Store Navigation Map</h3>
              <p className="text-blue-100 text-sm">Visual route through store sections</p>
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
            {/* Store Sections with clear boundaries */}
            {Object.entries(storeSections).map(([sectionName, section]) => (
              <g key={sectionName}>
                <rect
                  x={scaleX(section.x)}
                  y={scaleY(section.y)}
                  width={scaleX(section.width)}
                  height={scaleY(section.height)}
                  fill={`${section.color}20`}
                  stroke={section.color}
                  strokeWidth="3"
                  rx="8"
                  className="transition-all duration-300 hover:opacity-80"
                />
                {showDetails && (
                  <text
                    x={scaleX(section.x + section.width / 2)}
                    y={scaleY(section.y + section.height / 2)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-bold pointer-events-none"
                    fill={section.color}
                  >
                    {section.label}
                  </text>
                )}
              </g>
            ))}
            
            {/* Entrance Icon */}
            <g>
              <circle
                cx={scaleX(12)}
                cy={scaleY(9)}
                r="12"
                fill="rgb(34, 197, 94)"
                stroke="white"
                strokeWidth="3"
                className="animate-pulse"
              />
              <foreignObject
                x={scaleX(12) - 10}
                y={scaleY(9) - 10}
                width="20"
                height="20"
              >
                <Home className="w-5 h-5 text-white" />
              </foreignObject>
            </g>
            
            {/* Checkout Icon */}
            <g>
              <circle
                cx={scaleX(87)}
                cy={scaleY(9)}
                r="12"
                fill="rgb(255, 194, 32)"
                stroke="white"
                strokeWidth="3"
                className="animate-pulse"
              />
              <foreignObject
                x={scaleX(87) - 10}
                y={scaleY(9) - 10}
                width="20"
                height="20"
              >
                <ShoppingCart className="w-5 h-5 text-gray-800" />
              </foreignObject>
            </g>
            
            {/* Item Locations with Section Indicators */}
            {items.map((item, index) => (
              <g key={item.id}>
                <circle
                  cx={scaleX(item.location.position.x)}
                  cy={scaleY(item.location.position.y)}
                  r="10"
                  fill={index <= currentStep ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                  stroke="white"
                  strokeWidth="3"
                  className="transition-all duration-300"
                />
                <circle
                  cx={scaleX(item.location.position.x)}
                  cy={scaleY(item.location.position.y)}
                  r="15"
                  fill="none"
                  stroke={index <= currentStep ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                  strokeWidth="2"
                  opacity="0.5"
                  className="animate-ping"
                />
                {showDetails && (
                  <>
                    <text
                      x={scaleX(item.location.position.x)}
                      y={scaleY(item.location.position.y - 25)}
                      textAnchor="middle"
                      className="text-xs font-bold fill-gray-800"
                    >
                      {index + 1}
                    </text>
                    <text
                      x={scaleX(item.location.position.x)}
                      y={scaleY(item.location.position.y + 30)}
                      textAnchor="middle"
                      className="text-xs font-medium fill-gray-600"
                    >
                      {item.name}
                    </text>
                  </>
                )}
              </g>
            ))}
            
            {/* Navigation Route Path */}
            {items.length > 0 && (
              <g>
                <path
                  d={createNavigationRoute()}
                  stroke="rgb(0, 113, 206)"
                  strokeWidth="4"
                  strokeDasharray="10,5"
                  fill="none"
                  className="animate-pulse"
                  markerEnd="url(#arrowhead)"
                />
                
                {/* Path glow effect */}
                <path
                  d={createNavigationRoute()}
                  stroke="rgb(255, 194, 32)"
                  strokeWidth="8"
                  strokeDasharray="10,5"
                  fill="none"
                  opacity="0.3"
                  className="animate-pulse"
                />
                
                {/* Arrow marker definition */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3.5, 0 7"
                      fill="rgb(0, 113, 206)"
                    />
                  </marker>
                </defs>
              </g>
            )}
          </svg>
          
          {/* Enhanced Legend */}
          {showDetails && (
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 text-xs shadow-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">Navigation Guide</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                  <span className="font-medium text-gray-700">Start</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[rgb(255,194,32)] rounded-full shadow-sm"></div>
                  <span className="font-medium text-gray-700">Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
                  <span className="font-medium text-gray-700">Your Items</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-2 bg-[rgb(0,113,206)] rounded-full shadow-sm"></div>
                  <span className="font-medium text-gray-700">Route</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-600">
                  <div className="flex items-center justify-between mb-1">
                    <span>🔵 Fresh Sections</span>
                    <span>🟡 Special Areas</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>⚫ Grocery Aisles</span>
                    <span>📍 Item Locations</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Route Summary */}
          {items.length > 0 && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-[rgb(0,113,206)] to-[rgb(255,194,32)] text-white rounded-xl p-4 shadow-lg">
              <h4 className="font-bold text-sm mb-2">Navigation Route</h4>
              <div className="text-xs space-y-1">
                <div>🚶 Start: Entrance</div>
                {items.slice(0, 3).map((item, index) => (
                  <div key={item.id}>
                    📍 Stop {index + 1}: {item.location.section}
                  </div>
                ))}
                {items.length > 3 && (
                  <div>⋯ +{items.length - 3} more stops</div>
                )}
                <div>🛒 End: Checkout</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreMap;
