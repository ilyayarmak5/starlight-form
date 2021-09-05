// Checks the formik state for new errors, scrolls to the field they occurred on
import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";

export default () => {
  const { errors, submitCount } = useFormikContext();
  const previousSubmitCount = useRef(submitCount);
  useEffect(() => {
    if (
      previousSubmitCount.current !== submitCount &&
      Object.keys(errors).length
    ) {
      const element = document.querySelector(
        `[name=${Object.keys(errors)[0]}]`
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    previousSubmitCount.current = submitCount;
  }, [submitCount, errors]);
  return null;
};
