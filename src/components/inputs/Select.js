/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useField } from "formik";
import helpers from "./helpers";
import theme from "../../theme";

export default ({ name, label, options, noEmpty, emptyLabel }) => {
  const [field, { error, touched }] = useField(name);
  const {
    wrapperClasses,
    fieldClasses,
    labelSpanClasses,
    errorContent
  } = helpers("select", field, error, touched);
  return (
    <div className={wrapperClasses}>
      <div className={fieldClasses}>
        {label && (
          <label htmlFor={name}>
            <span className={labelSpanClasses}>{label}</span>
          </label>
        )}
        <select {...field}>
          {!noEmpty && <option value="">{emptyLabel}</option>}
          {Object.entries(options).map(([key, value]) => (
            <option value={key} key={key}>
              {value}
            </option>
          ))}
        </select>
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
