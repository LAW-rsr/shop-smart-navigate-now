
import React, { useState } from 'react';
import { MapPin, Zap, Target, Users, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ShoppingList from '../components/ShoppingList';
import NavigationPathComponent from '../components/NavigationPath';
import StoreMap from '../components/StoreMap';
import { ShoppingListItem, NavigationPath } from '../types/store';
import { storeItems } from '../data/storeData';
import { calculateShortestPath } from '../utils/pathfinding';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [navigationPath, setNavigationPath] = useState<NavigationPath | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const addItem = (itemName: string) => {
    // Check if item already exists
    if (shoppingList.some(item => item.name.toLowerCase() === itemName.toLowerCase())) {
      toast({
        title: "Item already in list",
        description: `${itemName} is already in your shopping list.`,
        variant: "default"
      });
      return;
    }

    const storeItem = storeItems.find(
      item => item.name.toLowerCase() === itemName.toLowerCase()
    );

    const newItem: ShoppingListItem = {
      id: Date.now().toString(),
      name: itemName,
      completed: false,
      storeItem
    };

    setShoppingList(prev => [...prev, newItem]);
    
    if (storeItem) {
      toast({
        title: "✅ Item added successfully!",
        description: `${itemName} found in ${storeItem.category} section.`,
        variant: "default"
      });
    } else {
      toast({
        title: "📝 Item added to list",
        description: `${itemName} added (location unknown - please ask store staff).`,
        variant: "default"
      });
    }
  };

  const removeItem = (itemId: string) => {
    setShoppingList(prev => prev.filter(item => item.id !== itemId));
  };

  const toggleItem = (itemId: string) => {
    setShoppingList(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const calculatePath = async () => {
    const itemsWithLocation = shoppingList.filter(item => item.storeItem);
    
    if (itemsWithLocation.length === 0) {
      toast({
        title: "⚠️ No items with known locations",
        description: "Add some items from our store inventory to calculate a path.",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const path = calculateShortestPath(itemsWithLocation.map(item => item.storeItem!));
    setNavigationPath(path);
    setShowResults(true);
    setIsCalculating(false);
    
    toast({
      title: "🎯 Route calculated!",
      description: `Found optimal path visiting ${itemsWithLocation.length} items in ${path.estimatedTime} seconds.`,
      variant: "default"
    });
  };

  const resetApp = () => {
    setShoppingList([]);
    setNavigationPath(null);
    setShowResults(false);
  };

  const itemsWithLocation = shoppingList.filter(item => item.storeItem);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {showResults && (
                <Button
                  onClick={resetApp}
                  variant="ghost"
                  className="text-[rgb(0,113,206)] hover:bg-blue-50 p-2 rounded-xl"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-[rgb(0,113,206)] to-[rgb(255,194,32)] rounded-xl shadow-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">BuyWay</h1>
                  <p className="text-gray-600 font-medium">Smart Shopping Assistant</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {showResults && (
                <Button
                  onClick={resetApp}
                  className="hidden sm:flex bg-gradient-to-r from-[rgb(255,194,32)] to-[rgb(255,220,102)] hover:from-[rgb(255,180,0)] hover:to-[rgb(255,194,32)] text-gray-800 font-semibold rounded-xl shadow-lg"
                >
                  <Home className="w-4 h-4 mr-2" />
                  New Shopping Trip
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showResults ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Shop Smarter, Not Harder
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Get the shortest path through the store to collect all your items efficiently. 
                Save time and energy with our intelligent route planning powered by advanced algorithms.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100">
                <div className="p-4 bg-gradient-to-r from-[rgb(0,113,206)] to-[rgb(51,144,255)] rounded-xl w-fit mx-auto mb-6 shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">Advanced A* pathfinding algorithms calculate the optimal route through the store in seconds.</p>
              </Card>
              
              <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100">
                <div className="p-4 bg-gradient-to-r from-[rgb(255,194,32)] to-[rgb(255,220,102)] rounded-xl w-fit mx-auto mb-6 shadow-lg">
                  <Target className="w-8 h-8 text-gray-800" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Precise Navigation</h3>
                <p className="text-gray-600 leading-relaxed">Step-by-step directions guide you through every aisle, section, and shelf location.</p>
              </Card>
              
              <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100">
                <div className="p-4 bg-gradient-to-r from-[rgb(0,113,206)] to-[rgb(255,194,32)] rounded-xl w-fit mx-auto mb-6 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">User Friendly</h3>
                <p className="text-gray-600 leading-relaxed">Intuitive interface designed for shoppers of all ages and technology comfort levels.</p>
              </Card>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Shopping List */}
              <div className="lg:col-span-2">
                <ShoppingList
                  items={shoppingList}
                  onAddItem={addItem}
                  onRemoveItem={removeItem}
                  onToggleItem={toggleItem}
                  onFindWay={calculatePath}
                  isLoading={isCalculating}
                />
              </div>

              {/* Store Map and Stats */}
              <div className="lg:col-span-1 space-y-6">
                <StoreMap items={itemsWithLocation.map(item => item.storeItem!)} />
                
                {/* Quick Stats */}
                {shoppingList.length > 0 && (
                  <Card className="p-6 bg-gradient-to-r from-[rgb(0,113,206)] via-[rgb(51,144,255)] to-[rgb(255,194,32)] text-white shadow-xl border-2 border-white/20">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      📊 Quick Stats
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center bg-white/20 rounded-lg p-3">
                        <span className="font-medium">Total Items:</span>
                        <span className="font-bold text-lg">{shoppingList.length}</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/20 rounded-lg p-3">
                        <span className="font-medium">Items Found:</span>
                        <span className="font-bold text-lg">{itemsWithLocation.length}</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/20 rounded-lg p-3">
                        <span className="font-medium">Completed:</span>
                        <span className="font-bold text-lg">{shoppingList.filter(i => i.completed).length}</span>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Results View */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <NavigationPathComponent
                  path={navigationPath}
                  onReset={resetApp}
                />
              </div>
              
              <div className="lg:col-span-1 space-y-6">
                <StoreMap items={itemsWithLocation.map(item => item.storeItem!)} />
                
                {/* Shopping List Summary */}
                <Card className="p-6 shadow-xl border-2 border-gray-100">
                  <h4 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
                    🛒 Your Shopping List
                  </h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                    {shoppingList.map(item => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-3 p-3 rounded-lg text-sm transition-all duration-200 ${
                          item.completed 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleItem(item.id)}
                          className="w-4 h-4 rounded"
                        />
                        <span className={`font-medium flex-1 ${item.completed ? 'line-through' : ''}`}>
                          {item.name}
                        </span>
                        {item.storeItem && (
                          <span className="text-xs bg-[rgb(0,113,206)] text-white px-2 py-1 rounded-full">
                            {item.storeItem.category}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-[rgb(0,113,206)] to-[rgb(255,194,32)] rounded-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">BuyWay</span>
          </div>
          <p className="text-gray-300 text-lg mb-4">
            Making shopping efficient, one optimized path at a time.
          </p>
          <p className="text-gray-400 text-sm">
            Powered by advanced pathfinding algorithms and smart store mapping
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
