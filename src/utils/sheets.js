// Fetch data from Google Sheets
const getSheetData = async range => {
  const config = window.config;
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${config.sheetsId}/values/${range}?key=${config.sheetsKey}`
  );
  return await response.json();
};

export default async () => {
  // Get Promo Codes
  const config = window.config;
  const [promoCodeData, companyCodeData] = await Promise.all([
    getSheetData(config.sheetsPromoCodeRange),
    getSheetData(config.sheetsCompanyCodeRange)
  ]);
  const codes = {};
  promoCodeData.values.forEach((row, ix) => {
    if (ix === 0) return; // Header row
    const [
      code,
      discount,
      description,
      fixedDiscount,
      flatFee,
      challengeCondition
    ] = row;
    const discountAsNumber = Number(discount.split("%")[0]) || 0;
    codes[code] = {
      discount: discountAsNumber / 100,
      description,
      multiplier: (100 - discountAsNumber) / 100,
      isCompanyCode: false,
      coversRegistration: false,
      coversPurchases: false,
      registrationFeesLimitType: "AMOUNT",
      registrationFeesOverallAmount: 0,
      registrationFeesNumber: 0,
      purchasesLimitType: "AMOUNT",
      purchasesOverallAmount: 0,
      purchasesPerPerson: 0,
      fixedDiscount: Number(fixedDiscount) || 0,
      flatFee: Number(flatFee) || 0,
      challengeCondition
    };
  });
  companyCodeData.values.forEach((row, ix) => {
    if (ix === 0) return; // Header row
    const [
      code,
      coversRegistration,
      registrationFeesLimitType,
      registrationFeesOverallAmount = "0",
      registrationFeesNumber = "0",
      coversPurchases,
      purchasesLimitType,
      purchasesOverallAmount = "0",
      purchasesPerPerson = "0"
    ] = row;
    codes[code] = {
      discount: 0,
      description: "",
      multiplier: 1,
      isCompanyCode: true,
      coversRegistration: coversRegistration === "TRUE",
      coversPurchases: coversPurchases === "TRUE",
      registrationFeesLimitType,
      registrationFeesOverallAmount: Number(
        registrationFeesOverallAmount.replace("$", "")
      ),
      registrationFeesNumber: Number(registrationFeesNumber),
      purchasesLimitType,
      purchasesOverallAmount: Number(purchasesOverallAmount.replace("$", "")),
      purchasesPerPerson: Number(purchasesPerPerson.replace("$", "")),
      fixedDiscount: 0
    };
  });
  return codes;
};
