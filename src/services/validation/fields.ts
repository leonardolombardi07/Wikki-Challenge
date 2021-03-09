import {
  ValidFields,
  ValidationObject,
} from "../../types/services/validation";

type Fields = {
  [key in ValidFields]: ValidationObject;
};

export const fields: Fields = {
  name: {
    regex: /^[A-Za-z\d]*/,
    empty: "Insira um nome",
    common: "Seu nome só pode conter caractéres comuns",
  },
  password: {
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*/,
    empty: "Insira uma senha",
    common: "Sua senha deve conter letras e números",
  },
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    common: "Seu e-mail deve conter @ e domínio",
    empty: "Insira um e-mail",
  },
  product: {
    regex: /^[A-Za-z\d]*/,
    empty: "Insira um produto",
    common: "Seu produto só pode conter caractéres comuns",
  },
  productName: {
    regex: /^[A-Za-z\d]*/,
    empty: "Insira um nome para o produto",
    common: "O nome do produto só pode conter caractéres comuns",
  },
};
