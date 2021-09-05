/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState } from "react";
import { useField, useFormikContext } from "formik";
import Dropzone from "react-dropzone";
import theme from "../../theme";

function rand(min = 100000, max = 1000000) {
  return Math.floor(Math.random() * (max - min) + min);
}

const instanceHash = rand();

export default ({ name, label }) => {
  const [field, { error, touched }] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [loading, setLoading] = useState(false);
  const handleFileUpload = async (files) => {
    const file = files[0];
    const config = window.config;
    if (file) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("photo", file, file.name);

        const response = await fetch(
          // use client specific endpoint
          `${config.apiBaseUrl}organisations/${config.organisationUuid}/media/signup-${instanceHash}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        let image = result.data.url;
        if (file.type.indexOf("image/") === 0) {
          // Turn this into an imgix result
          image = image.replace(
            "s3-ap-southeast-2.amazonaws.com/raisely-images",
            "raisely-images.imgix.net"
          );
        }

        setLoading(false);
        setFieldValue(name, image);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };
  return (
    <div>
      <Dropzone onDrop={handleFileUpload} multiple={false}>
        {({ open, getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div
              css={css`
                display: flex;
                flex-direction: row;
                align-items: center;
                min-height: 150px;

                @media screen and (max-width: 500px) {
                  flex-direction: column;
                }
              `}
            >
              <div
              // css={css`
              //   width: 50%;
              // `}
              >
                {loading ? (
                  <div>Uploading image...</div>
                ) : (
                  field.value && (
                    <img
                      src={field.value}
                      alt="Uploaded"
                      css={css`
                        width: 200px;
                        height: 200px;
                        object-fit: cover;
                        border: 0px solid ${theme.colors.text};
                        border-radius: 5px;
                      `}
                    />
                  )
                )}
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  margin-left: ${theme.spacing.large};

                  @media screen and (max-width: 500px) {
                    margin-left: 0;
                    margin-top: ${theme.spacing.medium};
                  }
                `}
              >
                {Boolean(label) && (
                  <h3
                    css={css`
                      color: ${theme.colors.teal};
                    `}
                  >
                    <label htmlFor={name}>{label}</label>
                  </h3>
                )}
                <button
                  className="button button--standard button--primary"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    open();
                  }}
                  css={css`
                    background-color: ${theme.colors.pink};
                  `}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </Dropzone>
      {touched && error && <span>{error}</span>}
    </div>
  );
};
