import React, { Fragment } from "react";

const wrapperClasses = (type, field, error, touched) =>
  `field-wrapper field-wrapper--${field.name}`;
const fieldClasses = (type, field, error, touched) =>
  `form-field form-field--${type} ${!field.value && "form-field--empty"} ${
    !error || !touched ? "form-field--valid" : "form-field--error"
  }`;
const labelSpanClasses = (type, field, error, touched) =>
  `form-field__label-text`;
const errorClasses = (type, field, error, touched) => ``;
const errorContent = (type, field, error, touched) => (
  <Fragment>
    <i className="material-icons">warning</i>
    {error}
  </Fragment>
);

// Use for radio fields, adds the empty/valid/error states to the wrapper instead of the field
// Can be used to avoid the extra chrome placed around a form field
const inlineClasses = (type, field, error, touched) =>
  `${!field.value && "form-field--empty"} ${
    !error || !touched ? "form-field--valid" : "form-field--error"
  }`;

export default (type, field, error, touched) => ({
  wrapperClasses: wrapperClasses(type, field, error, touched),
  fieldClasses: fieldClasses(type, field, error, touched),
  labelSpanClasses: labelSpanClasses(type, field, error, touched),
  errorClasses: errorClasses(type, field, error, touched),
  errorContent: errorContent(type, field, error, touched),
  inlineClasses: inlineClasses(type, field, error, touched)
});
