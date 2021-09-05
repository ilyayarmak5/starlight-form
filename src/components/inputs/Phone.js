/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useField, useFormikContext } from "formik";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import helpers from "./helpers";
import theme from "../../theme";

export default ({ name, label, country }) => {
  const [field, { error, touched }] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const {
    wrapperClasses,
    fieldClasses,
    labelSpanClasses,
    errorContent
  } = helpers("phone", field, error, touched);

  return (
    <div className={wrapperClasses}>
      <div className={fieldClasses}>
        {label && (
          <label htmlFor={name}>
            <span className={labelSpanClasses}>{label}</span>
          </label>
        )}
        <PhoneInput
          {...field}
          onChange={value => setFieldValue(name, value)}
          country={country}
          onBlur={() => setFieldTouched(name, true)}
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
