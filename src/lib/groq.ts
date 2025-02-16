import Groq from "groq-sdk";
import { getCityInfo } from './seasons';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
}); //Since I decided to build this on Github Codespaces beacause I am a chad. Clearly living life dangerously.

export async function generateItinerary(city: string, days: number = 1, startDate: Date): Promise<Itinerary> {
  const cityInfo = getCityInfo(city);
  const formattedDate = startDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric' 
  });

  const prompt = `Create a detailed ${days}-day itinerary for ${city} starting from ${formattedDate}. Consider the time of year, typical weather patterns, and seasonal events for this specific date in ${city}. 

For each day, include 4-5 specific activities for morning (7AM to 12PM), afternoon (12PM to 5PM), and evening (5PM to 11:30PM), with exact locations, timing suggestions, and brief descriptions. The itinerary should be highly specific to this time of year, considering:

1. Weather conditions typical for ${city} during ${formattedDate}
2. Seasonal festivals, events, or cultural celebrations happening around this time
3. Natural phenomena (e.g., cherry blossoms, autumn foliage, etc.) if applicable
4. Seasonal food specialties and local delicacies
5. Indoor/outdoor activity balance based on typical weather
6. Opening hours and seasonal closures of attractions
7. Seasonal transportation considerations

Format as JSON matching this type:
{
  "itinerary": {
    "days": [
      {
        "morning": string[],    // 4-5 morning activities with times and descriptions
        "afternoon": string[],  // 4-5 afternoon activities with times and descriptions
        "evening": string[]     // 4-5 evening activities with times and descriptions
      }
    ],
    "tips": string[]           // 5-7 local tips and recommendations
  }
}

Make activities detailed and specific, including:
- Time-appropriate activities for this specific date
- Exact locations and venue names
- Suggested timing for each activity
- Brief descriptions of what to expect
- Local food recommendations where appropriate
- Transportation suggestions between locations
- Cultural context where relevant
- Seasonal specialties and unique experiences`;

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    max_tokens: 4096,
    response_format: { type: "json_object" },
  });

  const response = JSON.parse(completion.choices[0]?.message?.content || "{}") as ItineraryResponse;
  return response.itinerary;
}
