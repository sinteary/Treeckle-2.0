import { toast } from "react-toastify";

export const echoFieldErrorMessage = (
  errorHeader: string,
  ...fieldNames: string[]
) => {
  const fields = fieldNames.join("/");
  toast.error(
    `${errorHeader} ${fields ? fields + " " : ""}field${
      fieldNames.length !== 1 ? "s" : ""
    }.`
  );
};

export const echoSuccessMessage = (message: string) => {
  toast.success(`${message} successfully.`);
};

export const echoUnknownError = () => {
  toast.error("Unknown error. Please try again.");
};

export const echoSubmittedFormError = () => {
  toast.error(
    "The form has already been submitted. Please refresh to submit another form."
  );
};
