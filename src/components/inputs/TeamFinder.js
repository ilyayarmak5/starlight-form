/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState } from "react";
import { useField, useFormikContext } from "formik";
import Autocomplete from "react-autocomplete";
import debounce from "debounce-promise";
import helpers from "./helpers";
import theme from "../../theme";

const fetchTeams = async value => {
  const config = window.config;
  try {
    const result = await fetch(
      `${config.apiBaseUrl}campaigns/${
        config.campaignUuid
      }/profiles?type=GROUP&q=${value}`
    );
    const res = await result.json();
    if (res.data) {
      return res.data;
    }
    return [];
  } catch (e) {
    return [];
  }
};

const debouncedFetchTeams = debounce(fetchTeams, 300);

export default ({ name, label, placeholder }) => {
  const [field, { error, touched }] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [items, setItems] = useState([]);
  const { wrapperClasses, fieldClasses, labelSpanClasses } = helpers(
    "text",
    field,
    error,
    touched
  );
  return (
    <div className={wrapperClasses}>
      <div className={fieldClasses}>
        {label && (
          <label htmlFor={name}>
            <span className={labelSpanClasses}>{label}</span>
          </label>
        )}
        <Autocomplete
          {...field}
          items={items}
          getItemValue={item => item.uuid}
          wrapperStyle={{ display: "block" }}
          renderInput={props => {
            return (
              <input
                {...props}
                id="states-autocomplete"
                autoComplete="new-password"
                onBlur={() => setFieldTouched(name)}
                placeholder={placeholder}
              />
            );
          }}
          value={field.value.searchString || ""}
          renderItem={(item, isHighlighted) => (
            <div
              className={`item ${isHighlighted ? "item-highlighted" : ""}`}
              key={item.name}
              css={css`
                ${theme.mixins.autoCompleteItem}
                ${isHighlighted &&
                  theme.mixins
                    .autoCompleteItemHighlighted}
                &:hover {
                  ${theme.mixins.autoCompleteItemHighlighted}
                }
              `}
            >
              {item.name}
            </div>
          )}
          renderMenu={children => (
            <div className="autocomplete-menu">{children}</div>
          )}
          onChange={async (e, value) => {
            setFieldValue(name, { ...field.value, searchString: value });
            const fetchedTeams = await debouncedFetchTeams(value);
            setItems(fetchedTeams);
          }}
          onSelect={async (val, item) => {
            setFieldValue(name, {
              ...field.value,
              searchString: item.name,
              ...item
            });
          }}
        />
      </div>
      {touched &&
        error &&
        Object.keys(error).map(key => (
          <span
            key={key}
            css={css`
              ${theme.mixins.error}
            `}
          >
            <i className="material-icons">warning</i>
            {error[key]}
          </span>
        ))}
    </div>
  );
};
