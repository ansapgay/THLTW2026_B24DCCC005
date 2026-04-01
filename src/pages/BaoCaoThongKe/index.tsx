import React, { useEffect, useMemo } from 'react';
import { Row, Col, Card, Statistic, Table, Empty } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useModel } from 'umi';

const BaoCaoThongKe: React.FC = () => {
	const { data: cauLacBoData, getDataCauLacBo } = useModel('cauLacBo');
	const { data: dangKyData, getDataDangKyThanhVien } = useModel('dangKyThanhVien');

	useEffect(() => {
		getDataCauLacBo();
		getDataDangKyThanhVien();
	}, []);

	// Tính toán thống kê
	const stats = useMemo(() => {
		const totalClubs = cauLacBoData.length;
		const totalPending = dangKyData.filter((d) => d.status === 'Pending').length;
		const totalApproved = dangKyData.filter((d) => d.status === 'Approved').length;
		const totalRejected = dangKyData.filter((d) => d.status === 'Rejected').length;

		return {
			totalClubs,
			totalPending,
			totalApproved,
			totalRejected,
		};
	}, [cauLacBoData, dangKyData]);

	// Dữ liệu cho biểu đồ cột
	const chartData = useMemo(() => {
		return cauLacBoData.map((club) => {
			const pending = dangKyData.filter(
				(d) => d.cauLacBoId === club.id && d.status === 'Pending'
			).length;
			const approved = dangKyData.filter(
				(d) => d.cauLacBoId === club.id && d.status === 'Approved'
			).length;
			const rejected = dangKyData.filter(
				(d) => d.cauLacBoId === club.id && d.status === 'Rejected'
			).length;

			return {
				name: club.name,
				Pending: pending,
				Approved: approved,
				Rejected: rejected,
			};
		});
	}, [cauLacBoData, dangKyData]);

	// Dữ liệu bảng chi tiết theo CLB
	const tableData = useMemo(() => {
		return cauLacBoData.map((club) => {
			const clubRegistrations = dangKyData.filter((d) => d.cauLacBoId === club.id);
			return {
				id: club.id,
				name: club.name,
				chairman: club.chairman,
				total: clubRegistrations.length,
				pending: clubRegistrations.filter((d) => d.status === 'Pending').length,
				approved: clubRegistrations.filter((d) => d.status === 'Approved').length,
				rejected: clubRegistrations.filter((d) => d.status === 'Rejected').length,
			};
		});
	}, [cauLacBoData, dangKyData]);

	const columns = [
		{
			title: 'STT',
			width: 60,
			render: (_, __, index) => index + 1,
		},
		{
			title: 'Tên câu lạc bộ',
			dataIndex: 'name',
		},
		{
			title: 'Chủ nhiệm',
			dataIndex: 'chairman',
		},
		{
			title: 'Tổng số đơn',
			dataIndex: 'total',
			align: 'center' as const,
		},
		{
			title: 'Chờ duyệt',
			dataIndex: 'pending',
			align: 'center' as const,
		},
		{
			title: 'Đã duyệt',
			dataIndex: 'approved',
			align: 'center' as const,
		},
		{
			title: 'Từ chối',
			dataIndex: 'rejected',
			align: 'center' as const,
		},
	];

	const COLORS = ['#ff7875', '#1890ff', '#faad14'];

	return (
		<div style={{ padding: '24px' }}>
			<h2>Báo cáo và Thống kê</h2>

			{/* Thống kê chung */}
			<Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Tổng câu lạc bộ"
							value={stats.totalClubs}
							valueStyle={{ color: '#1890ff' }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Chờ duyệt"
							value={stats.totalPending}
							valueStyle={{ color: '#faad14' }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Đã duyệt"
							value={stats.totalApproved}
							valueStyle={{ color: '#52c41a' }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Từ chối"
							value={stats.totalRejected}
							valueStyle={{ color: '#ff7875' }}
						/>
					</Card>
				</Col>
			</Row>

			{/* Biểu đồ cột */}
			<Card style={{ marginBottom: 24 }}>
				<h3>Số đơn đăng ký theo câu lạc bộ</h3>
				{chartData.length > 0 ? (
					<ResponsiveContainer width="100%" height={400}>
						<BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 100 }}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis
								dataKey="name"
								angle={-45}
								textAnchor="end"
								height={150}
							/>
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="Pending" fill="#faad14" />
							<Bar dataKey="Approved" fill="#1890ff" />
							<Bar dataKey="Rejected" fill="#ff7875" />
						</BarChart>
					</ResponsiveContainer>
				) : (
					<Empty description="Không có dữ liệu câu lạc bộ" />
				)}
			</Card>

			{/* Bảng chi tiết */}
			<Card>
				<h3>Bảng chi tiết theo câu lạc bộ</h3>
				{tableData.length > 0 ? (
					<Table
						rowKey="id"
						columns={columns}
						dataSource={tableData}
						pagination={{ pageSize: 10 }}
						scroll={{ x: 900 }}
					/>
				) : (
					<Empty description="Không có dữ liệu" />
				)}
			</Card>
		</div>
	);
};

export default BaoCaoThongKe;
