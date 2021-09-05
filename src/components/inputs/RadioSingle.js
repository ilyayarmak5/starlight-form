/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useField, useFormikContext } from "formik";
import helpers from "./helpers";
import theme from "../../theme";

export default ({ name, label, value, showErrors = true, closeUi = false }) => {
  const [field, { error, touched }] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const { wrapperClasses, inlineClasses, errorContent } = helpers(
    "radio",
    field,
    error,
    touched
  );
  return (
    <div
      className={`${wrapperClasses} ${inlineClasses}`}
      css={css`
        position: relative;
        margin-bottom: ${theme.spacing.small};
        display: flex;
        align-items: center;
        background: white;
        border: 2px solid ${theme.colors.text};
        padding: ${theme.spacing.medium};
        border-radius: 10px;
        font-size: 1.2rem;
        color: ${theme.colors.text};
        opacity: 0.5;
        ${field.value === value &&
        `
          opacity: 1;
          border-color: ${theme.colors.purple};
          ${
            !closeUi &&
            `border-bottom: none;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;`
          }
        `}
        input {
          margin-right: 10px;
        }
      `}
    >
      <input
        type="radio"
        name={name}
        value={value}
        id={`${name}-${value}`}
        checked={field.value === value}
        onChange={() => setFieldValue(name, value)}
        onBlur={() => setFieldTouched(name)}
        css={css`
          &:checked,
          &:not(:checked) {
            position: absolute;
            left: -9999px;
          }
          &:checked + label,
          &:not(:checked) + label {
            position: relative;
            padding-left: 28px;
            cursor: pointer;
            line-height: 20px;
            display: inline-block;
            color: #666;
          }
          &:checked + label:before,
          &:not(:checked) + label:before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 21px;
            height: 21px;
            border: 2px solid ${theme.colors.text};
            border-radius: 100%;
            background: #fff;
          }
          &:checked + label:after,
          &:not(:checked) + label:after {
            content: "";
            width: 11px;
            height: 11px;
            background: ${theme.colors.text};
            position: absolute;
            top: 5px;
            left: 5px;
            border-radius: 100%;
            -webkit-transition: all 0.2s ease;
            transition: all 0.2s ease;
          }
          &:not(:checked) + label:after {
            opacity: 0;
            -webkit-transform: scale(0);
            transform: scale(0);
          }
          &:checked + label:after {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1);
          }
        `}
      />
      {label && (
        <label htmlFor={`${name}-${value}`}>
          <span
            css={css`
              font-weight: 300;
            `}
          >
            {label}
          </span>
        </label>
      )}
      {touched && error && (
        <span
          css={css`
            ${theme.mixins.error}
            margin-left: auto;
            margin-top: 0;
          `}
        >
          {errorContent}
        </span>
      )}
    </div>
  );
};
