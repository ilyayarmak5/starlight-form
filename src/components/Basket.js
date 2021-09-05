export const calculateTotal = (basket) => {
	const selfDonation = basket.donationAmount;
	return selfDonation;
};

export const calculateOptInAmount = (basket) => {
	const total = calculateTotal(basket);
	const optInAmount = Math.round((0.0385 * total + 0.28) * 100) / 100;
	const newTotal = optInAmount + total;
	return { optInAmount, newTotal };
};

export const calculateTotalWithoutOptIn = (basket) => {
	const total = calculateTotal(basket);
	return total;
};

export const calculateTotalWithOptIn = (basket) => {
	const total = calculateTotal(basket);
	const { optInAmount } = calculateOptInAmount(basket);
	if (basket.optIn) {
		return total + optInAmount;
	}
	return total;
};

export const formatValue = (value) => {
	return value && typeof value === "number" ? `$${value.toFixed(2)}` : ``;
};
