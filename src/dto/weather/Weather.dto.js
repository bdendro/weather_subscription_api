export default class WeatherDto {
  constructor({ temperature, humidity, description }) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.description = description;
  }
}
