type Wind = { speed: string; direction: string };
type Temperature = {
    temperature: string;
    temperatureMax: string;
    temperatureMin: string;
    feelsLike: string;
};

export interface CardProps {
    name: string;
    iconId?: string;
    description?: string;
    temperature: Temperature;
    humidity: string;
    pressure: string;
    wind: Wind;
}
