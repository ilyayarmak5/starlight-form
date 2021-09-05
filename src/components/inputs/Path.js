/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useRef, useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import debounce from "debounce-promise";
import theme from "../../theme";
import helpers from "./helpers";

import slugify from "../../utils/slugify";

// Performing validation in the field itself for async paths
// This input will send back _pending or _invalid to formik which can be caught by the validation

const fetchPath = async (value, name) => {
  const config = window.config;
  if (!value) {
    return false;
  }
  try {
    const result = await fetch(
      `${config.apiBaseUrl}utils/profile-url/?campaignUuid=${config.campaignUuid}&name=${name}&url=${value}`
    );
    const res = await result.json();
    if (res) {
      return res;
    }
    return { available: false };
  } catch (e) {
    console.log(e);
    return { available: false };
  }
};

const validatePath = async (path, name = "", updateField) => {
  // Mark the path as fetching
  updateField("pending");
  const { available } = await fetchPath(path, name);
  updateField(available ? "valid" : "invalid");
};

const debouncedValidatePath = debounce(validatePath, 300);

export default ({ name, label, suggestName }) => {
  const [field, { error, touched }] = useField(name);
  const [value, setValue] = useState("");
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const fieldValue = useRef(field.value || "");

  const { wrapperClasses, fieldClasses, labelSpanClasses, errorContent } =
    helpers("number", field, error, touched);

  useEffect(() => {
    const defaultPath = slugify(suggestName);
    if (suggestName && !field.value) {
      fetchPath(defaultPath, suggestName).then((res) => {
        if (res.available) {
          setValue(defaultPath);
          fieldValue.current = defaultPath;
          setFieldValue(name, defaultPath);
        } else if (res.suggestions) {
          setValue(res.suggestions[0]);
          fieldValue.current = res.suggestions[0];
          setFieldValue(name, res.suggestions[0]);
        }
      });
    }
    // We want this effect to run like a componentDidMount instead of on dep change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // <div
    //   css={css`
    //     position: relative;
    //   `}
    //   >
    <div>
      <div className={wrapperClasses}>
        <div
          className={fieldClasses}
          css={css`
            font-size: 1.4rem !important;

            input {
              margin: 0;
            }
          `}
        >
          {label && <label htmlFor={name}>{label}</label>}
          <input
            type="text"
            {...field}
            value={value}
            // css={css`
            //   margin: 0 !important;
            // `}
            onChange={(e) => {
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
              debouncedValidatePath(
                inputValue,
                suggestName || "",
                (response) => {
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
                }
              );
            }}
            css={css`
              font-size: 1.3rem;
              padding: 5px;
              padding-left: 20px;
              border: 1px solid ${theme.colors.primary};
              ${touched &&
              error &&
              error !== "_pending" &&
              `border-color: ${theme.colors.red}`}
            `}
          />
          <span
            css={css`
              position: absolute;
              left: 20px;
              width: 10px;
              font-weight: 600 !important;
              pointer-events: none;
              font-size: 1.6rem;
              top: 30%;
            `}
          >
            /
          </span>
        </div>
        <div
          css={css`
            margin-bottom: ${theme.spacing.small};
            margin-top: ${theme.spacing.medium};
          `}
        >
          gobig.org.au/{value}
        </div>
        {touched && error && error !== "_pending" && (
          <span
            css={css`
              color: ${theme.colors.red};
            `}
          >
            {error}
          </span>
        )}
      </div>
      {touched && error && error === "_pending" && (
        <span
          css={css`
            color: ${theme.colors.teal};
          `}
        >
          Checking...
        </span>
      )}
      {touched && !error && (
        <span
          css={css`
            color: ${theme.colors.green};
          `}
        >
          Yes, that's available :)
        </span>
      )}
    </div>
  );
};
