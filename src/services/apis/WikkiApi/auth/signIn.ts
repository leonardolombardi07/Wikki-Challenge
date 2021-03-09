import { User } from "../types";

interface SignInDTO {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const signIn = async (
  signInDTO: SignInDTO
): Promise<SignInResponse> => {
  try {
    // We need to actually make a post request sending
    // signInDTO to the right endpoint, and receive the
    // authentication tokenns and user data as SignInResponse
    // const { data: SignInResponse }: AxiosSignInResponse<SignInResponse> = await WikkiApi.post(
    //   "/signin",
    //   signInDTO
    // );
    const fakeUser = { name: "Fake User", email: "fakeuser@email.com" };
    const fakeTokens = {
      accessToken: "12921asanskajk12",
      refreshToken: "9129sasj12939",
    };
    return {
      ...fakeTokens,
      user: fakeUser,
    };
  } catch (error) {
    throw error;
  }
};
