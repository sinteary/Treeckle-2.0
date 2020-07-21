import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useOpenId() {
  const startOpenIdAuth = useCallback(() => {
    let url = "https://openid.nus.edu.sg/server/";
    url +=
      "?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select";
    url +=
      "&openid.identity=http://specs.openid.net/auth/2.0/identifier_select";
    url += "&openid.mode=checkid_setup";
    url += "&openid.ns=http://specs.openid.net/auth/2.0";
    url += "&openid.sreg.required=email,nickname,fullname";
    url +=
      "&openid.identity=http://specs.openid.net/auth/2.0/identifier_select";
    url += "&openid.return_to=http://localhost:3000/openid";
    window.open(url, "_self");
  }, []);

  return [startOpenIdAuth];
}

export function useScrollToTop(
  showScrollYOffset?: number
): [boolean, (behavior: "auto" | "smooth") => void] {
  const [showScroll, setShowScroll] = useState(false);

  const onScroll = useCallback(() => {
    if (showScrollYOffset === undefined) {
      return;
    }

    if (!showScroll && window.pageYOffset > showScrollYOffset) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= showScrollYOffset) {
      setShowScroll(false);
    }
  }, [showScroll, setShowScroll, showScrollYOffset]);

  const scrollToTop = useCallback(
    (behavior: "auto" | "smooth" = "auto") =>
      window.scrollTo({ top: 0, left: 0, behavior }),
    []
  );

  useEffect(scrollToTop, [scrollToTop]);

  useEffect(() => {
    if (showScrollYOffset !== undefined && showScrollYOffset >= 0) {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [onScroll, showScrollYOffset]);

  return [showScroll, scrollToTop];
}
