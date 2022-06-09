import { JsonProperty } from './json-property-decorator';

export class ResponseOjbect<T> {
  @JsonProperty('count')
  count?: number;
  @JsonProperty('next')
  next?: string;
  @JsonProperty('previous')
  previous?: string;
  @JsonProperty('message')
  message?: string;
  @JsonProperty('status_code')
  status_code?: string;
  @JsonProperty('status')
  status?: string;
  results?: T;
}
