import { useState, useEffect } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import qs from "qs";
import Step1, { Step1Schema } from "./components/Step1";
import Step2, { Step2Schema } from "./components/Step2";
import Step3, { Step3Schema } from "./components/Step3";
import Step4, { Step4Schema } from "./components/Step4";
import { Formik } from "formik";
import { StripeProvider, injectStripe, Elements } from "react-stripe-elements";
import {
  calculateTotalWithOptIn,
  calculateTotalWithoutOptIn,
  calculateOptInAmount,
} from "./components/Basket";
import Layout from "./components/Layout";
import theme from "./theme";
import ErrorScroller from "./components/ErrorScroller";

// Build an empty initial values first
let initialValues = [Step1Schema, Step2Schema, Step3Schema, Step4Schema].reduce(
  (fields, currentSchema) => {
    const newFields = Object.keys(currentSchema.fields);
    newFields.forEach((newField) => {
      fields[newField] = "";
    });
    return fields;
  },
  {}
);

// Config values will be supplied via query string to the iFrame
const rawQuery = window.location.href.split("?")[1];
const queryParams = rawQuery ? qs.parse(rawQuery) : {};
const config = {
  campaignUuid: "1a63b4d0-9836-11eb-adbb-654166c5f7cc",
  organisationUuid: "ce18a290-ee0c-11e9-8f85-297884605a83",
  apiBaseUrl: "https://api.raisely.com/v3/",
  assetHash: "01098",
  stripeKey: "pk_test_F4jZ0EjLCG6xXvdpqjGyUiSv",
  registerEndpoint:
    "https://api.raisely.com/v3/campaigns/1a63b4d0-9836-11eb-adbb-654166c5f7cc/register",
  ...queryParams,
};

window.config = config;

// Conditionally override initial values here
// In future, we should be able to generate this from the Yup schema
initialValues = {
  ...initialValues,
  challengeDistance: config.distance ? Number(config.distance) : 500,
  profileImage:
    "https://raisely-images.imgix.net/tourdekids-2020/uploads/group-png-6e1421.png",
  address: {
    searchString: "",
    organisation: "",
    address1: "",
    address2: "",
    suburb: "",
    state: "",
    postcode: "",
    country: "AU",
  },
  teamSetting: "individual",
  joinTeam: {
    searchString: "",
  },
  agreeToTerms: false,
  bikesPromo: false,
  profileGoal: 500,
  basket: {
    donationAmount: 100,
    optIn: true,
  },
};

const injectStyle = (fileName) => {
  const head = document.head;
  const link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = fileName;

  head.appendChild(link);
};

// [
//   `https://fonts.googleapis.com/icon?family=Material+Icons`,
//   `https://cdn.raisely.com/v3/vendor.${config.assetHash}.css`,
//   `https://cdn.raisely.com/v3/styles.${config.assetHash}.css`,
//   `https://cdn.raisely.com/v3/app.${config.assetHash}.css`,
//   `https://raisely-production.appspot.com/v3/campaigns/${config.campaignUuid}/styles.css`
// ].forEach(injectStyle);

const convertToCents = (value) => Math.round(value * 100);

function App({ stripe }) {
  const [step, setStep] = useState(0);
  const [submissionError, setSubmissionError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [values, _setValues] = useState(initialValues);

  const updateValues = (newValues) => _setValues({ ...values, ...newValues });

  const steps = [Step1, Step2, Step3, Step4];
  const schemas = [Step1Schema, Step2Schema, Step3Schema, Step4Schema];

  // Final submit
  const onSubmit = async (updatedValues) => {
    // Make sure state values has latest formik updates
    const v = { ...values, ...updatedValues };
    // Tokenize the stripe payment
    let token;
    if (calculateTotalWithOptIn(v.basket)) {
      token = await stripe.createToken({ currency: "AUD" });
    }
    try {
      if (token && token.error) {
        throw new Error(token.error.message);
      } else {
        const payload = {
          user: {
            firstName: v.firstName,
            lastName: v.lastName,
            email: v.email,
            phoneNumber: v.phoneNumber,
            address: v.address,
            password: v.password,
            address1: v.address.address1,
            address2: v.address.address2,
            postcode: v.address.postcode,
            state: v.address.state,
            suburb: v.address.suburb,
            country: v.address.country,
            private: {
              date_of_birth: v.dob,
            },
          },
          profile: {
            name: v.profileName,
            description: v.profileDescription,
            photoUrl: v.profileImage || "",
            currency: "AUD",
            goal: convertToCents(v.profileGoal),
            path: v.profilePath,
            type: "INDIVIDUAL",
            public: {
              challengeDistance: v.challengeDistance,
            },
            private: {
              parentPermission: v.parentPermission,
              agreeToTerms: v.agreeToTerms,
              bikesPromo: v.bikesPromo,
              // jerseyFit: v.fit,
              jerseySize: v.jersey,
            },
            exerciseGoal: v.challengeDistance * 1000,
          },
        };

        if (token) {
          payload.donation = {
            amount: convertToCents(calculateTotalWithoutOptIn(v.basket)),
            currency: "AUD",
            type: "ONLINE",
            method: "CREDIT_CARD",
            token: token.token.id,
            feeOptIn: v.basket.optIn,
            fee: v.basket.optIn
              ? convertToCents(calculateOptInAmount(v.basket).optInAmount)
              : 0,
          };
        }

        if (v.teamSetting === "join") {
          payload.profile.parentUuid = v.joinTeam.uuid;
        }

        if (v.teamSetting === "newTeam") {
          payload.teamProfile = {
            name: v.teamName,
            path: v.teamPath,
            description: v.teamDescription,
            currency: "AUD",
            photoUrl: null,
            goal: convertToCents(v.profileGoal),
            type: "GROUP",
            private: {
              tdkWorkTeam: v.teamWork,
            },
          };
        }

        // We have a token and all of the data persisted to state
        // Go ahead and send off our form data to the API
        const result = await fetch(config.registerEndpoint, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ data: payload }),
        });
        const res = await result.json();

        if (res.errors) {
          throw new Error(res.errors[0].message);
        }

        window.parent.postMessage(
          {
            step: "complete",
            values: {
              profile: {
                ...payload.profile,
                ...res.profile,
              },
              donation: payload.donation
                ? {
                    ...payload.donation,
                    ...res.donation,
                  }
                : undefined,
              user: {
                ...payload.user,
                ...res.data,
              },
            },
            event: "signup-step",
          },
          "*"
        );

        setTimeout(function () {
          if (res.accessToken) {
            // window.parent.postMessage(
            // 	{ success: true, accessToken: res.accessToken },
            // 	"*"
            // );
            setSuccessMessage(true);
            setToken(res.accessToken);
          } else {
            setSuccessMessage(res.message);
          }
        }, 500);
      }
    } catch (error) {
      console.error(error);
      setSubmissionError(error.message);
    }
  };

  // Intermediate step submit
  const handleFormSubmit = (values, bag) => {
    const isLastPage = step === steps.length - 1;

    if (step === 1) {
      try {
        window.Autopilot.run("associate", {
          Email: values.email,
          FirstName: values.firstName,
          LastName: values.lastName,
          MobilePhone: values.phoneNumber,
          custom: {
            "date--TDK21--Registration--Attempt--Date":
              new Date().toISOString(),
          },
        });
      } catch (e) {
        console.log(e);
      }
    }

    if (isLastPage) {
      updateValues(values);
      return onSubmit(values, bag);
    } else {
      console.log(step);
      bag.setTouched({});
      bag.setSubmitting(false);
      updateValues(values);
      setStep(step + 1);
      // Scroll to top
      window.parent.postMessage(
        { scrollToTop: true, fromStep: step, toStep: step + 1 },
        "*"
      );
      const element = document.querySelector(`#root`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const ActiveStep = steps[step];
  const activeSchema = schemas[step];

  // Send new page height up to iframe parent
  useEffect(() => {
    const interval = setInterval(() => {
      const event = {
        height: window.document.documentElement.scrollHeight,
      };
      window.parent.postMessage(event, "*");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Layout>
        <Formik
          initialValues={values}
          enableReinitialize={false}
          onSubmit={handleFormSubmit}
          validationSchema={activeSchema}
          render={({ handleSubmit, isSubmitting, isValidating }) => (
            <form onSubmit={handleSubmit}>
              <ActiveStep
                setStep={setStep}
                submissionError={submissionError}
                successMessage={successMessage}
                token={token}
                buttons={
                  <div
                    className="buttons"
                    css={css`
                      flex: 1;
                      display: flex;
                      flex-direction: row;
                      align-items: stretch;

                      @media screen and (max-width: 400px) {
                        flex-direction: column;
                      }
                    `}
                  >
                    {step !== 0 && step !== steps.length - 1 && (
                      <button
                        className="button button--standard button--primary"
                        css={css`
                          background: none;
                          color: ${theme.colors.pink};
                          border-color: ${theme.colors.pink};
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          width: 100%;
                          font-size: 1.5rem;
                        `}
                        onClick={(e) => {
                          e.preventDefault();
                          setStep(Math.max(0, step - 1));
                        }}
                      >
                        <span
                          css={css`
                            font-size: 2.5rem;
                            line-height: 1rem;
                            margin-right: 10px;
                            margin-top: -7px;
                          `}
                        >
                          &lsaquo;
                        </span>
                        BACK
                      </button>
                    )}
                    {step !== steps.length - 1 && (
                      <button
                        className="button button--standard button--primary"
                        type="submit"
                        disabled={isSubmitting || isValidating}
                        id={`next-${step + 1}`}
                        css={css`
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          width: 100%;
                          font-size: 1.5rem;
                          background-color: ${theme.colors.pink};
                          border-color: ${theme.colors.pink};
                        `}
                        onClick={() => console.log(step)}
                      >
                        NEXT
                        <span
                          css={css`
                            font-size: 2.5rem;
                            line-height: 1rem;
                            margin-left: 10px;
                            margin-top: -7px;
                          `}
                        >
                          &rsaquo;
                        </span>
                      </button>
                    )}
                  </div>
                }
              />
              <ErrorScroller />
            </form>
          )}
        />
      </Layout>
    </div>
  );
}

const InjectedApp = injectStripe(App);

export default () => (
  <StripeProvider apiKey={config.stripeKey}>
    <Elements>
      <InjectedApp />
    </Elements>
  </StripeProvider>
);
