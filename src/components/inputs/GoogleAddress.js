/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useEffect, useRef } from "react";
import { useField, useFormikContext } from "formik";
import get from "lodash/get";
import helpers from "./helpers";
import theme from "../../theme";

export default ({ name, label }) => {
  const [field, { error }] = useField(name);

  const {
    setFieldValue,
    setFieldTouched,
    touched: touchedFields
  } = useFormikContext();

  const touched = get(touchedFields, `${name}.searchString`);

  const autocomplete = useRef(null);
  const inputRef = useRef(null);

  const handleGooglePlaceChanged = () => {
    const place = autocomplete.current.getPlace();

    const extract = (components, type) => {
      for (let i = 0; i < components.length; i++) {
        for (let j = 0; j < components[i].types.length; j++) {
          if (components[i].types[j] === type) return components[i].short_name;
        }
      }
      return "";
    };

    if (place.address_components) {
      const address = {
        address1: [
          extract(place.address_components, "street_number"),
          extract(place.address_components, "route")
        ].join(" "),
        address2: extract(place.address_components, "subpremise")
          ? `Unit ${extract(place.address_components, "subpremise")}`
          : "",
        suburb: extract(place.address_components, "locality"),
        state: extract(place.address_components, "administrative_area_level_1"),
        postcode: extract(place.address_components, "postal_code"),
        country: extract(place.address_components, "country")
      };

      setFieldValue(name, {
        ...field.value,
        ...address,
        searchString: place.name
          ? `${place.name}, ${place.formatted_address}`
          : place.formatted_address
      });
    }
  };

  useEffect(() => {
    autocomplete.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      { types: ["establishment"] }
    );

    autocomplete.current.addListener("place_changed", handleGooglePlaceChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(field);

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
        <input
          value={field.value.searchString || ""}
          onChange={e =>
            setFieldValue(name, {
              ...field.value,
              searchString: e.target.value
            })
          }
          ref={inputRef}
          autoComplete="new-password"
          onBlur={() => setFieldTouched(`${name}.searchString`)}
          placeholder="Start typing your swimming venue"
        />
      </div>
      {touched && error && (
        <span
          css={css`
            ${theme.mixins.error}
            clear: both;
          `}
        >
          <i className="material-icons">warning</i>
          Your location has errors
        </span>
      )}
    </div>
  );
};
