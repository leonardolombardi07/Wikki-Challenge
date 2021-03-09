import React from "react";
// Hooks
import { useEditProduct } from "./useEditProduct";
// Components
import { Grid, Header, Message, Segment } from "semantic-ui-react";
import {
  FormContainer,
  Input,
  SubmitButton,
} from "../../../../components";
// Types
import { AddProductForm } from "../../../../redux/products";
import { FormikErrors } from "formik";
import { validateField } from "../../../../services/validation";
import { ValidFields } from "../../../../types/services/validation";
import { Product } from "../../../../services/apis/WikkiApi";

const initialFormValues: AddProductForm = { name: "", price: 0 };

interface EditProductFormProps {
  productToEdit: Product;
}

export const EditProductForm: React.FC<EditProductFormProps> = ({
  productToEdit,
}) => {
  const { isLoading, error, editProduct } = useEditProduct();
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
          Editar produto {productToEdit.name}, Código {productToEdit.code}
        </Header>

        <Segment stacked>
          <FormContainer
            validate={validate}
            initialValues={initialFormValues}
            onSubmit={async (values) => {
              const { name, price } = values;
              editProduct({ ...productToEdit, name, price });
            }}
          >
            <Input
              name={"name"}
              icon={"write"}
              placeholder={productToEdit.name}
            />

            <Input
              name={"price"}
              icon={"dollar sign"}
              placeholder={String(productToEdit.price)}
            />

            <SubmitButton loading={isLoading} type={"submit"}>
              Editar Produto
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
