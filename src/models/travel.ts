import { useState } from 'react';

export default () => {
	// Destinations
	const [destinations, setDestinations] = useState<Travel.Destination[]>([]);
	const [destinationDetail, setDestinationDetail] = useState<Travel.Destination | undefined>();

	// Itineraries
	const [itineraries, setItineraries] = useState<Travel.Itinerary[]>([]);
	const [itineraryDetail, setItineraryDetail] = useState<Travel.Itinerary | undefined>();
	const [currentItinerary, setCurrentItinerary] = useState<Travel.Itinerary | undefined>();

	// Budget
	const [budgets, setBudgets] = useState<Travel.Budget[]>([]);
	const [totalBudget, setTotalBudget] = useState<number>(0);
	const [budgetWarning, setBudgetWarning] = useState<boolean>(false);

	// UI State
	const [loading, setLoading] = useState<boolean>(false);
	const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);

	return {
		// Destinations
		destinations,
		setDestinations,
		destinationDetail,
		setDestinationDetail,

		// Itineraries
		itineraries,
		setItineraries,
		itineraryDetail,
		setItineraryDetail,
		currentItinerary,
		setCurrentItinerary,

		// Budget
		budgets,
		setBudgets,
		totalBudget,
		setTotalBudget,
		budgetWarning,
		setBudgetWarning,

		// UI State
		loading,
		setLoading,
		visible,
		setVisible,
		isEdit,
		setIsEdit,
	};
};
