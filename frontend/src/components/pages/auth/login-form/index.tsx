import React, { useState, useContext } from "react";
import { Form, Header } from "semantic-ui-react";
import { UserContext } from "../../../../context-providers";
import { isValidEmail } from "../../../../utils/validators";
import {
  echoMissingFields,
  echoIncorrectFields,
  echoSuccessfulMessage,
  echoUnknownError,
} from "../../../../utils/toast-messages";
import "./index.scss";

type Props = {
  onForgetPassword: () => void;
};

function LoginForm({ onForgetPassword }: Props) {
  const { setName, setRole, setToken, setProfilePic } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    if (!email || !password) {
      echoMissingFields("email", "password");
      return;
    }
    if (!isValidEmail(email)) {
      echoIncorrectFields("email", "password");
      return;
    }

    setName("Jeremy");
    setToken("dsdsd");
    echoSuccessfulMessage("signed in");
  };

  return (
    <Form onSubmit={onLogin}>
      <Header>Sign In</Header>
      <Form.Input
        icon="mail"
        iconPosition="left"
        placeholder="Email"
        type="email"
        onChange={(event, { value }) => setEmail(value)}
      />
      <Form.Input
        icon="lock"
        iconPosition="left"
        placeholder="Password"
        type="password"
        onChange={(event, { value }) => setPassword(value)}
      />
      <Form.Field
        className="login-form-forget-password-label"
        onClick={onForgetPassword}
        content="Forget password?"
      />
      <Form.Button type="submit" primary fluid content="Login" />
    </Form>
  );
}

export default LoginForm;
