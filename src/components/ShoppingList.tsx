
import React, { useState } from 'react';
import { Plus, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingListItem } from '../types/store';
import { storeItems, popularItems } from '../data/storeData';

interface ShoppingListProps {
  items: ShoppingListItem[];
  onAddItem: (itemName: string) => void;
  onRemoveItem: (itemId: string) => void;
  onToggleItem: (itemId: string) => void;
  onFindWay: () => void;
  isLoading: boolean;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  items,
  onAddItem,
  onRemoveItem,
  onToggleItem,
  onFindWay,
  isLoading
}) => {
  const [newItem, setNewItem] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (value: string) => {
    setNewItem(value);
    if (value.length > 0) {
      const filtered = popularItems.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleAddItem = (itemName: string) => {
    if (itemName.trim()) {
      onAddItem(itemName.trim());
      setNewItem('');
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddItem(newItem);
    }
  };

  const completedCount = items.filter(item => item.completed).length;
  const progressPercentage = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-primary rounded-lg">
          <ShoppingCart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Shopping List</h2>
          <p className="text-gray-600">{items.length} items • {completedCount} completed</p>
        </div>
      </div>

      {/* Progress Bar */}
      {items.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Add Item Input */}
      <div className="relative mb-6">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Add item to your list..."
              value={newItem}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-4"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    onClick={() => handleAddItem(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button 
            onClick={() => handleAddItem(newItem)}
            className="bg-buyway-blue hover:bg-buyway-blue-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Shopping List Items */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
              item.completed 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <label className="custom-checkbox flex-1 flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onToggleItem(item.id)}
              />
              <span className="checkmark"></span>
              <span className={`font-medium transition-all duration-200 ${
                item.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-800'
              }`}>
                {item.name}
              </span>
              {item.storeItem && (
                <span className="text-xs bg-buyway-blue text-white px-2 py-1 rounded-full">
                  {item.storeItem.category}
                </span>
              )}
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveItem(item.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Your shopping list is empty</p>
          <p className="text-sm">Add items to get started!</p>
        </div>
      )}

      {/* Find Way Button */}
      {items.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button
            onClick={onFindWay}
            disabled={isLoading || items.length === 0}
            className="w-full bg-gradient-accent hover:opacity-90 text-gray-800 font-semibold py-3 text-lg transition-all duration-200 hover:scale-105"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                Calculating Path...
              </div>
            ) : (
              'Find My Way! 🗺️'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
