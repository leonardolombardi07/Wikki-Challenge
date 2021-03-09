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

interface SignUpFormProps {
  closeSignUpModal: () => void;
}

interface SignUpFormValues extends SignInFormValues {
  name: string;
}

const initialFormValues: SignUpFormValues = {
  name: "",
  email: "",
  password: "",
};

export const SignUpForm: React.FC<SignUpFormProps> = ({
  closeSignUpModal,
}) => {
  const { status, error, signUp } = useAuthModalForms();
  return (
    <Grid
      textAlign="center"
      style={{ minHeight: "60vh", padding: 15 }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black">
          <Image src={WikkiLogo} /> Cadastre-se
        </Header>

        <Segment stacked>
          <FormContainer
            validate={validate}
            initialValues={initialFormValues}
            onSubmit={(values, actions) => {
              const { name, email, password } = values;
              signUp({ name, email, password });
              actions.setSubmitting(false);
            }}
          >
            <Input name={"name"} icon={"user"} placeholder={"Nome"} />
            <Input name={"email"} icon={"mail"} placeholder={"E-mail"} />
            <Input
              name={"password"}
              icon={"lock"}
              placeholder={"Senha"}
              type="password"
            />

            <SubmitButton
              loading={status === RequestStatus.PENDING}
              type={"Submit"}
            >
              Cadastrar
            </SubmitButton>
          </FormContainer>
        </Segment>

        <RequestError error={error} />
        <Message>
          Já tem uma conta?{" "}
          <StyledLink onClick={closeSignUpModal}>
            Voltar ao Login
          </StyledLink>
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
  values: SignUpFormValues
): FormikErrors<SignUpFormValues> {
  let errors: FormikErrors<SignUpFormValues> = {};
  const nameError = validateField(values.name, ValidFields.name);
  if (nameError) {
    errors.name = nameError;
  }
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
