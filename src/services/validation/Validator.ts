class Validator {
  isValidRegex(value: string, regex: RegExp) {
    return regex.test(value);
  }

  isShorterThan(value: string, length: number) {
    return value.length < length;
  }
}

export const validator = new Validator();
