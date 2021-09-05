/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
import Text from "./inputs/Text";
import Phone from "./inputs/Phone";
import Address from "./inputs/Address";
import Password from "./inputs/Password";
import Mask from "./inputs/Mask";
import { LayoutHeader, LayoutBody, FormDivider } from "./Layout";
import theme from "../theme";
import Email from "./inputs/Email";
import StepIndicator from "./StepIndicator";
import { isValid, differenceInYears, getDaysInMonth } from "date-fns";
import TeamSettings, { TeamSettingsSchema } from "./TeamSettings";
import Select from "./inputs/Select";
import CheckboxSingle from "./inputs/CheckboxSingle";
import { useFormikContext } from "formik";
import { values } from "lodash";

const isUnder18 = (dob) => {
  if (!dob) return false;
  const date = new Date(dob.split("/").reverse().join("-"));

  return date.getTime() > new Date().getTime() - 18 * 365 * 24 * 60 * 60 * 1000;
};

export default ({ buttons, setStep }) => {
  const { values } = useFormikContext();

  return (
    <div>
      <LayoutHeader>
        <h1
          css={css`
            color: ${theme.colors.lightGreen};
            font-weight: 800;
            font-size: 3rem;
          `}
        >
          JOIN US
        </h1>
        <StepIndicator step={2} totalSteps={4} setStep={setStep} />
      </LayoutHeader>
      <LayoutBody>
        <h2
          css={css`
            margin-bottom: ${theme.spacing.large};
            font-weight: 800;
          `}
        >
          Your details
        </h2>
        <Text name="firstName" label="First Name" />
        <Text name="lastName" label="Last Name" />
        <Email name="email" label="Email" />
        <Phone name="phoneNumber" label="Mobile Number" country="AU" />

        <Mask
          name="dob"
          label="Date of Birth"
          mask="99/99/9999"
          suffix="dd/mm/yyyy"
        />
        {isUnder18(values.dob) && (
          <CheckboxSingle
            name="parentPermission"
            label={
              <Fragment>
                <p
                  css={css`
                    margin-top: ${theme.spacing.medium};
                    margin-bottom: ${theme.spacing.medium};
                    font-size: 0.8rem;
                  `}
                >
                  I have permission from my parent or guardian to participate in
                  the <br /> Tour de Kids Challenge 2021.
                </p>
              </Fragment>
            }
          />
        )}

        <FormDivider />
        <h2
          css={css`
            font-weight: 800;
          `}
        >
          Your address
        </h2>
        <p
          css={css`
            font-size: 1rem;
            margin-top: ${theme.spacing.medium};
            margin-bottom: ${theme.spacing.medium};
            text-align: center;
            padding: 0 5%;
          `}
        >
          Please provide your address for your Tour de Kids welcome pack and any
          fundraising rewards that you earn.
        </p>
        <Address name="address" label="Address" />
        <FormDivider />
        <h2
          css={css`
            font-weight: 800;
          `}
        >
          Your password
        </h2>
        <p
          css={css`
            font-size: 1rem;
            text-align: center;
            margin-top: ${theme.spacing.medium};
            margin-bottom: ${theme.spacing.medium};
            padding: 0 5%;
          `}
        >
          To access your Go BIG fundraising hub, please choose a password.
        </p>
        <Password name="password" label="Password" />
        <p
          css={css`
            margin-top: ${theme.spacing.medium};
            margin-bottom: ${theme.spacing.medium};
            color: ${theme.colors.text};
            font-size: 0.7rem;
          `}
        >
          Your password should contain at least 6 characters
        </p>
        <FormDivider />
        <h2
          css={css`
            font-weight: 800;
            margin-bottom: 25px;
          `}
        >
          How are you taking part?
        </h2>
        <TeamSettings />
        <FormDivider />
        <h2
          css={css`
            font-weight: 800;
            margin-bottom: 40px;
          `}
        >
          Your t-shirt
        </h2>
        <div
          css={css`
            display: flex;
            > div {
              width: 50%;
              img {
                width: 100%;
                height: auto;
              }
            }
          `}
        >
          <div
            css={css`
              padding-right: 1em;
            `}
          >
            <img alt="t-shirt image" src={"./t-shirt-placeholder.svg"} />
          </div>
          <div
            css={css`
              padding-left: 1em;
            `}
          >
            <p
              css={css`
                font-size: 0.9rem;
                margin-bottom: 1rem;
              `}
            >
              You'll receive a Go BIG t-shirt once you've raised $500.
              <br />
              <br />
              <a
                href="https://raisely-images.imgix.net/tour-de-kids-2021/uploads/tdk-santini-size-guide-pdf-cdaa28.pdf"
                target="_blank"
              >
                <strong
                  css={css`
                    color: ${theme.colors.pink};
                    font-weight: 900;
                    border-bottom: 2px solid ${theme.colors.pink};
                  `}
                >
                  VIEW SIZE GUIDE
                </strong>
              </a>
            </p>
            {/* <Select
							name="fit"
							label="Jersey Fit"
							noEmpty={false}
							emptyLabel="Select"
							options={{
								male: "Male",
								female: "Female",
								kids: "Kids",
							}}
						/> */}
            {values.fit === "kids" && (
              <Select
                name="jersey"
                label="Jersey Size"
                noEmpty={false}
                emptyLabel="Select"
                options={{
                  Y4: "Y4",
                  Y6: "Y6",
                  Y8: "Y8",
                  Y10: "Y10",
                  Y12: "Y12",
                  Y14: "Y14",
                  Y16: "Y16",
                }}
              />
            )}
            {values.fit !== "kids" && (
              <Select
                name="jersey"
                label="Jersey Size"
                noEmpty={false}
                emptyLabel="Select"
                options={{
                  "2xs": "2XS",
                  xs: "XS",
                  s: "S",
                  m: "M",
                  l: "L",
                  xl: "XL",
                  "2xl": "2XL",
                  "3xl": "3XL",
                  "4xl": "4XL",
                  "5xl": "5XL",
                  "6xl": "6XL",
                  "7xl": "7XL",
                }}
              />
            )}
          </div>
        </div>

        <FormDivider />
        <CheckboxSingle
          largeCheckbox
          name="bikesPromo"
          label={
            <Fragment>
              Please select to confirm that you would like to enter the 99 Bikes
              Sign Up Prize Draw. By entering the Sign Up Prize Draw, you agree
              to be subscribed to the 99 Bikes e-newsletter.
              <a
                href="https://tourdekids.org.au/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                css={css`
                  margin-left: 4px;
                  font-weight: 800;
                  border-bottom: 2px solid ${theme.colors.pink};
                  color: ${theme.colors.pink};
                `}
              >
                Terms &amp; Conditions apply.
              </a>{" "}
            </Fragment>
          }
          style={{ marginBottom: "20px" }}
        />

        <CheckboxSingle
          largeCheckbox
          name="agreeToTerms"
          label={
            <Fragment>
              I agree to Starlight's{" "}
              <a
                href="https://starlight.org.au/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                css={css`
                  font-weight: 800;
                  border-bottom: 2px solid ${theme.colors.pink};
                  color: ${theme.colors.pink};
                `}
              >
                Privacy Policy
              </a>{" "}
              and understand the{" "}
              <a
                href="https://tourdekids.org.au/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                css={css`
                  font-weight: 800;
                  border-bottom: 2px solid ${theme.colors.pink};
                  color: ${theme.colors.pink};
                `}
              >
                Terms &amp; Conditions
              </a>{" "}
              of taking part in Go BIG.
            </Fragment>
          }
        />
        <div
          css={css`
            height: 20px;
          `}
        ></div>
        {buttons}
      </LayoutBody>
    </div>
  );
};

export function parseDate(dateString) {
  if (!dateString) return new Date();
  const [day, month, year] = dateString.split("/");
  if (month > 12) {
    throw new Error("Month out of range");
  }
  if (day > getDaysInMonth(new Date(year, month - 1))) {
    throw new Error("Day out of range");
  }
  return new Date(year, month - 1, day);
}

export const Step2Schema = Yup.object()
  .shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required")
      .test("pending", "_pending", (val) => val !== "_pending")
      .test(
        "invalid",
        "This email has already been used. Please try another",
        (val) => val !== "_invalid"
      )
      .email(),
    phoneNumber: Yup.string()
      .required("Required")
      .test("valid-phone", "Invalid phone number", isValidPhoneNumber),
    dob: Yup.string()
      .required()
      .test("valid-date", "Date looks invalid", (dob) => {
        try {
          return isValid(parseDate(dob));
        } catch (error) {
          console.log(error);
          return false;
        }
      }),
    parentPermission: Yup.bool().when(["dob"], {
      is: (val) => isUnder18(val),
      then: Yup.bool()
        .required(
          "If you are under 18, you must have a parent's permission to participate"
        )
        .test(
          "is-checked",
          "If you are under 18, you must have a parent's permission to participate",
          (val) => val === true
        ),
    }),
    // .test(
    // 	"is-checked",
    // 	"If you are under 18, you must have a parent's permission to participate",
    // 	(val) => val === true ||
    // ),
    address: Yup.object({
      address1: Yup.string().required("Required"),
      suburb: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      postcode: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
    }),
    password: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    jersey: Yup.string().required("Required"),
    agreeToTerms: Yup.bool().test(
      "is-checked",
      "You must agree to the terms and conditions",
      (val) => val === true
    ),
  })
  .concat(TeamSettingsSchema); // Join a schema from another component like this

export const Step2AsyncValidation = null;
