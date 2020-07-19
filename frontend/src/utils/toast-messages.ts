import { toast } from "react-toastify";

export const echoMissingFields = (...fieldNames: string[]) => {
  const fields = fieldNames.join("/");
  toast.error(
    `Missing ${fields ? fields + " " : ""}field${
      fieldNames.length !== 1 ? "s" : ""
    }.`
  );
};

export const echoIncorrectFields = (...fieldNames: string[]) => {
  const fields = fieldNames.join("/");
  toast.error(
    `Incorrect ${fields ? fields + " " : ""}field${
      fieldNames.length !== 1 ? "s" : ""
    }.`
  );
};

export const echoSuccessfulMessage = (message: string) => {
  toast.success(`Successfully ${message}.`);
};

export const echoUnknownError = () => {
  toast.error("Unknown error. Please try again.");
};
