/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useField } from "formik";
import helpers from "./helpers";
import theme from "../../theme";

export default ({ name, label, onFocus, prepend, large }) => {
  const [field, { error, touched }] = useField(name);
  const { wrapperClasses, fieldClasses, labelSpanClasses, errorContent } =
    helpers("number", field, error, touched);

  return (
    <div className={wrapperClasses}>
      <div
        className={fieldClasses}
        // css={css`
        //   ${prepend &&
        //   `

        // `}
        // `}
      >
        {label && (
          <label htmlFor={name}>
            <span className={labelSpanClasses}>{label}</span>
          </label>
        )}
        <input
          type="number"
          {...field}
          css={css`
            ${prepend &&
            `
            padding: 5px 5px 5px 30px;
            color: ${theme.colors.text};
            `}
            .form-field & {
              ${large && `font-size: 1.6rem;`}
            }
          `}
          onFocus={(e) => {
            if (onFocus) {
              onFocus(e);
            }
            if (field.onFocus) {
              field.onFocus(e);
            }
          }}
        />
        {prepend && (
          <span
            css={css`
              position: absolute;
              top: 0;
              left: 20px;
              width: 15px;
              bottom: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              pointer-events: none;
              ${large && `font-size: 1.6rem;`}
            `}
          >
            {prepend}
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
