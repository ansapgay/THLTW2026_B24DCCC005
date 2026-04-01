import { request } from 'umi';

const API_BASE = '/api/travel';

// Destinations APIs
export async function getDestinations(filter?: Travel.DestinationFilter) {
	return request<Travel.Destination[]>(`${API_BASE}/destinations`, {
		method: 'GET',
		params: filter,
	});
}

export async function getDestinationById(id: string) {
	return request<Travel.Destination>(`${API_BASE}/destinations/${id}`, {
		method: 'GET',
	});
}

export async function createDestination(data: Travel.Destination) {
	return request<Travel.Destination>(`${API_BASE}/destinations`, {
		method: 'POST',
		data,
	});
}

export async function updateDestination(id: string, data: Travel.Destination) {
	return request<Travel.Destination>(`${API_BASE}/destinations/${id}`, {
		method: 'PUT',
		data,
	});
}

export async function deleteDestination(id: string) {
	return request(`${API_BASE}/destinations/${id}`, {
		method: 'DELETE',
	});
}

export async function uploadDestinationImage(file: File) {
	const formData = new FormData();
	formData.append('file', file);
	return request<{ url: string }>(`${API_BASE}/upload`, {
		method: 'POST',
		data: formData,
	});
}

// Itineraries APIs
export async function getItineraries(userId?: string) {
	return request<Travel.Itinerary[]>(`${API_BASE}/itineraries`, {
		method: 'GET',
		params: { userId },
	});
}

export async function getItineraryById(id: string) {
	return request<Travel.Itinerary>(`${API_BASE}/itineraries/${id}`, {
		method: 'GET',
	});
}

export async function createItinerary(data: Travel.Itinerary) {
	return request<Travel.Itinerary>(`${API_BASE}/itineraries`, {
		method: 'POST',
		data,
	});
}

export async function updateItinerary(id: string, data: Travel.Itinerary) {
	return request<Travel.Itinerary>(`${API_BASE}/itineraries/${id}`, {
		method: 'PUT',
		data,
	});
}

export async function deleteItinerary(id: string) {
	return request(`${API_BASE}/itineraries/${id}`, {
		method: 'DELETE',
	});
}

// Statistics APIs
export async function getStatistics(startDate?: string, endDate?: string) {
	return request<Travel.Statistics>(`${API_BASE}/statistics`, {
		method: 'GET',
		params: { startDate, endDate },
	});
}

export async function getMonthlyItineraryStats(year: number, month: number) {
	return request<Travel.MonthlyStat[]>(`${API_BASE}/statistics/monthly`, {
		method: 'GET',
		params: { year, month },
	});
}

export async function getPopularDestinations() {
	return request<Travel.DestinationStat[]>(`${API_BASE}/statistics/popular-destinations`, {
		method: 'GET',
	});
}

export async function getBudgetStats() {
	return request<Travel.BudgetStat[]>(`${API_BASE}/statistics/budget`, {
		method: 'GET',
	});
}
