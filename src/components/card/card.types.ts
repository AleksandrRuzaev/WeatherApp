type Wind = { speed: string; direction: string };

export interface CardProps {
    name: string;
    iconId?: string;
    description?: string;
    temperature: string;
    humidity: string;
    pressure: string;
    wind: Wind;
}
