/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useField } from "formik";
import InputMask from "react-input-mask";
import helpers from "./helpers";
import theme from "../../theme";

export default ({ name, label, mask, suffix }) => {
  const [field, { error, touched }] = useField(name);
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
        <InputMask type="text" mask={mask} {...field} />
        {suffix && (
          <span
            css={css`
              position: absolute;
              right: 10px;
              bottom: 10px;
              font-size: 1rem;
              pointer-events: none;
            `}
          >
            {suffix}
          </span>
        )}
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
