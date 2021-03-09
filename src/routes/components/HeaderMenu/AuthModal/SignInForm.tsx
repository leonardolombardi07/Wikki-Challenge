import React from "react";
// Hooks
import { useAuthModalForms } from "./useAuthModalForms";
// Components
import { Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import {
  FormContainer,
  Input,
  SubmitButton,
  StyledLink,
} from "../../../../components";
// Assets
import WikkiLogo from "../../../../assets/images/WikkiBrazilLogo/WikkiBrazilLogo.png";
// Utils
import { validateField } from "../../../../services/validation";
// Types
import { FormikErrors } from "formik";
import { SignInForm as SignInFormValues } from "../../../../redux/auth/thunks";
import { ValidFields } from "../../../../types/services/validation";
import { RequestStatus } from "../../../../types/redux";

interface SignInFormProps {
  openSignUpModal: () => void;
}

const initialFormValues: SignInFormValues = { email: "", password: "" };

export const SignInForm: React.FC<SignInFormProps> = ({
  openSignUpModal,
}) => {
  const { status, error, signIn } = useAuthModalForms();
  return (
    <Grid
      textAlign="center"
      style={{ minHeight: "60vh", padding: 15 }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          <Image src={WikkiLogo} /> Faça seu Login
        </Header>

        <Segment stacked>
          <FormContainer
            validate={validate}
            initialValues={initialFormValues}
            onSubmit={async (values) => {
              const { email, password } = values;
              await signIn({ email, password });
            }}
          >
            <Input name={"email"} icon={"mail"} placeholder={"E-mail"} />
            <Input
              name={"password"}
              icon={"lock"}
              placeholder={"Senha"}
              type="password"
            />
            <SubmitButton
              loading={status === RequestStatus.PENDING}
              type={"submit"}
            >
              Login
            </SubmitButton>
          </FormContainer>
        </Segment>

        <RequestError error={error} />
        <Message>
          Não tem uma conta?{" "}
          <StyledLink onClick={openSignUpModal}>Cadastre-se!</StyledLink>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

const RequestError: React.FC<{ error: string | null }> = ({ error }) => {
  if (!error) return null;
  return <Message negative>{error}</Message>;
};

function validate(
  values: SignInFormValues
): FormikErrors<SignInFormValues> {
  let errors: FormikErrors<SignInFormValues> = {};
  const emailError = validateField(values.email, ValidFields.email);
  if (emailError) {
    errors.email = emailError;
  }
  const passwordError = validateField(
    values.password,
    ValidFields.password
  );
  if (passwordError) {
    errors.password = passwordError;
  }
  return errors;
}
