import React, { useState } from 'react';
import { Plane, Loader2, Sun, Cloud, Moon, LightbulbIcon, MapPin, Calendar } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { generateItinerary } from './lib/groq';
import { getCityInfo } from './lib/seasons';
import type { Itinerary, DayItinerary } from './types';

function DaySchedule({ day, index, startDate }: { day: DayItinerary; index: number; startDate: Date }) {
  const date = new Date(startDate);
  date.setDate(startDate.getDate() + index);
  const formattedDate = date.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
      <div className="bg-indigo-600 px-6 py-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Day {index + 1} - {formattedDate}
        </h3>
      </div>
      
      <div className="p-6 space-y-8">
        <section className="bg-orange-50 rounded-lg p-4 border border-orange-100">
          <div className="flex items-center mb-3">
            <Sun className="w-6 h-6 text-orange-500 mr-2" />
            <h4 className="text-xl font-semibold text-orange-700">Morning</h4>
          </div>
          <ul className="space-y-3 pl-8">
            {day.morning.map((activity, idx) => (
              <li key={idx} className="text-gray-700 relative">
                <span className="absolute -left-6 top-2 w-2 h-2 bg-orange-400 rounded-full"></span>
                {activity}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center mb-3">
            <Cloud className="w-6 h-6 text-blue-500 mr-2" />
            <h4 className="text-xl font-semibold text-blue-700">Afternoon</h4>
          </div>
          <ul className="space-y-3 pl-8">
            {day.afternoon.map((activity, idx) => (
              <li key={idx} className="text-gray-700 relative">
                <span className="absolute -left-6 top-2 w-2 h-2 bg-blue-400 rounded-full"></span>
                {activity}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center mb-3">
            <Moon className="w-6 h-6 text-purple-500 mr-2" />
            <h4 className="text-xl font-semibold text-purple-700">Evening</h4>
          </div>
          <ul className="space-y-3 pl-8">
            {day.evening.map((activity, idx) => (
              <li key={idx} className="text-gray-700 relative">
                <span className="absolute -left-6 top-2 w-2 h-2 bg-purple-400 rounded-full"></span>
                {activity}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function App() {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  const calculateDays = (): number => {
    if (!startDate || !endDate) return 1;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(Math.max(diffDays + 1, 1), 14); // Limit to 14 days
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) {
      toast.error('Please enter a city name');
      return;
    }

    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates');
      return;
    }

    const cityInfo = getCityInfo(city);
    if (!cityInfo) {
      toast.error('Please enter a supported city name');
      return;
    }

    const days = calculateDays();
    if (days > 14) {
      toast.error('Maximum trip duration is 14 days');
      return;
    }

    setLoading(true);
    try {
      const result = await generateItinerary(city, days, startDate);
      setItinerary(result);
    } catch (error) {
      toast.error('Failed to generate itinerary. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <Plane className="w-12 h-12 text-indigo-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">City Itinerary Generator</h1>
          <p className="text-gray-600 text-center max-w-2xl">
            Plan your perfect {calculateDays()}-day adventure with our AI-powered seasonal itinerary generator
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City Name
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Tokyo, Paris, New York"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip Dates
            </label>
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                minDate={new Date()}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg h-12"
                dateFormat="MMMM d, yyyy"
                placeholderText="Select date range"
              />
              <Calendar className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            {startDate && endDate && (
              <p className="mt-2 text-sm text-gray-600">
                Trip duration: {calculateDays()} days
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !startDate || !endDate}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Generating your {calculateDays()}-day itinerary...
              </>
            ) : (
              'Generate Itinerary'
            )}
          </button>
        </form>

        {itinerary && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="bg-indigo-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  {calculateDays()}-Day Itinerary for {city}
                </h2>
              </div>
            </div>

            {itinerary.days.map((day, index) => (
              <DaySchedule key={index} day={day} index={index} startDate={startDate} />
            ))}

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-green-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <LightbulbIcon className="w-5 h-5 mr-2" />
                  Local Tips & Recommendations
                </h3>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3 pl-8">
                  {itinerary.tips.map((tip, index) => (
                    <li key={index} className="text-gray-700 relative">
                      <span className="absolute -left-6 top-2 w-2 h-2 bg-green-400 rounded-full"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;