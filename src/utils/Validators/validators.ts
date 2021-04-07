export function minLength(length: number) {
  return function (value: string) {
    return value.length < length ? `Минимальная длина - ${length} символов.` : undefined;
  };
}

/*====================*/

export function maxLength(length: number) {
  return function (value: string) {
    return value.length > length ? `Максимальная длина - ${length} символов.` : undefined;
  };
}

/*====================*/

export function required(value: string) {
  return value.trim().length === 0 ? "Это обязательное поле." : undefined;
}

/*====================*/

export type Validator = (value: string) => string | undefined;
