import { Route } from "@/data/routes";

export const shareRoute = async (route: Route) => {
  const shareData = {
    title: `Bus Route: ${route.routeName}`,
    text: `Check out this bus route: ${route.routeName} from ${route.from} to ${route.to}. ETA: ${route.eta || 'N/A'}`,
    url: window.location.href, // Or a specific route URL if available
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback to clipboard
      const textToCopy = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
      await navigator.clipboard.writeText(textToCopy);
      alert('Route details copied to clipboard!');
    }
  } catch (error) {
    console.error('Error sharing route:', error);
  }
};
