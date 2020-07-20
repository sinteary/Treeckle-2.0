import React, { useContext, useEffect } from "react";
import AccountCreationForm from "../account-creation-form";
import AuthLayout from "../auth-layout";
import { UserContext } from "../../../../context-providers";

function AccountCreationPage() {
  const { setUser } = useContext(UserContext);

  useEffect(() => setUser(null), [setUser]);

  return (
    <AuthLayout>
      <AccountCreationForm />
    </AuthLayout>
  );
}

export default AccountCreationPage;
