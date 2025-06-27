
import React from 'react';
import { MapPin, Home, ShoppingCart } from 'lucide-react';
import { StoreItem } from '../types/store';
import { storeLayout } from '../data/storeData';

interface StoreMapProps {
  items: StoreItem[];
  currentStep?: number;
}

const StoreMap: React.FC<StoreMapProps> = ({ items, currentStep = 0 }) => {
  const mapWidth = 400;
  const mapHeight = 300;
  
  // Scale coordinates to fit the map
  const scaleX = (x: number) => (x / 100) * mapWidth;
  const scaleY = (y: number) => (y / 100) * mapHeight;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-buyway-blue" />
        Store Layout
      </h3>
      
      <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden">
        <svg width={mapWidth} height={mapHeight} className="bg-gray-50">
          {/* Store Sections */}
          {Object.entries(storeLayout.sections).map(([sectionName, section]) => (
            <g key={sectionName}>
              <rect
                x={scaleX(section.x)}
                y={scaleY(section.y)}
                width={scaleX(section.width)}
                height={scaleY(section.height)}
                fill="rgba(0, 113, 206, 0.1)"
                stroke="rgba(0, 113, 206, 0.3)"
                strokeWidth="1"
                rx="4"
              />
              <text
                x={scaleX(section.x + section.width / 2)}
                y={scaleY(section.y + section.height / 2)}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium fill-buyway-blue"
              >
                {sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}
              </text>
            </g>
          ))}
          
          {/* Entrance */}
          <g>
            <circle
              cx={scaleX(storeLayout.entrance.x)}
              cy={scaleY(storeLayout.entrance.y)}
              r="8"
              fill="#22c55e"
            />
            <Home className="w-4 h-4" style={{
              x: scaleX(storeLayout.entrance.x) - 8,
              y: scaleY(storeLayout.entrance.y) - 8
            }} />
          </g>
          
          {/* Checkout */}
          <g>
            <circle
              cx={scaleX(storeLayout.checkout.x)}
              cy={scaleY(storeLayout.checkout.y)}
              r="8"
              fill="#f59e0b"
            />
            <ShoppingCart className="w-4 h-4" style={{
              x: scaleX(storeLayout.checkout.x) - 8,
              y: scaleY(storeLayout.checkout.y) - 8
            }} />
          </g>
          
          {/* Item Locations */}
          {items.map((item, index) => (
            <g key={item.id}>
              <circle
                cx={scaleX(item.location.position.x)}
                cy={scaleY(item.location.position.y)}
                r="6"
                fill={index <= currentStep ? "#22c55e" : "#ef4444"}
                stroke="white"
                strokeWidth="2"
                className="animate-pulse-soft"
              />
              <text
                x={scaleX(item.location.position.x)}
                y={scaleY(item.location.position.y - 15)}
                textAnchor="middle"
                className="text-xs font-medium fill-gray-700"
              >
                {index + 1}
              </text>
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
                stroke="#0071ce"
                strokeWidth="2"
                strokeDasharray="4,4"
                fill="none"
                className="animate-pulse"
              />
            </g>
          )}
        </svg>
        
        {/* Legend */}
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 rounded p-2 text-xs">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Entrance</span>
          </div>
          <div className="flex items-center gap-1 mb-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Checkout</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Items</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreMap;
