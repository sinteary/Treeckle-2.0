import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Header, Transition } from "semantic-ui-react";
import {
  echoSuccessMessage,
  echoFieldErrorMessage,
  echoSubmittedFormError,
} from "../../../../utils/toast-messages";
import { LOGIN_PATH } from "../../../../utils/route-path-constants";
import { isValidEmail } from "../../../../utils/validators";

function ResetPasswordForm() {
  const history = useHistory();
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordReset, setPasswordReset] = useState(false);

  const areValidFields = isValidEmail(email) && password.length >= 8;

  const onCreate = () => {
    if (!areValidFields) {
      echoFieldErrorMessage("Invalid", "email", "password");
      return;
    } else if (isPasswordReset) {
      echoSubmittedFormError();
      return;
    }
    echoSuccessMessage("Password has been reset");
    console.log("ID:", id);
    setPasswordReset(true);
  };

  return (
    <Form onSubmit={onCreate}>
      <Header>Reset Password</Header>
      <Form.Field
        className="black-text"
        content="Please enter your account email and new password."
      />
      <Form.Input
        icon="mail"
        iconPosition="left"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(event, { value }) => setEmail(value)}
        disabled={isPasswordReset}
      />
      <Form.Input
        icon="lock"
        iconPosition="left"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(event, { value }) => setPassword(value)}
        disabled={isPasswordReset}
      />
      <Transition
        visible={password !== "" && password.length < 8}
        duration="300"
      >
        <Form.Field
          className="red-text"
          content="Password is less than 8 characters"
        />
      </Transition>
      <Form.Button
        primary={!isPasswordReset}
        secondary={isPasswordReset}
        fluid
        content={isPasswordReset ? "Password changed" : "Reset"}
        type="submit"
        disabled={!areValidFields || isPasswordReset}
      />
      <Transition visible={isPasswordReset} duration="300">
        <Form.Button
          onClick={() => history.push(LOGIN_PATH)}
          type="button"
          primary
          fluid
          content="Login here"
        />
      </Transition>
    </Form>
  );
}

export default ResetPasswordForm;
