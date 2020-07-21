import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Header, Transition } from "semantic-ui-react";
import {
  echoSuccessMessage,
  echoFieldErrorMessage,
  echoSubmittedFormError,
} from "../../../../utils/toast-messages";
import { LOGIN_PATH } from "../../../../routes";
import { isValidEmail } from "../../../../utils/validators";

function AccountCreationForm() {
  const history = useHistory();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserCreated, setUserCreated] = useState(false);
  const trimmedName = name.trim();

  const areValidFields =
    trimmedName !== "" && isValidEmail(email) && password.length >= 8;

  const onCreate = () => {
    if (!areValidFields) {
      echoFieldErrorMessage("Invalid", "name", "email", "password");
      return;
    } else if (isUserCreated) {
      echoSubmittedFormError();
      return;
    }
    echoSuccessMessage("Account created");
    console.log("ID:", id);
    setUserCreated(true);
  };

  return (
    <Form onSubmit={onCreate}>
      <Header>Create Account</Header>
      <Form.Input
        icon="user"
        iconPosition="left"
        placeholder="Name"
        value={name}
        onChange={(event, { value }) => setName(value)}
        disabled={isUserCreated}
      />
      <Form.Input
        icon="mail"
        iconPosition="left"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(event, { value }) => setEmail(value)}
        disabled={isUserCreated}
      />
      <Form.Input
        icon="lock"
        iconPosition="left"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(event, { value }) => setPassword(value)}
        disabled={isUserCreated}
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
        primary={!isUserCreated}
        secondary={isUserCreated}
        fluid
        content={`Create${isUserCreated ? "d" : ""}`}
        type="submit"
        disabled={!areValidFields || isUserCreated}
      />
      <Transition visible={isUserCreated} duration="300">
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

export default AccountCreationForm;
