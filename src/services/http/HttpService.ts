import axios from "axios";
import Joi from "joi";

export class HttpService {
  constructor() {
    //
  }

  public async get<T>(
    url: string,
    schema: Joi.ObjectSchema<T> | Joi.ArraySchema<T>
  ): Promise<T | T[]> {
    const result = await axios.get(url);

    const { error, value } = schema.validate(result.data, {
      stripUnknown: true,
    });

    if (error) {
      throw new Error(`Something went wrong during request`);
    }

    return value;
  }

  public async post<T>(
    url: string,
    body: Record<string, string>,
    schema: Joi.ObjectSchema<T>
  ): Promise<T> {
    const result = await axios.post(url, body);

    const { error, value } = schema.validate(result.data, {
      stripUnknown: true,
    });

    if (error) {
      throw new Error(`Something went wrong during request`);
    }

    return value;
  }
}
