declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'react-split-pane/lib/Pane';

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design Dedicated environment variable, please do not use it in your project.
declare let ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: 'site' | undefined;

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

declare const APP_CONFIG_IP_ROOT: string;
declare const APP_CONFIG_ONE_SIGNAL_ID: string;
declare const APP_CONFIG_SENTRY_DSN: string;
declare const APP_CONFIG_KEYCLOAK_AUTHORITY: string;
declare const APP_CONFIG_PREFIX_OF_KEYCLOAK_CLIENT_ID: string;
declare const APP_CONFIG_APP_VERSION: string;

declare const APP_CONFIG_CO_QUAN_CHU_QUAN: string;
declare const APP_CONFIG_TEN_TRUONG: string;
declare const APP_CONFIG_TIEN_TO_TRUONG: string;
declare const APP_CONFIG_TEN_TRUONG_VIET_TAT_TIENG_ANH: string;
declare const APP_CONFIG_PRIMARY_COLOR: string;

declare const APP_CONFIG_URL_LANDING: string;
declare const APP_CONFIG_URL_CONNECT: string;
declare const APP_CONFIG_URL_CAN_BO: string;
declare const APP_CONFIG_URL_DAO_TAO: string;
declare const APP_CONFIG_URL_NHAN_SU: string;
declare const APP_CONFIG_URL_TAI_CHINH: string;
declare const APP_CONFIG_URL_CTSV: string;
declare const APP_CONFIG_URL_QLKH: string;
declare const APP_CONFIG_URL_VPS: string;
declare const APP_CONFIG_URL_KHAO_THI: string;
declare const APP_CONFIG_URL_CORE: string;
declare const APP_CONFIG_URL_CSVC: string;
declare const APP_CONFIG_URL_THU_VIEN: string;
declare const APP_CONFIG_URL_QLVB: string;

declare const APP_CONFIG_TITLE_LANDING: string;
declare const APP_CONFIG_TITLE_CONNECT: string;
declare const APP_CONFIG_TITLE_CAN_BO: string;
declare const APP_CONFIG_TITLE_DAO_TAO: string;
declare const APP_CONFIG_TITLE_NHAN_SU: string;
declare const APP_CONFIG_TITLE_TAI_CHINH: string;
declare const APP_CONFIG_TITLE_CTSV: string;
declare const APP_CONFIG_TITLE_QLKH: string;
declare const APP_CONFIG_TITLE_VPS: string;
declare const APP_CONFIG_TITLE_KHAO_THI: string;
declare const APP_CONFIG_TITLE_CORE: string;
declare const APP_CONFIG_TITLE_CSVC: string;
declare const APP_CONFIG_TITLE_THU_VIEN: string;
declare const APP_CONFIG_TITLE_QLVB: string;

// Appointment Booking System Types
declare namespace QLichHen {
	interface Employee {
		id: string;
		name: string;
		phone: string;
		email?: string;
		maxClientsPerDay: number; // Số khách giới hạn/ngày
		workingHours: {
			dayOfWeek: number; // 0-6 (0 = Sunday)
			startTime: string; // "09:00"
			endTime: string; // "17:00"
		}[];
		isActive: boolean;
		createdAt?: string;
		updatedAt?: string;
	}

	interface Service {
		id: string;
		name: string;
		description?: string;
		price: number;
		durationMinutes: number; // Thời gian thực hiện (phút)
		createdAt?: string;
		updatedAt?: string;
	}

	interface Appointment {
		id: string;
		customerId: string;
		customerName: string;
		customerPhone: string;
		customerEmail?: string;
		employeeId: string;
		serviceId: string;
		scheduledTime: string; // ISO 8601 datetime
		endTime?: string; // ISO 8601 datetime
		status: 'pending' | 'confirmed' | 'completed' | 'cancelled'; // Chờ duyệt/Xác nhận/Hoàn thành/Hủy
		notes?: string;
		createdAt?: string;
		updatedAt?: string;
	}

	interface Rating {
		id: string;
		appointmentId: string;
		employeeId: string;
		customerId: string;
		rating: number; // 1-5
		comment?: string;
		response?: string; // Phản hồi từ nhân viên
		respondedAt?: string;
		createdAt?: string;
		updatedAt?: string;
	}

	interface Statistics {
		totalAppointments: number;
		completedAppointments: number;
		pendingAppointments: number;
		confirmedAppointments: number;
		totalEmployees: number;
		totalServices: number;
		totalRatings: number;
		appointmentsByDate: Record<string, number>;
		revenueByService: Record<string, number>;
		revenueByEmployee: Record<string, number>;
	}
}

declare namespace TodoList {
	interface TodoItem {
		id: string;
		title: string;
		description?: string;
		completed: boolean;
		dueDate?: string;
		createdAt?: string;
	}
}
