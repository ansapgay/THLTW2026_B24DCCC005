import { useState } from 'react';

// Employee Model
export default () => {
	const [employees, setEmployees] = useState<QLichHen.Employee[]>([]);
	const [services, setServices] = useState<QLichHen.Service[]>([]);
	const [appointments, setAppointments] = useState<QLichHen.Appointment[]>([]);
	const [ratings, setRatings] = useState<QLichHen.Rating[]>([]);
	const [isEditEmployee, setIsEditEmployee] = useState<boolean>(false);
	const [isEditService, setIsEditService] = useState<boolean>(false);
	const [isEditAppointment, setIsEditAppointment] = useState<boolean>(false);
	const [selectedEmployee, setSelectedEmployee] = useState<QLichHen.Employee>();
	const [selectedService, setSelectedService] = useState<QLichHen.Service>();
	const [selectedAppointment, setSelectedAppointment] = useState<QLichHen.Appointment>();
	const [visibleEmployeeModal, setVisibleEmployeeModal] = useState<boolean>(false);
	const [visibleServiceModal, setVisibleServiceModal] = useState<boolean>(false);
	const [visibleAppointmentModal, setVisibleAppointmentModal] = useState<boolean>(false);
	const [visibleRatingModal, setVisibleRatingModal] = useState<boolean>(false);

	// Load data from localStorage
	const loadAllData = () => {
		const empData: any = JSON.parse(localStorage.getItem('qlh_employees') || '[]');
		const svcData: any = JSON.parse(localStorage.getItem('qlh_services') || '[]');
		const aptData: any = JSON.parse(localStorage.getItem('qlh_appointments') || '[]');
		const ratingData: any = JSON.parse(localStorage.getItem('qlh_ratings') || '[]');
		setEmployees(empData);
		setServices(svcData);
		setAppointments(aptData);
		setRatings(ratingData);
	};

	return {
		// Employees
		employees,
		setEmployees,
		isEditEmployee,
		setIsEditEmployee,
		selectedEmployee,
		setSelectedEmployee,
		visibleEmployeeModal,
		setVisibleEmployeeModal,

		// Services
		services,
		setServices,
		isEditService,
		setIsEditService,
		selectedService,
		setSelectedService,
		visibleServiceModal,
		setVisibleServiceModal,

		// Appointments
		appointments,
		setAppointments,
		isEditAppointment,
		setIsEditAppointment,
		selectedAppointment,
		setSelectedAppointment,
		visibleAppointmentModal,
		setVisibleAppointmentModal,

		// Ratings
		ratings,
		setRatings,
		visibleRatingModal,
		setVisibleRatingModal,

		// Functions
		loadAllData,
	};
};
