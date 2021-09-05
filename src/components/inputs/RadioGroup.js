/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useField, useFormikContext } from "formik";
import helpers from "./helpers";
import theme from "../../theme";

export default ({ name, label, options }) => {
  const [field, { error, touched }] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const {
    wrapperClasses,
    inlineClasses,
    labelSpanClasses,
    errorContent
  } = helpers("text", field, error, touched);
  return (
    <div
      className={`${wrapperClasses} ${inlineClasses}`}
      css={css`
        position: relative;
      `}
    >
      {label && (
        <label htmlFor={name}>
          <span
            className={labelSpanClasses}
            css={css`
              font-size: 1rem;
              margin-bottom: ${theme.spacing.small};
            `}
          >
            {label}
          </span>
        </label>
      )}
      {Object.entries(options).map(([key, value]) => (
        <div
          key={key}
          css={css`
            margin-bottom: ${theme.spacing.small};
            display: flex;
            align-items: center;
            input {
              margin-right: 10px;
            }
          `}
        >
          <input
            type="radio"
            name={name}
            value={key}
            id={`${name}-${key}`}
            checked={field.value === key}
            onChange={() => setFieldValue(name, key)}
            onBlur={() => setFieldTouched(name)}
          />
          <label htmlFor={`${name}-${key}`}>{value}</label>
        </div>
      ))}
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
