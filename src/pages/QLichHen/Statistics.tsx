import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Table, Statistic, Tabs } from 'antd';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useModel } from 'umi';
import * as api from '@/services/QLichHen/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658', '#ff7c7c'];

const Statistics: React.FC = () => {
	const { employees, services } = useModel('QLichHen/index');
	const [stats, setStats] = useState<QLichHen.Statistics>();

	useEffect(() => {
		setStats(api.getStatistics());
	}, []);

	if (!stats) return <div>Loading...</div>;

	// Prepare data for charts
	const appointmentsByDateData = Object.entries(stats.appointmentsByDate).map(([date, count]) => ({
		date: new Date(date).toLocaleDateString('vi-VN'),
		count,
	}));

	const revenueByServiceData = Object.entries(stats.revenueByService).map(([name, revenue]) => ({
		name,
		revenue,
	}));

	const revenueByEmployeeData = Object.entries(stats.revenueByEmployee).map(([empId, revenue]) => ({
		employee: employees.find(e => e.id === empId)?.name || empId,
		revenue,
	}));

	const employeeRatings = employees.map(emp => ({
		name: emp.name,
		rating: api.getAverageRating(emp.id),
	}));

	const statusData = [
		{ name: 'Chờ duyệt', value: stats.pendingAppointments },
		{ name: 'Xác nhận', value: stats.confirmedAppointments },
		{ name: 'Hoàn thành', value: stats.completedAppointments },
	];

	const items = [
		{
			key: 'overview',
			label: 'Tổng quan',
			children: (
				<>
					<Row gutter={[16, 16]}>
						<Col xs={24} sm={12} lg={6}>
							<Card>
								<Statistic title='Tổng lịch hẹn' value={stats.totalAppointments} />
							</Card>
						</Col>
						<Col xs={24} sm={12} lg={6}>
							<Card>
								<Statistic title='Hoàn thành' value={stats.completedAppointments} />
							</Card>
						</Col>
						<Col xs={24} sm={12} lg={6}>
							<Card>
								<Statistic title='Chờ duyệt' value={stats.pendingAppointments} />
							</Card>
						</Col>
						<Col xs={24} sm={12} lg={6}>
							<Card>
								<Statistic title='Xác nhận' value={stats.confirmedAppointments} />
							</Card>
						</Col>
						<Col xs={24} sm={12} lg={6}>
							<Card>
								<Statistic title='Tổng nhân viên' value={stats.totalEmployees} />
							</Card>
						</Col>
						<Col xs={24} sm={12} lg={6}>
							<Card>
								<Statistic title='Tổng dịch vụ' value={stats.totalServices} />
							</Card>
						</Col>
						<Col xs={24} sm={12} lg={6}>
							<Card>
								<Statistic title='Tổng đánh giá' value={stats.totalRatings} />
							</Card>
						</Col>
					</Row>

					<Row gutter={[16, 16]} style={{ marginTop: 20 }}>
						<Col xs={24} lg={12}>
							<Card title='Lịch hẹn theo trạng thái' style={{ height: '400px' }}>
								<ResponsiveContainer width='100%' height={350}>
									<PieChart>
										<Pie
											data={statusData}
											cx='50%'
											cy='50%'
											labelLine={false}
											label={({ name, value }) => `${name}: ${value}`}
											outerRadius={80}
											fill='#8884d8'
											dataKey='value'
										>
											{statusData.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
											))}
										</Pie>
										<Tooltip />
									</PieChart>
								</ResponsiveContainer>
							</Card>
						</Col>
						<Col xs={24} lg={12}>
							<Card title='Đánh giá trung bình nhân viên' style={{ height: '400px' }}>
								<ResponsiveContainer width='100%' height={350}>
									<BarChart data={employeeRatings}>
										<CartesianGrid strokeDasharray='3 3' />
										<XAxis dataKey='name' />
										<YAxis domain={[0, 5]} />
										<Tooltip />
										<Bar dataKey='rating' fill='#8884d8' />
									</BarChart>
								</ResponsiveContainer>
							</Card>
						</Col>
					</Row>
				</>
			),
		},
		{
			key: 'appointments',
			label: 'Lịch hẹn',
			children: (
				<Card title='Lịch hẹn theo ngày' style={{ height: '500px' }}>
					<ResponsiveContainer width='100%' height={450}>
						<LineChart data={appointmentsByDateData}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='date' />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line type='monotone' dataKey='count' stroke='#8884d8' name='Số lịch hẹn' />
						</LineChart>
					</ResponsiveContainer>
				</Card>
			),
		},
		{
			key: 'revenue',
			label: 'Doanh thu',
			children: (
				<>
					<Row gutter={[16, 16]}>
						<Col xs={24} lg={12}>
							<Card title='Doanh thu theo dịch vụ' style={{ height: '500px' }}>
								<ResponsiveContainer width='100%' height={450}>
									<BarChart data={revenueByServiceData}>
										<CartesianGrid strokeDasharray='3 3' />
										<XAxis dataKey='name' angle={-45} textAnchor='end' height={100} />
										<YAxis />
										<Tooltip formatter={(value) => value.toLocaleString('vi-VN')} />
										<Bar dataKey='revenue' fill='#82ca9d' />
									</BarChart>
								</ResponsiveContainer>
							</Card>
						</Col>
						<Col xs={24} lg={12}>
							<Card title='Doanh thu theo nhân viên' style={{ height: '500px' }}>
								<ResponsiveContainer width='100%' height={450}>
									<BarChart data={revenueByEmployeeData}>
										<CartesianGrid strokeDasharray='3 3' />
										<XAxis dataKey='employee' angle={-45} textAnchor='end' height={100} />
										<YAxis />
										<Tooltip formatter={(value) => value.toLocaleString('vi-VN')} />
										<Bar dataKey='revenue' fill='#ffc658' />
									</BarChart>
								</ResponsiveContainer>
							</Card>
						</Col>
					</Row>

					<Card title='Bảng doanh thu chi tiết' style={{ marginTop: 20 }}>
						<Row gutter={[16, 16]}>
							<Col xs={24} lg={12}>
								<h4>Doanh thu theo dịch vụ</h4>
								<Table
									columns={[
										{ title: 'Dịch vụ', dataIndex: 'name', key: 'name' },
										{
											title: 'Doanh thu (VND)',
											dataIndex: 'revenue',
											key: 'revenue',
											render: (revenue: number) => revenue.toLocaleString('vi-VN'),
										},
									]}
									dataSource={revenueByServiceData}
									rowKey='name'
									pagination={false}
								/>
							</Col>
							<Col xs={24} lg={12}>
								<h4>Doanh thu theo nhân viên</h4>
								<Table
									columns={[
										{ title: 'Nhân viên', dataIndex: 'employee', key: 'employee' },
										{
											title: 'Doanh thu (VND)',
											dataIndex: 'revenue',
											key: 'revenue',
											render: (revenue: number) => revenue.toLocaleString('vi-VN'),
										},
									]}
									dataSource={revenueByEmployeeData}
									rowKey='employee'
									pagination={false}
								/>
							</Col>
						</Row>
					</Card>
				</>
			),
		},
	];

	return (
		<div style={{ marginBottom: 20 }}>
			<Tabs items={items} />
		</div>
	);
};

export default Statistics;
