/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState } from "react";
import { useField, useFormikContext } from "formik";
import Autocomplete from "react-autocomplete";
import debounce from "debounce-promise";
import Text from "./Text";
import get from "lodash/get";
import helpers from "./helpers";
import theme from "../../theme";

// Addressfinder Key
const key = "HYCTLPB37N8MQWKR6G4A";

const fetchAddresses = async (value) => {
  const result = await fetch(
    `https://api.addressfinder.io/api/au/address/autocomplete?key=${key}&q=${value}&format=json&paf=1`
  );
  const res = await result.json();
  let newItems = [];

  if (res.completions) {
    newItems = res.completions.map((i) => {
      return {
        name: i.full_address,
        attr: i.id,
      };
    });
  }
  return newItems;
};

const debouncedFetchAddresses = debounce(fetchAddresses, 300);

const fetchAddressInfo = async (id) => {
  const result = await fetch(
    `https://api.addressfinder.io/api/au/address/info?key=${key}&format=json&id=${id}&paf=1`
  );
  const res = await result.json();
  return {
    searchString: res.full_address,
    address1: res.address_line_1,
    address2: res.address_line_2 || "",
    suburb: res.locality_name,
    state: res.state_territory,
    postcode: res.postcode,
    country: "AU",
  };
};

export default ({ name, label, includeOrganisation }) => {
  const [field, { error }] = useField(name);
  const [items, setItems] = useState([]);
  const [manualEntry, setManualEntry] = useState(false);
  const {
    setFieldValue,
    setFieldTouched,
    touched: touchedFields,
  } = useFormikContext();
  const touched = get(touchedFields, `${name}.searchString`);

  const { wrapperClasses, fieldClasses, labelSpanClasses } = helpers(
    "address",
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
          getItemValue={(item) => item.name}
          wrapperStyle={{ display: "block" }}
          renderInput={(props) => {
            return (
              <input
                {...props}
                id="states-autocomplete"
                autoComplete="new-password"
                onBlur={() => setFieldTouched(`${name}.searchString`)}
                placeholder="Start typing your address"
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
                ${isHighlighted && theme.mixins.autoCompleteItemHighlighted}
                &:hover {
                  ${theme.mixins.autoCompleteItemHighlighted}
                }
              `}
            >
              {item.name}
            </div>
          )}
          renderMenu={(children) => (
            <div className="autocomplete-menu">{children}</div>
          )}
          onChange={async (e, value) => {
            setFieldValue(name, {
              ...field.value,
              searchString: value,
            });
            const fetchedAddresses = await debouncedFetchAddresses(value);
            setItems(fetchedAddresses);
          }}
          onSelect={async (val, item) => {
            const addressInfo = await fetchAddressInfo(item.attr);
            setFieldValue(name, { ...field.value, ...addressInfo });
          }}
        />
      </div>
      {manualEntry ? (
        <div
          css={css`
            margin-top: ${theme.spacing.medium};
          `}
        >
          {includeOrganisation && (
            <Text
              name={`${name}.organisation`}
              label="Organisation Name (optional)"
            />
          )}
          <Text name={`${name}.address1`} label="Address 1" />
          <Text name={`${name}.address2`} label="Address 2 (optional)" />
          <Text name={`${name}.suburb`} label="Town/Suburb" />
          <Text name={`${name}.state`} label="State" />
          <Text name={`${name}.postcode`} label="Postcode" />
        </div>
      ) : (
        <button
          className="form-field--address__manual-toggle"
          css={css`
            // Overriding specificity
            .form-field--address + & {
              margin: ${theme.spacing.medium} 0;
              font-weight: 800;
              color: ${theme.colors.pink};
            }
          `}
          onClick={(e) => {
            e.preventDefault();
            setManualEntry(true);
          }}
        >
          &gt; Or enter your address manually
        </button>
      )}
      {touched && error && !manualEntry && (
        <span
          css={css`
            ${theme.mixins.error}
            clear: both;
          `}
        >
          <i className="material-icons">warning</i>
          Your address has errors, you may need to enter it manually
        </span>
      )}
    </div>
  );
};
