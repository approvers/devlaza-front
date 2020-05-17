import * as React from "react";
import TextFieldTemplate, { TextFieldProps } from "@material-ui/core/TextField";

export const TextInputField = (props: TextFieldProps) => (
  <TextFieldTemplate
    margin="normal"
    multiline
    variant="outlined"
    fullWidth
    {...props}
  />
);
