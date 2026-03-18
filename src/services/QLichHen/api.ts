// Appointment Service

// Employee Management
export const getEmployees = (): QLichHen.Employee[] => {
	return JSON.parse(localStorage.getItem('qlh_employees') || '[]');
};

export const addEmployee = (employee: QLichHen.Employee) => {
	const employees = getEmployees();
	employee.id = Math.max(...employees.map(e => parseInt(e.id)), 0) + 1;
	employees.push(employee);
	localStorage.setItem('qlh_employees', JSON.stringify(employees));
	return employee;
};

export const updateEmployee = (id: string, updatedEmployee: QLichHen.Employee) => {
	let employees = getEmployees();
	employees = employees.map(e => (e.id === id ? { ...updatedEmployee, id } : e));
	localStorage.setItem('qlh_employees', JSON.stringify(employees));
};

export const deleteEmployee = (id: string) => {
	let employees = getEmployees();
	employees = employees.filter(e => e.id !== id);
	localStorage.setItem('qlh_employees', JSON.stringify(employees));
};

// Service Management
export const getServices = (): QLichHen.Service[] => {
	return JSON.parse(localStorage.getItem('qlh_services') || '[]');
};

export const addService = (service: QLichHen.Service) => {
	const services = getServices();
	service.id = Math.max(...services.map(s => parseInt(s.id)), 0) + 1;
	services.push(service);
	localStorage.setItem('qlh_services', JSON.stringify(services));
	return service;
};

export const updateService = (id: string, updatedService: QLichHen.Service) => {
	let services = getServices();
	services = services.map(s => (s.id === id ? { ...updatedService, id } : s));
	localStorage.setItem('qlh_services', JSON.stringify(services));
};

export const deleteService = (id: string) => {
	let services = getServices();
	services = services.filter(s => s.id !== id);
	localStorage.setItem('qlh_services', JSON.stringify(services));
};

// Appointment Management
export const getAppointments = (): QLichHen.Appointment[] => {
	return JSON.parse(localStorage.getItem('qlh_appointments') || '[]');
};

export const addAppointment = (appointment: QLichHen.Appointment) => {
	const appointments = getAppointments();
	appointment.id = Math.max(...appointments.map(a => parseInt(a.id)), 0) + 1;
	appointment.status = appointment.status || 'pending';
	appointment.createdAt = new Date().toISOString();
	appointments.push(appointment);
	localStorage.setItem('qlh_appointments', JSON.stringify(appointments));
	return appointment;
};

export const updateAppointment = (id: string, updatedAppointment: QLichHen.Appointment) => {
	let appointments = getAppointments();
	appointments = appointments.map(a => (a.id === id ? { ...updatedAppointment, id } : a));
	localStorage.setItem('qlh_appointments', JSON.stringify(appointments));
};

export const deleteAppointment = (id: string) => {
	let appointments = getAppointments();
	appointments = appointments.filter(a => a.id !== id);
	localStorage.setItem('qlh_appointments', JSON.stringify(appointments));
};

// Check appointment conflicts
export const checkAppointmentConflict = (
	employeeId: string,
	startTime: string,
	endTime: string,
	excludeAppointmentId?: string
): boolean => {
	const appointments = getAppointments();
	const appointmentDate = new Date(startTime).toDateString();

	return appointments.some(apt => {
		if (apt.employeeId !== employeeId) return false;
		if (excludeAppointmentId && apt.id === excludeAppointmentId) return false;
		if (apt.status === 'cancelled') return false;

		const aptDate = new Date(apt.scheduledTime).toDateString();
		if (aptDate !== appointmentDate) return false;

		const aptStart = new Date(apt.scheduledTime).getTime();
		const aptEnd = new Date(apt.endTime || apt.scheduledTime).getTime();
		const newStart = new Date(startTime).getTime();
		const newEnd = new Date(endTime).getTime();

		return !(newEnd <= aptStart || newStart >= aptEnd);
	});
};

// Rating Management
export const getRatings = (): QLichHen.Rating[] => {
	return JSON.parse(localStorage.getItem('qlh_ratings') || '[]');
};

export const addRating = (rating: QLichHen.Rating) => {
	const ratings = getRatings();
	rating.id = Math.max(...ratings.map(r => parseInt(r.id)), 0) + 1;
	rating.createdAt = new Date().toISOString();
	ratings.push(rating);
	localStorage.setItem('qlh_ratings', JSON.stringify(ratings));
	return rating;
};

export const getAverageRating = (employeeId: string): number => {
	const ratings = getRatings();
	const employeeRatings = ratings.filter(r => r.employeeId === employeeId);
	if (employeeRatings.length === 0) return 0;
	const sum = employeeRatings.reduce((acc, r) => acc + r.rating, 0);
	return Math.round((sum / employeeRatings.length) * 10) / 10;
};

// Statistics
export const getStatistics = () => {
	const appointments = getAppointments();
	const employees = getEmployees();
	const services = getServices();
	const ratings = getRatings();

	// Count appointments by date
	const appointmentsByDate: Record<string, number> = {};
	appointments.forEach(apt => {
		if (apt.status !== 'cancelled') {
			const date = new Date(apt.scheduledTime).toDateString();
			appointmentsByDate[date] = (appointmentsByDate[date] || 0) + 1;
		}
	});

	// Revenue by service
	const revenueByService: Record<string, number> = {};
	appointments.forEach(apt => {
		if (apt.status === 'completed') {
			const service = services.find(s => s.id === apt.serviceId);
			if (service) {
				revenueByService[service.name] = (revenueByService[service.name] || 0) + service.price;
			}
		}
	});

	// Revenue by employee
	const revenueByEmployee: Record<string, number> = {};
	appointments.forEach(apt => {
		if (apt.status === 'completed') {
			const service = services.find(s => s.id === apt.serviceId);
			if (service) {
				revenueByEmployee[apt.employeeId] = (revenueByEmployee[apt.employeeId] || 0) + service.price;
			}
		}
	});

	return {
		totalAppointments: appointments.length,
		completedAppointments: appointments.filter(a => a.status === 'completed').length,
		pendingAppointments: appointments.filter(a => a.status === 'pending').length,
		confirmedAppointments: appointments.filter(a => a.status === 'confirmed').length,
		totalEmployees: employees.length,
		totalServices: services.length,
		totalRatings: ratings.length,
		appointmentsByDate,
		revenueByService,
		revenueByEmployee,
	};
};
