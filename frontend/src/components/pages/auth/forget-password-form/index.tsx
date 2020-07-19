import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";
import { isValidEmail } from "../../../../utils/validators";
import {
  echoMissingFields,
  echoIncorrectFields,
  echoUnknownError,
  echoSuccessfulMessage,
} from "../../../../utils/toast-messages";
import "./index.scss";

type Props = {
  onBackToLogin: () => void;
};

function ForgetPasswordForm({ onBackToLogin }: Props) {
  const [email, setEmail] = useState("");

  const onReset = () => {
    if (!email) {
      echoMissingFields("email");
      return;
    }
    if (!isValidEmail(email)) {
      echoIncorrectFields("email");
      return;
    }

    echoSuccessfulMessage("reset password");
    onBackToLogin();
  };

  return (
    <Form onSubmit={onReset}>
      <Header>Reset Password</Header>
      <Form.Field
        className="reset-password-description"
        content="Please key in your email so that we can send you a link to reset your password."
      />
      <Form.Input
        icon="mail"
        iconPosition="left"
        placeholder="Email"
        type="email"
        onChange={(event, { value }) => setEmail(value)}
      />
      <Form.Button type="submit" primary fluid content="Reset" />
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
