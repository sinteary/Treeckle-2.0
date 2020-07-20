import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";
import { isValidEmail } from "../../../../utils/validators";
import {
  echoFieldErrorMessage,
  echoUnknownError,
  echoSuccessMessage,
} from "../../../../utils/toast-messages";

type Props = {
  onBackToLogin: () => void;
};

function ForgetPasswordForm({ onBackToLogin }: Props) {
  const [email, setEmail] = useState("");

  const onReset = () => {
    if (!email) {
      echoFieldErrorMessage("Missing", "email");
      return;
    }
    if (!isValidEmail(email)) {
      echoFieldErrorMessage("Invalid", "email");
      return;
    }

    echoSuccessMessage("An email to reset your password has been sent");
    onBackToLogin();
  };

  return (
    <Form onSubmit={onReset}>
      <Header>Reset Password Request</Header>
      <Form.Field
        className="black-text"
        content="Please enter your account email so that we can send you a link to reset your password."
      />
      <Form.Input
        icon="mail"
        iconPosition="left"
        placeholder="Email"
        type="email"
        onChange={(event, { value }) => setEmail(value)}
      />
      <Form.Button
        disabled={!isValidEmail(email)}
        type="submit"
        primary
        fluid
        content="Submit"
      />
      <Form.Button
        type="button"
        onClick={onBackToLogin}
        secondary
        fluid
        content="Back"
      />
    </Form>
  );
}

export default ForgetPasswordForm;
