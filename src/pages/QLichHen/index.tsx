import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { useModel } from 'umi';
import EmployeeManagement from './EmployeeManagement';
import ServiceManagement from './ServiceManagement';
import AppointmentBooking from './AppointmentBooking';
import AppointmentManagement from './AppointmentManagement';
import RatingManagement from './RatingManagement';
import Statistics from './Statistics';

const QLichHenPage: React.FC = () => {
	const { loadAllData } = useModel('QLichHen/index');

	useEffect(() => {
		loadAllData();
	}, []);

	const tabs = [
		{
			key: 'employee',
			label: 'Quản lý Nhân viên',
			children: <EmployeeManagement />,
		},
		{
			key: 'service',
			label: 'Quản lý Dịch vụ',
			children: <ServiceManagement />,
		},
		{
			key: 'booking',
			label: 'Đặt lịch hẹn',
			children: <AppointmentBooking />,
		},
		{
			key: 'appointment',
			label: 'Quản lý Lịch hẹn',
			children: <AppointmentManagement />,
		},
		{
			key: 'rating',
			label: 'Đánh giá & Phản hồi',
			children: <RatingManagement />,
		},
		{
			key: 'statistics',
			label: 'Thống kê & Báo cáo',
			children: <Statistics />,
		},
	];

	return (
		<div style={{ padding: '20px' }}>
			<h1>Hệ thống Quản lý Lịch hẹn</h1>
			<Tabs items={tabs} />
		</div>
	);
};

export default QLichHenPage;
