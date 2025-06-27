
import { StoreItem, NavigationPath, PathStep, StoreLayout } from '../types/store';
import { storeLayout } from '../data/storeData';

interface Node {
  x: number;
  y: number;
  g: number; // Cost from start
  h: number; // Heuristic cost to goal
  f: number; // Total cost (g + h)
  parent?: Node;
  item?: string;
}

// Calculate Euclidean distance between two points
const calculateDistance = (a: { x: number; y: number }, b: { x: number; y: number }): number => {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
};

// A* pathfinding algorithm implementation
const findPathAStar = (start: { x: number; y: number }, goal: { x: number; y: number }): Node[] => {
  const openSet: Node[] = [];
  const closedSet: Node[] = [];
  
  const startNode: Node = {
    x: start.x,
    y: start.y,
    g: 0,
    h: calculateDistance(start, goal),
    f: 0
  };
  startNode.f = startNode.g + startNode.h;
  
  openSet.push(startNode);
  
  while (openSet.length > 0) {
    // Find node with lowest f score
    let currentIndex = 0;
    for (let i = 1; i < openSet.length; i++) {
      if (openSet[i].f < openSet[currentIndex].f) {
        currentIndex = i;
      }
    }
    
    const current = openSet[currentIndex];
    openSet.splice(currentIndex, 1);
    closedSet.push(current);
    
    // Check if we reached the goal
    if (calculateDistance(current, goal) < 5) {
      const path: Node[] = [];
      let node: Node | undefined = current;
      while (node) {
        path.unshift(node);
        node = node.parent;
      }
      return path;
    }
    
    // Generate neighbors (simplified - we can move in 8 directions)
    const neighbors = [
      { x: current.x + 5, y: current.y },
      { x: current.x - 5, y: current.y },
      { x: current.x, y: current.y + 5 },
      { x: current.x, y: current.y - 5 },
      { x: current.x + 3, y: current.y + 3 },
      { x: current.x - 3, y: current.y - 3 },
      { x: current.x + 3, y: current.y - 3 },
      { x: current.x - 3, y: current.y + 3 }
    ];
    
    for (const neighborPos of neighbors) {
      // Check if neighbor is in closed set
      if (closedSet.some(node => node.x === neighborPos.x && node.y === neighborPos.y)) {
        continue;
      }
      
      const neighbor: Node = {
        x: neighborPos.x,
        y: neighborPos.y,
        g: current.g + calculateDistance(current, neighborPos),
        h: calculateDistance(neighborPos, goal),
        f: 0,
        parent: current
      };
      neighbor.f = neighbor.g + neighbor.h;
      
      // Check if this path to neighbor is better than any previous one
      const existingNeighbor = openSet.find(node => node.x === neighbor.x && node.y === neighbor.y);
      if (existingNeighbor && neighbor.g >= existingNeighbor.g) {
        continue;
      }
      
      if (existingNeighbor) {
        const index = openSet.indexOf(existingNeighbor);
        openSet[index] = neighbor;
      } else {
        openSet.push(neighbor);
      }
    }
  }
  
  return []; // No path found
};

// Generate step-by-step directions
const generateDirections = (path: Node[], items: StoreItem[]): PathStep[] => {
  const steps: PathStep[] = [];
  
  for (let i = 0; i < path.length - 1; i++) {
    const current = path[i];
    const next = path[i + 1];
    
    const distance = calculateDistance(current, next);
    const direction = getDirection(current, next);
    
    // Check if there's an item to pick up at this location
    const itemAtLocation = items.find(item => 
      calculateDistance(item.location.position, current) < 10
    );
    
    let instruction = `${direction} ${Math.round(distance)} steps`;
    
    if (itemAtLocation) {
      instruction += ` and pick up ${itemAtLocation.name}`;
    }
    
    steps.push({
      id: `step-${i}`,
      instruction,
      location: getLocationName(current),
      distance: Math.round(distance),
      item: itemAtLocation?.name
    });
  }
  
  // Add final step to checkout
  steps.push({
    id: 'checkout',
    instruction: 'Proceed to checkout',
    location: 'Checkout Area',
    distance: 0
  });
  
  return steps;
};

// Get direction between two points
const getDirection = (from: { x: number; y: number }, to: { x: number; y: number }): string => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? 'Go right' : 'Go left';
  } else {
    return dy > 0 ? 'Go down' : 'Go up';
  }
};

// Get location name based on coordinates
const getLocationName = (position: { x: number; y: number }): string => {
  for (const [sectionName, section] of Object.entries(storeLayout.sections)) {
    if (position.x >= section.x && position.x <= section.x + section.width &&
        position.y >= section.y && position.y <= section.y + section.height) {
      return sectionName.charAt(0).toUpperCase() + sectionName.slice(1) + ' Section';
    }
  }
  return 'Store Floor';
};

// Sort items by their optimal visiting order using a greedy nearest neighbor approach
const sortItemsByOptimalPath = (items: StoreItem[]): StoreItem[] => {
  if (items.length === 0) return [];
  
  const sortedItems: StoreItem[] = [];
  const unvisited = [...items];
  let current = storeLayout.entrance;
  
  while (unvisited.length > 0) {
    // Find the nearest unvisited item
    let nearestIndex = 0;
    let nearestDistance = calculateDistance(current, unvisited[0].location.position);
    
    for (let i = 1; i < unvisited.length; i++) {
      const distance = calculateDistance(current, unvisited[i].location.position);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = i;
      }
    }
    
    const nearestItem = unvisited[nearestIndex];
    sortedItems.push(nearestItem);
    unvisited.splice(nearestIndex, 1);
    current = nearestItem.location.position;
  }
  
  return sortedItems;
};

// Main function to calculate the shortest path
export const calculateShortestPath = (items: StoreItem[]): NavigationPath => {
  if (items.length === 0) {
    return {
      totalDistance: 0,
      totalSteps: 0,
      estimatedTime: 0,
      steps: []
    };
  }
  
  // Sort items by optimal visiting order
  const sortedItems = sortItemsByOptimalPath(items);
  
  let totalDistance = 0;
  let currentPosition = storeLayout.entrance;
  const allPathNodes: Node[] = [];
  
  // Add entrance as starting point
  allPathNodes.push({
    x: currentPosition.x,
    y: currentPosition.y,
    g: 0,
    h: 0,
    f: 0
  });
  
  // Calculate path through all items
  for (const item of sortedItems) {
    const pathToItem = findPathAStar(currentPosition, item.location.position);
    
    // Add path nodes (excluding the first one to avoid duplication)
    for (let i = 1; i < pathToItem.length; i++) {
      pathToItem[i].item = item.name;
      allPathNodes.push(pathToItem[i]);
    }
    
    // Update total distance
    if (pathToItem.length > 0) {
      totalDistance += pathToItem[pathToItem.length - 1].g;
    }
    
    currentPosition = item.location.position;
  }
  
  // Add path to checkout
  const pathToCheckout = findPathAStar(currentPosition, storeLayout.checkout);
  for (let i = 1; i < pathToCheckout.length; i++) {
    allPathNodes.push(pathToCheckout[i]);
  }
  
  if (pathToCheckout.length > 0) {
    totalDistance += pathToCheckout[pathToCheckout.length - 1].g;
  }
  
  // Generate step-by-step directions
  const steps = generateDirections(allPathNodes, sortedItems);
  
  // Calculate estimated time (assuming 3 feet per second walking speed)
  const estimatedTime = Math.round((totalDistance * 0.3) / 3); // Convert to seconds
  
  return {
    totalDistance: Math.round(totalDistance),
    totalSteps: steps.length,
    estimatedTime,
    steps
  };
};
