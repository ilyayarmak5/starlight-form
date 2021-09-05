/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState } from "react";
import { useField } from "formik";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import helpers from "./helpers";
import theme from "../../theme";

export default ({ name, label }) => {
  const [field, { error, touched }] = useField(name);
  const [showPassword, setShowPassword] = useState(false);
  const {
    wrapperClasses,
    fieldClasses,
    labelSpanClasses,
    errorContent
  } = helpers("text", field, error, touched);
  return (
    <div className={wrapperClasses}>
      <div className={fieldClasses}>
        {label && (
          <label htmlFor={name}>
            <span className={labelSpanClasses}>{label}</span>
          </label>
        )}
        <input type={showPassword ? "text" : "password"} {...field} />
        <button
          css={css`
            border: 0;
            background: none;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            padding-top: 20px;
            padding-right: ${theme.spacing.small};
          `}
          onClick={e => {
            e.preventDefault();
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </button>
      </div>
      {touched && error && (
        <span
          css={css`
            ${theme.mixins.error}
          `}
        >
          {errorContent}
        </span>
      )}
    </div>
  );
};
