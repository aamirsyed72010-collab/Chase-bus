import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    resources: {
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
          "failedToAddRoute": "Failed to add route."
        }
      }
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
