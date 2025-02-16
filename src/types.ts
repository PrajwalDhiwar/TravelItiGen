export interface DayItinerary {
  morning: string[];
  afternoon: string[];
  evening: string[];
}

export interface Itinerary {
  days: DayItinerary[];
  tips: string[];
}

export interface ItineraryResponse {
  itinerary: Itinerary;
}