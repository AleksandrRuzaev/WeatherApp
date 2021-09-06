export default class WeatherService {
    public static getWeather(latitude: number, longitude: number) {
        return fetch(
            `${process.env.REACT_APP_API_URL}/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=d8ac7f1d840b57650c8d3317209350e7`,
        );
    }
}
