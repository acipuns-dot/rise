export interface WeatherData {
    temp: number;
    humidity: number;
    condition: string;
    isHot: boolean;
}

export async function getLocalWeather(lat: number, lon: number): Promise<WeatherData> {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    if (!API_KEY) {
        // Return default mild weather if no API key is provided
        return {
            temp: 22,
            humidity: 50,
            condition: "Clear",
            isHot: false
        };
    }

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();

        return {
            temp: data.main.temp,
            humidity: data.main.humidity,
            condition: data.weather[0].main,
            isHot: data.main.temp > 28 || data.main.humidity > 70
        };
    } catch (error) {
        console.error("Weather fetch failed:", error);
        return {
            temp: 22,
            humidity: 50,
            condition: "Clear",
            isHot: false
        };
    }
}

/**
 * Calculates water goal based on weight and heat/humidity
 * Base: 35ml per kg
 * Heat/Humidity: +500ml to +1000ml
 */
export function calculateWaterGoal(weightKg: number, isHot: boolean, ramadanActive: boolean): number {
    let base = weightKg * 0.035; // Liters

    if (isHot) base += 0.7; // Extra for heat
    if (ramadanActive) base += 0.3; // Extra for concentrated window hydration

    return parseFloat(base.toFixed(1));
}
