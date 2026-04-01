declare namespace Travel {
	// Destination interface
	interface Destination {
		id?: string;
		name: string;
		location: string;
		description?: string;
		type: 'beach' | 'mountain' | 'city' | 'rural' | 'other'; // loại hình
		image?: string;
		imageUrl?: string;
		viewingTime?: number; // thời gian tham quan (giờ)
		rating: number; // đánh giá 0-5
		totalReviews?: number;
		pricePerDay?: number;
		foodCost?: number; // chi phí ăn uống
		accommodationCost?: number; // chi phí lưu trú
		transportCost?: number; // chi phí di chuyển
		createdAt?: string;
		updatedAt?: string;
	}

	interface DestinationFilter {
		type?: string;
		priceMin?: number;
		priceMax?: number;
		ratingMin?: number;
		search?: string;
		page?: number;
		pageSize?: number;
	}

	// Itinerary interface
	interface Day {
		date: string;
		destinations: {
			destinationId: string;
			destination?: Destination;
			order: number;
			notes?: string;
		}[];
	}

	interface Itinerary {
		id?: string;
		title: string;
		userId?: string;
		startDate: string;
		endDate: string;
		days: Day[];
		totalBudget: number;
		actualBudget?: number;
		destinations: Destination[];
		description?: string;
		isPublic?: boolean;
		createdAt?: string;
		updatedAt?: string;
	}

	// Budget interface
	interface BudgetItem {
		category: 'food' | 'accommodation' | 'transport' | 'activities' | 'other';
		description: string;
		amount: number;
		date?: string;
		destinationId?: string;
		destination?: Destination;
	}

	interface Budget {
		id?: string;
		itineraryId: string;
		items: BudgetItem[];
		totalBudget: number;
		spentBudget: number;
		warn_when_exceed?: number; // phần trăm để cảnh báo
		createdAt?: string;
		updatedAt?: string;
	}

	// Statistics
	interface DestinationStat {
		destinationId: string;
		name: string;
		count: number;
		revenue?: number;
	}

	interface MonthlyStat {
		month: number;
		count: number;
		revenue: number;
	}

	interface BudgetStat {
		category: string;
		amount: number;
		percentage: number;
	}

	interface Statistics {
		totalItineraries: number;
		totalRevenue: number;
		monthlyStats: MonthlyStat[];
		popularDestinations: DestinationStat[];
		budgetStats: BudgetStat[];
	}
}
