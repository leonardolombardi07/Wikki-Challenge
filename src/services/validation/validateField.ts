import { validator } from "./Validator";
import { fields } from "./fields";
// Types
import { ValidFields } from "../../types/services/validation";

export const validateField = (value: string, field: ValidFields) =>
  !value ? validateEmptyField(field) : validateNotEmptyField(value, field);

function validateEmptyField(field: ValidFields) {
  return fields[field].empty;
}

function validateNotEmptyField(value: string, field: ValidFields) {
  const regex = fields[field].regex;
  const errorMessage = fields[field].common;

  if (field === "email")
    return !validator.isValidRegex(value, regex) && errorMessage;

  if (field === "password")
    return validator.isShorterThan(value, 8)
      ? "Sua senha deve conter ao menos 8 caracteres"
      : !validator.isValidRegex(value, regex) && errorMessage;
}
