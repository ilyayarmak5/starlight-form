/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useField } from "formik";
import helpers from "./helpers";

export default ({ name, label }) => {
	const [field, { error, touched }] = useField(name);
	const {
		wrapperClasses,
		fieldClasses,
		labelSpanClasses,
		errorClasses,
		errorContent,
	} = helpers("text", field, error, touched);
	return (
		<div className={wrapperClasses}>
			<div className={fieldClasses}>
				{label && (
					<label htmlFor={name}>
						<span className={labelSpanClasses}>{label}</span>
					</label>
				)}
				<textarea
					{...field}
					css={css`
						// Overriding specificity
						.form-field & {
							height: 200px;
							line-height: 1.4;
							margin-top: 0.54rem;
						}
					`}
				/>
				{touched && error && (
					<span className={errorClasses}>{errorContent}</span>
				)}
			</div>
		</div>
	);
};
