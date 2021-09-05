/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useField, useFormikContext } from "formik";
import helpers from "./helpers";
import theme from "../../theme";

export default ({ name, label, largeCheckbox, className, style }) => {
  const [field, { error, touched }] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const { wrapperClasses, inlineClasses, errorClasses, errorContent } = helpers(
    "checkbox",
    field,
    error,
    touched
  );
  return (
    <div style={style}>
      <div
        className={`${wrapperClasses} ${inlineClasses} ${className}`}
        css={css`
          position: relative;
          margin-bottom: ${theme.spacing.small};
          display: flex;
          align-items: center;
          input {
            margin-right: 10px;
          }
        `}
      >
        <input
          type="checkbox"
          name={name}
          checked={field.value}
          id={name}
          onChange={() => setFieldValue(name, !field.value)}
          onBlur={() => setFieldTouched(name)}
          css={css`
            ${largeCheckbox &&
            `
              align-self: flex-start;
              flex-shrink: 0;
              width: 1.75em;
              height: 1.75em;
              -webkit-appearance: none;
              border: 2px solid ${theme.colors.purple};
              background: white;
              display: inline-block;
              vertical-align: baseline;
              &:checked {
                background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='black'><path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z'></path></svg>") no-repeat center / 1.33em;
              }
			  &:hover {
				cursor: pointer;
			  }
            `}
          `}
        />
        {label && (
          <label htmlFor={name}>
            <span>{label}</span>
          </label>
        )}
      </div>
      {touched && error && (
        <span
          className={errorClasses}
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
