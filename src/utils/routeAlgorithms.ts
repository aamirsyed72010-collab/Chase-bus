import { Route } from '@/data/routes';

export interface RouteSegment {
  from: string;
  to: string;
  routeName: string;
  busType: string;
  duration: number; // in minutes
  cost: number;
  distance: number; // in km
}

export interface RouteOption {
  id: string;
  segments: RouteSegment[];
  totalDuration: number;
  totalCost: number;
  totalDistance: number;
  transfers: number;
  crowdingLevel: 'low' | 'medium' | 'high';
  recommended?: boolean;
  routeType: 'fastest' | 'cheapest' | 'least-transfers';
}

interface GraphNode {
  stop: string;
  routes: Array<{
    route: Route;
    nextStop: string;
    duration: number;
    cost: number;
    distance: number;
  }>;
}

/**
 * Build a graph from available routes
 */
function buildRouteGraph(routes: Route[]): Map<string, GraphNode> {
  const graph = new Map<string, GraphNode>();

  routes.forEach(route => {
    const stops = [route.from, ...(route.stops || []), route.to];
    
    for (let i = 0; i < stops.length - 1; i++) {
      const currentStop = stops[i];
      const nextStop = stops[i + 1];
      
      if (!graph.has(currentStop)) {
        graph.set(currentStop, { stop: currentStop, routes: [] });
      }
      
      const node = graph.get(currentStop)!;
      
      // Estimate duration, cost, and distance per segment
      const segmentDuration = 15 + Math.random() * 10; // 15-25 min per segment
      const segmentCost = route.busType === 'Express' ? 25 : route.busType === 'Deluxe' ? 35 : 15;
      const segmentDistance = 5 + Math.random() * 5; // 5-10 km per segment
      
      node.routes.push({
        route,
        nextStop,
        duration: segmentDuration,
        cost: segmentCost,
        distance: segmentDistance
      });
    }
  });

  return graph;
}

/**
 * Find path using modified Dijkstra's algorithm
 */
function findPath(
  graph: Map<string, GraphNode>,
  origin: string,
  destination: string,
  optimizeFor: 'duration' | 'cost' | 'transfers'
): RouteSegment[] | null {
  const distances = new Map<string, number>();
  const previous = new Map<string, { stop: string; segment: RouteSegment } | null>();
  const unvisited = new Set<string>();

  // Initialize
  graph.forEach((_, stop) => {
    distances.set(stop, Infinity);
    previous.set(stop, null);
    unvisited.add(stop);
  });
  distances.set(origin, 0);

  while (unvisited.size > 0) {
    // Find unvisited node with minimum distance
    let current: string | null = null;
    let minDist = Infinity;
    
    unvisited.forEach(stop => {
      const dist = distances.get(stop)!;
      if (dist < minDist) {
        minDist = dist;
        current = stop;
      }
    });

    if (current === null || current === destination) break;
    if (minDist === Infinity) break; // No path exists

    // TypeScript: current is guaranteed to be a string here
    const currentStop: string = current;
    unvisited.delete(currentStop);

    const node = graph.get(currentStop);
    if (!node) continue;

    // Check all neighbors
    node.routes.forEach(({ route, nextStop, duration, cost, distance }) => {
      if (!unvisited.has(nextStop)) return;

      // Calculate weight based on optimization criteria
      let weight = 0;
      switch (optimizeFor) {
        case 'duration':
          weight = duration;
          break;
        case 'cost':
          weight = cost;
          break;
        case 'transfers':
          weight = 50; // Fixed penalty for each segment (favors direct routes)
          break;
      }

      const newDist = distances.get(currentStop)! + weight;
      
      if (newDist < distances.get(nextStop)!) {
        distances.set(nextStop, newDist);
        previous.set(nextStop, {
          stop: currentStop,
          segment: {
            from: currentStop,
            to: nextStop,
            routeName: route.routeName,
            busType: route.busType || 'Town Bus',
            duration,
            cost,
            distance
          }
        });
      }
    });
  }

  // Reconstruct path
  if (distances.get(destination) === Infinity) return null;

  const path: RouteSegment[] = [];
  let current = destination;

  while (current !== origin) {
    const prev = previous.get(current);
    if (!prev) return null;
    
    path.unshift(prev.segment);
    current = prev.stop;
  }

  return path;
}

/**
 * Calculate crowding level based on time of day and route type
 */
function calculateCrowding(segments: RouteSegment[]): 'low' | 'medium' | 'high' {
  const hour = new Date().getHours();
  const isPeakHour = (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 19);
  
  const hasExpress = segments.some(s => s.busType === 'Express');
  
  if (isPeakHour && !hasExpress) return 'high';
  if (isPeakHour && hasExpress) return 'medium';
  return 'low';
}

/**
 * Find multiple alternative routes between origin and destination
 */
export function findAlternativeRoutes(
  routes: Route[],
  origin: string,
  destination: string
): RouteOption[] {
  const graph = buildRouteGraph(routes);
  const alternatives: RouteOption[] = [];

  // Find fastest route
  const fastestPath = findPath(graph, origin, destination, 'duration');
  if (fastestPath && fastestPath.length > 0) {
    const totalDuration = fastestPath.reduce((sum, s) => sum + s.duration, 0);
    const totalCost = fastestPath.reduce((sum, s) => sum + s.cost, 0);
    const totalDistance = fastestPath.reduce((sum, s) => sum + s.distance, 0);
    
    alternatives.push({
      id: 'fastest',
      segments: fastestPath,
      totalDuration: Math.round(totalDuration),
      totalCost: Math.round(totalCost),
      totalDistance: Math.round(totalDistance * 10) / 10,
      transfers: fastestPath.length - 1,
      crowdingLevel: calculateCrowding(fastestPath),
      routeType: 'fastest',
      recommended: true
    });
  }

  // Find cheapest route
  const cheapestPath = findPath(graph, origin, destination, 'cost');
  if (cheapestPath && JSON.stringify(cheapestPath) !== JSON.stringify(fastestPath)) {
    const totalDuration = cheapestPath.reduce((sum, s) => sum + s.duration, 0);
    const totalCost = cheapestPath.reduce((sum, s) => sum + s.cost, 0);
    const totalDistance = cheapestPath.reduce((sum, s) => sum + s.distance, 0);
    
    alternatives.push({
      id: 'cheapest',
      segments: cheapestPath,
      totalDuration: Math.round(totalDuration),
      totalCost: Math.round(totalCost),
      totalDistance: Math.round(totalDistance * 10) / 10,
      transfers: cheapestPath.length - 1,
      crowdingLevel: calculateCrowding(cheapestPath),
      routeType: 'cheapest'
    });
  }

  // Find route with least transfers
  const leastTransfersPath = findPath(graph, origin, destination, 'transfers');
  if (leastTransfersPath && 
      JSON.stringify(leastTransfersPath) !== JSON.stringify(fastestPath) &&
      JSON.stringify(leastTransfersPath) !== JSON.stringify(cheapestPath)) {
    const totalDuration = leastTransfersPath.reduce((sum, s) => sum + s.duration, 0);
    const totalCost = leastTransfersPath.reduce((sum, s) => sum + s.cost, 0);
    const totalDistance = leastTransfersPath.reduce((sum, s) => sum + s.distance, 0);
    
    alternatives.push({
      id: 'least-transfers',
      segments: leastTransfersPath,
      totalDuration: Math.round(totalDuration),
      totalCost: Math.round(totalCost),
      totalDistance: Math.round(totalDistance * 10) / 10,
      transfers: leastTransfersPath.length - 1,
      crowdingLevel: calculateCrowding(leastTransfersPath),
      routeType: 'least-transfers'
    });
  }

  return alternatives;
}
