import React from "react";
// Hooks
import { useAddOrder } from "./useAddOrder";
// Components
import { Grid, Header, Form, Message, Segment } from "semantic-ui-react";
import { ProductDropdownInput } from "./ProductDropdownInput";
import { QuantityDropdown } from "./QuantityDropdown";
import {
  StyledInputErrorMessage,
  SubmitButton,
} from "../../../components";

export const AddOrderForm: React.FC = () => {
  const {
    isLoading,
    error,
    productError,
    quantityError,
    setProduct,
    setQuantity,
    handleSubmit,
  } = useAddOrder();
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
          Adicione um pedido
        </Header>

        <Segment stacked>
          <Form onSubmit={handleSubmit}>
            <Form.Field error={Boolean(productError)}>
              <label style={{ textAlign: "left" }}>Produto</label>
              <ProductDropdownInput
                onChangeOrSelect={(product) => setProduct(product)}
              />
            </Form.Field>
            <StyledInputErrorMessage>
              {productError}
            </StyledInputErrorMessage>

            <Form.Field error={quantityError}>
              <label style={{ textAlign: "left" }}>Quantidade</label>
              <QuantityDropdown
                onChange={(number) => setQuantity(number)}
              />
            </Form.Field>
            <StyledInputErrorMessage>
              {quantityError}
            </StyledInputErrorMessage>

            <SubmitButton loading={isLoading} type={"submit"}>
              Adicionar Pedido
            </SubmitButton>
          </Form>
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
