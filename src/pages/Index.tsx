
import React, { useState } from 'react';
import { MapPin, Zap, Target, Users } from 'lucide-react';
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
        title: "Item added successfully!",
        description: `${itemName} found in ${storeItem.category} section.`,
        variant: "default"
      });
    } else {
      toast({
        title: "Item added to list",
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
        title: "No items with known locations",
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
      title: "Route calculated!",
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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-hero rounded-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">BuyWay</h1>
                <p className="text-gray-600">Smart Shopping Assistant</p>
              </div>
            </div>
            
            {showResults && (
              <Button
                onClick={resetApp}
                variant="outline"
                className="hidden sm:flex"
              >
                New Shopping Trip
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showResults ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Shop Smarter, Not Harder
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get the shortest path through the store to collect all your items efficiently. 
                Save time and energy with our intelligent route planning.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="p-3 bg-gradient-primary rounded-lg w-fit mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Advanced pathfinding algorithms calculate the optimal route in seconds.</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="p-3 bg-gradient-accent rounded-lg w-fit mx-auto mb-4">
                  <Target className="w-6 h-6 text-gray-800" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Precise Navigation</h3>
                <p className="text-gray-600">Step-by-step directions guide you through every aisle and section.</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="p-3 bg-gradient-hero rounded-lg w-fit mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">User Friendly</h3>
                <p className="text-gray-600">Simple interface designed for shoppers of all ages and tech levels.</p>
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

              {/* Store Map */}
              <div className="lg:col-span-1">
                <StoreMap items={itemsWithLocation.map(item => item.storeItem!)} />
                
                {/* Quick Stats */}
                {shoppingList.length > 0 && (
                  <Card className="p-4 mt-6 bg-gradient-to-r from-buyway-blue to-buyway-yellow text-white">
                    <h4 className="font-semibold mb-2">Quick Stats</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Items:</span>
                        <span className="font-medium">{shoppingList.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Items Found:</span>
                        <span className="font-medium">{itemsWithLocation.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completed:</span>
                        <span className="font-medium">{shoppingList.filter(i => i.completed).length}</span>
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
              
              <div className="lg:col-span-1">
                <StoreMap items={itemsWithLocation.map(item => item.storeItem!)} />
                
                {/* Shopping List Summary */}
                <Card className="p-4 mt-6">
                  <h4 className="font-semibold mb-3">Your Shopping List</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {shoppingList.map(item => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-2 p-2 rounded text-sm ${
                          item.completed ? 'bg-green-50 text-green-700' : 'bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleItem(item.id)}
                          className="rounded"
                        />
                        <span className={item.completed ? 'line-through' : ''}>
                          {item.name}
                        </span>
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
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-6 h-6" />
            <span className="text-xl font-bold">BuyWay</span>
          </div>
          <p className="text-gray-400">
            Making shopping efficient, one path at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
