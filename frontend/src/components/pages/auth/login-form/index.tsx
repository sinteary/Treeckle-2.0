import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Header } from "semantic-ui-react";
import { UserContext } from "../../../../context-providers";
import { isValidEmail } from "../../../../utils/validators";
import {
  echoFieldErrorMessage,
  echoSuccessMessage,
  echoUnknownError,
} from "../../../../utils/toast-messages";
import "./index.scss";
import { HOME_PATH } from "../../../../utils/route-path-constants";

type Props = {
  onForgetPassword: () => void;
};

function LoginForm({ onForgetPassword }: Props) {
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    if (!email || !password) {
      echoFieldErrorMessage("Missing", "email", "password");
      return;
    }
    if (!isValidEmail(email)) {
      echoFieldErrorMessage("Invalid", "email");
      return;
    }

    setUser({ name: "Jeremy", token: "asdasdas" });
    echoSuccessMessage("Signed in");
  };

  return (
    <Form onSubmit={onLogin}>
      <Header>Sign In</Header>
      <Form.Input
        icon="mail"
        iconPosition="left"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(event, { value }) => setEmail(value)}
      />
      <Form.Input
        icon="lock"
        iconPosition="left"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(event, { value }) => setPassword(value)}
      />
      <Form.Field
        className="login-form-forget-password-label"
        onClick={onForgetPassword}
        content="Forget password?"
      />
      <Form.Button type="submit" primary fluid content="Login" />
      <Form.Button
        onClick={() => history.push(HOME_PATH)}
        type="button"
        fluid
        content="Home"
      />
    </Form>
  );
}

export default LoginForm;
