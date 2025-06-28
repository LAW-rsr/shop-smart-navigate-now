
import React, { useState } from 'react';
import { Plus, X, ShoppingCart, Search } from 'lucide-react';
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
      ).slice(0, 6);
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
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-r from-[rgb(0,113,206)] to-[rgb(51,144,255)] rounded-xl shadow-lg">
          <ShoppingCart className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Shopping List</h2>
          <p className="text-gray-600 text-lg">
            {items.length} items • {completedCount} completed
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      {items.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Progress</span>
            <span className="text-[rgb(0,113,206)]">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div 
              className="bg-gradient-to-r from-[rgb(0,113,206)] to-[rgb(255,194,32)] h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Add Item Section */}
      <div className="relative mb-8">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search and add items to your list..."
                value={newItem}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 pr-4 h-12 text-lg border-2 border-gray-200 focus:border-[rgb(0,113,206)] rounded-xl transition-all duration-200"
              />
            </div>
            
            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border-2 border-gray-100 rounded-xl shadow-xl z-20 mt-2 max-h-64 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl border-b border-gray-50 last:border-b-0"
                    onClick={() => handleAddItem(suggestion)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[rgb(0,113,206)] rounded-full"></div>
                      <span className="text-gray-800 font-medium">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <Button 
            onClick={() => handleAddItem(newItem)}
            className="h-12 px-6 bg-gradient-to-r from-[rgb(255,194,32)] to-[rgb(255,220,102)] hover:from-[rgb(255,180,0)] hover:to-[rgb(255,194,32)] text-gray-800 font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Shopping List Items */}
      <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
              item.completed 
                ? 'bg-green-50 border-green-200 shadow-sm' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
            }`}
          >
            {/* Custom Checkbox */}
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => onToggleItem(item.id)}
                  className="sr-only"
                />
                <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-200 ${
                  item.completed 
                    ? 'bg-[rgb(0,113,206)] border-[rgb(0,113,206)]' 
                    : 'bg-white border-gray-300 hover:border-[rgb(0,113,206)]'
                }`}>
                  {item.completed && (
                    <svg className="w-4 h-4 text-white absolute top-0.5 left-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
              </div>
            </label>

            {/* Item Details */}
            <div className="flex-1 min-w-0">
              <div className={`font-semibold text-lg transition-all duration-200 ${
                item.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-800'
              }`}>
                {item.name}
              </div>
              {item.storeItem && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-[rgb(0,113,206)] text-white px-3 py-1 rounded-full font-medium">
                    {item.storeItem.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.storeItem.subcategory}
                  </span>
                </div>
              )}
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveItem(item.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-xl font-medium mb-2">Your shopping list is empty</p>
          <p className="text-gray-400">Add items to get started with smart navigation!</p>
        </div>
      )}

      {/* Find Way Button */}
      {items.length > 0 && (
        <div className="mt-8 pt-6 border-t-2 border-gray-100">
          <Button
            onClick={onFindWay}
            disabled={isLoading || items.length === 0}
            className="w-full bg-gradient-to-r from-[rgb(255,194,32)] to-[rgb(255,220,102)] hover:from-[rgb(255,180,0)] hover:to-[rgb(255,194,32)] text-gray-800 font-bold py-4 text-xl rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-3 border-gray-600 border-t-transparent rounded-full animate-spin" />
                <span>Calculating Optimal Path...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span>🗺️ Find My Way!</span>
              </div>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
