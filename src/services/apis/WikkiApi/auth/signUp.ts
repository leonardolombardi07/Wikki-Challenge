interface SignUpDTO {
  email: string;
  password: string;
}

export const signUp = async (signUpDTO: SignUpDTO): Promise<void> => {
  try {
    // We need to actually make a post request sending
    // signUpDTO to the right endpoint
    // await WikkiApi.post("/signup", signUpDTO);
  } catch (error) {
    throw error;
  }
};
