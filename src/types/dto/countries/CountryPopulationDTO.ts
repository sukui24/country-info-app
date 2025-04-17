export interface PopulationCountDTO {
  year: number;
  value: number;
}

export interface CountryPopulationDTO {
  country: string;
  code: string;
  iso3: string;
  populationCounts: Array<PopulationCountDTO>;
}

export interface CountryPopulationRequestPayload {
  data: CountryPopulationDTO;
}
