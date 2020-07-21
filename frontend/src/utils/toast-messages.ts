import { toast } from "react-toastify";

export function echoFieldErrorMessage(
  errorHeader: string,
  ...fieldNames: string[]
) {
  const fields = fieldNames.join("/");
  toast.error(
    `${errorHeader} ${fields ? fields + " " : ""}field${
      fieldNames.length !== 1 ? "s" : ""
    }.`
  );
}

export function echoSuccessMessage(message: string) {
  toast.success(`${message} successfully.`);
}

export function echoUnknownError() {
  toast.error("Unknown error. Please try again.");
}

export function echoSubmittedFormError() {
  toast.error(
    "The form has already been submitted. Please refresh to submit another form."
  );
}

export function echoErrorMessage(message: string) {
  toast.error(message);
}
