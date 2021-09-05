/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useRef, useState } from "react";
import { useField, useFormikContext } from "formik";
import debounce from "debounce-promise";
import theme from "../../theme";
import helpers from "./helpers";

// Performing validation in the field itself for async emails
// This input will send back _pending or _invalid to formik which can be caught by the validation

const fetchEmail = async value => {
  const config = window.config;
  if (!value) {
    return false;
  }
  try {
    const result = await fetch(`${config.apiBaseUrl}check-user`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        data: {
          email: value
        },
        campaignUuid: config.campaignUuid
      })
    });
    const res = await result.json();
    if (res) {
      return { taken: res.data.status === "EXISTS" };
    }
    return { taken: false };
  } catch (e) {
    return { taken: false };
  }
};

const validateEmail = async (email, updateField) => {
  // Mark the path as fetching
  updateField("pending");
  const { taken } = await fetchEmail(email);
  updateField(!taken ? "valid" : "invalid");
};

const debouncedValidateEmail = debounce(validateEmail, 300);

export default ({ name, label }) => {
  const [field, { error, touched }] = useField(name);
  const {
    wrapperClasses,
    fieldClasses,
    labelSpanClasses,
    errorContent
  } = helpers("text", field, error === "_pending" ? null : error, touched);

  const [value, setValue] = useState(field.value || "");
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const fieldValue = useRef(field.value || "");

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
          value={value}
          onChange={e => {
            // Set the field value
            setValue(e.target.value);

            // Update the ref for making sure error is current
            fieldValue.current = e.target.value;

            // Set field touched too for immediate feedback
            setFieldTouched(name, true);

            const { value: inputValue } = e.target;

            // Set the validation
            // Always set an initial pending to catch debounce race condition
            setFieldValue(name, "_pending");
            debouncedValidateEmail(inputValue, response => {
              if (inputValue === fieldValue.current) {
                // If not, the field has changed since the validation started
                if (response === "pending") {
                  setFieldValue(name, "_pending");
                } else if (response === "invalid") {
                  setFieldValue(name, "_invalid");
                } else {
                  setFieldValue(name, inputValue);
                }
              }
            });
          }}
        />
      </div>
      {touched && error && error !== "_pending" && (
        <span
          css={css`
            ${theme.mixins.error}
          `}
        >
          {errorContent}
        </span>
      )}
      {touched && error && error === "_pending" && (
        <span
          css={css`
            ${theme.mixins.error}
            color: ${theme.colors.teal};
          `}
        >
          Checking...
        </span>
      )}
    </div>
  );
};
