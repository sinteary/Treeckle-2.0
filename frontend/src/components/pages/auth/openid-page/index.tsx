import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { useQuery } from "../../../../custom-hooks";
import { UserContext } from "../../../../context-providers";
import { HOME_PATH } from "../../../../routes";
import {
  echoSuccessMessage,
  echoErrorMessage,
} from "../../../../utils/toast-messages";

function OpenIdPage() {
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    const nusnetId = query.get("openid.sreg.nickname");
    const email = query.get("openid.sreg.email");
    const fullName = query.get("openid.sreg.fullname");

    //make api call to server to validate user
    if (nusnetId && email && fullName) {
      setUser({ name: fullName, token: "testToken" });
      echoSuccessMessage("Signed in");
      return;
    }

    history.push(HOME_PATH);
    const isCancelled = query.get("openid.mode") === "cancel";
    echoErrorMessage(isCancelled ? "Sign in cancelled." : "Invalid user.");
  }, [query, history, setUser]);

  return <Loader />;
}

export default OpenIdPage;
