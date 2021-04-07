import { Validator } from "./validators";

/*====================*/

export default function runValidators(value: string, validators: Array<Validator>) {
  for (let validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
}
