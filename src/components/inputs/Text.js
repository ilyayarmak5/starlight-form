/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useField } from "formik";
import helpers from "./helpers";
import theme from "../../theme";

export default ({ name, label, onFocus }) => {
  const [field, { error, touched }] = useField(name);
  const { wrapperClasses, fieldClasses, labelSpanClasses, errorContent } =
    helpers("text", field, error, touched);

  return (
    <div className={wrapperClasses}>
      <div className={fieldClasses}>
        {label && (
          <label htmlFor={name}>
            <span className={labelSpanClasses}>{label}</span>
          </label>
        )}
        <input
          type="text"
          {...field}
          onFocus={(e) => {
            if (onFocus) {
              onFocus(e);
            }
            if (field.onFocus) {
              field.onFocus(e);
            }
          }}
        />
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
