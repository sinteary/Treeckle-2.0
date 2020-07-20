import React, { useContext, useEffect } from "react";
import ResetPasswordForm from "../reset-password-form";
import AuthLayout from "../auth-layout";
import { UserContext } from "../../../../context-providers";

function ResetPasswordPage() {
  const { setUser } = useContext(UserContext);

  useEffect(() => setUser(null), [setUser]);

  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
}

export default ResetPasswordPage;
