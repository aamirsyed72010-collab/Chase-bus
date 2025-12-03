import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "busTracker": "Bus Tracker",
      "welcome": "Welcome, {{displayName}}",
      "logout": "Logout",
      "admin": "Admin",
      "signInToContinue": "Please sign in to continue",
      "signInWithGoogle": "Sign in with Google",
      "loading": "Loading...",
      "busTimingsForBhuvanagiri": "Bus Timings for Bhuvanagiri",
      "adminSettings": "Admin Settings",
      "addNewRoute": "Add New Route",
      "routeName": "Route Name",
      "from": "From",
      "to": "To",
      "timings": "Timings",
      "actions": "Actions",
      "edit": "Edit",
      "delete": "Delete",
      "addBusRoute": "Add New Bus Route",
      "timingsCommaSeparated": "Timings (comma separated)",
      "cancel": "Cancel",
      "addRoute": "Add Route",
      "failedToFetchBusTimings": "Failed to fetch bus timings.",
      "routeAddedSuccessfully": "Route added successfully!",
      "failedToAddRoute": "Failed to add route.",
      "planJourney": "Plan Journey",
      "searchRoutes": "Search Routes",
      "selectStops": "Select Stops",
      "addStop": "Add Stop",
      "findRoute": "Find Route",
      "routeDetails": "Route Details",
      "sortBy": "Sort By",
      "origin": "Origin",
      "destination": "Destination",
      "name": "Name",
      "eta": "ETA",
      "distance": "Distance",
      "price": "Price",
      "stops": "Stops",
      "busType": "Bus Type",
      "townBus": "Town Bus",
      "express": "Express",
      "deluxe": "Deluxe",
      "profile": "Profile",
      "stop": "Stop",
      "modify": "Modify"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

console.log('i18n initialized with resources:', Object.keys(resources.en.translation));

export default i18n;
