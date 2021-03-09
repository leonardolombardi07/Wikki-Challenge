import React from "react";
// Hooks
import { useAddProduct } from "./useAddProduct";
// Components
import { Grid, Header, Message, Segment } from "semantic-ui-react";
import { FormContainer, Input, SubmitButton } from "../../../components";
// Types
import { AddProductForm } from "../../../redux/products";
import { FormikErrors } from "formik";
import { validateField } from "../../../services/validation";
import { ValidFields } from "../../../types/services/validation";

const initialFormValues: AddProductForm = { name: "", price: 0 };

export const AddOrderForm: React.FC = () => {
  const { isLoading, error, addProduct } = useAddProduct();
  return (
    <Grid
      textAlign="center"
      style={{ minHeight: "70vh", padding: 20 }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 800 }}>
        <Header
          textAlign="center"
          size={"huge"}
          style={{ marginBottom: 30 }}
        >
          Adicione um produto
        </Header>

        <Segment stacked>
          <FormContainer
            validate={validate}
            initialValues={initialFormValues}
            onSubmit={async (values) => {
              const { name, price } = values;
              addProduct({ name, price });
            }}
          >
            <Input
              name={"name"}
              icon={"write"}
              placeholder={"Digite o nome do produto"}
            />

            <Input
              name={"price"}
              icon={"dollar sign"}
              placeholder={"Digite o preço"}
            />

            <SubmitButton loading={isLoading} type={"submit"}>
              Adicionar Produto
            </SubmitButton>
          </FormContainer>
        </Segment>

        <RequestError error={error} />
      </Grid.Column>
    </Grid>
  );
};

const RequestError: React.FC<{ error: string | null }> = ({ error }) => {
  if (!error) return null;
  return <Message negative>{error}</Message>;
};

function validate(values: AddProductForm): FormikErrors<AddProductForm> {
  let errors: FormikErrors<AddProductForm> = {};
  const nameError = validateField(values.name, ValidFields.productName);
  if (nameError) {
    errors.name = nameError;
  }
  const priceError = values.price > 0 && values.price < 100000;
  if (priceError) {
    errors.price = "O preço deve estar entre $0 e $100000";
  }
  return errors;
}
