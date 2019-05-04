import { CityDto } from './city.dto';

export interface AddressDto {
  id: number;
  name: string;
  number: number;
  complement: string;
  district: string;
  zipCode: string;
  city: CityDto;
}
