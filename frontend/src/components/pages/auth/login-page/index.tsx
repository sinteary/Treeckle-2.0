import React, { useState } from "react";
import AuthLayout from "../auth-layout";
import LoginForm from "../login-form";
import ForgetPasswordForm from "../forget-password-form";

function LoginPage() {
  const [forgetPassword, setForgetPassword] = useState(false);

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
