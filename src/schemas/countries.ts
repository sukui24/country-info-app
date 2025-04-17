import Joi from "joi";
import { CountryBordersDTO } from "../types/dto/countries/CountryBordersDTO";
import { CountryFlagDTO } from "../types/dto/countries/CountryFlagDTO";
import {
  CountryPopulationDTO,
  CountryPopulationRequestPayload,
  PopulationCountDTO,
} from "../types/dto/countries/CountryPopulationDTO";

export const countryBordersSchema = Joi.object<CountryBordersDTO>({
  borders: Joi.array().items(Joi.object()).required(),
});

export const countryPopulationSchema =
  Joi.object<CountryPopulationRequestPayload>({
    data: Joi.object<CountryPopulationDTO>({
      code: Joi.string().required(),
      populationCounts: Joi.array().items(
        Joi.object<PopulationCountDTO>({
          value: Joi.number().required(),
          year: Joi.number().required(),
        })
      ),
    }),
  });

export const countryFlagSchema = Joi.object<CountryFlagDTO>({
  data: Joi.object({
    flag: Joi.string().required(),
  }),
});
