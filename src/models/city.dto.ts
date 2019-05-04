import { StateDto } from './state.dto';

export interface CityDto {
  id: number;
  name: string;
  state?: StateDto;
}
