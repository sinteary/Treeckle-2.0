import React, { useState, useContext, useEffect } from "react";
import AuthLayout from "../auth-layout";
import LoginForm from "../login-form";
import ForgetPasswordForm from "../forget-password-form";
import { UserContext } from "../../../../context-providers";

function LoginPage() {
  const { setUser } = useContext(UserContext);
  const [forgetPassword, setForgetPassword] = useState(false);

  useEffect(() => setUser(null), [setUser]);

  return (
    <AuthLayout>
      {forgetPassword ? (
        <ForgetPasswordForm onBackToLogin={() => setForgetPassword(false)} />
      ) : (
        <LoginForm onForgetPassword={() => setForgetPassword(true)} />
      )}
    </AuthLayout>
  );
}

export default LoginPage;
