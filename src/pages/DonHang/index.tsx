import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, Row, Col, Space, Statistic } from 'antd';
import { PlusOutlined, ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import DonHangForm from './Form';
import DonHangTable from './DonHangTable';

const DonHang: React.FC = () => {
	const { data, getDataOrder, setIsEdit, setCurrentOrder, setVisible, visible, isEdit } =
		useModel('donhang');
	const [refreshCount, setRefreshCount] = useState(0);

	useEffect(() => {
		getDataOrder();
	}, []);

	const handleCreateNew = () => {
		setCurrentOrder(undefined);
		setIsEdit(false);
		setVisible(true);
	};

	const handleRefresh = () => {
		setRefreshCount(refreshCount + 1);
		getDataOrder();
	};

	// Calculate statistics
	const totalOrders = data.length;
	const totalRevenue = data.reduce((sum, order) => sum + order.totalAmount, 0);
	const pendingOrders = data.filter((o) => o.status === 'Chờ xác nhận').length;
	const completedOrders = data.filter((o) => o.status === 'Hoàn thành').length;

	return (
		<div style={{ padding: '24px' }}>
			<Card
				style={{
					marginBottom: 24,
					boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
				}}
			>
				<Row gutter={[16, 16]}>
					<Col xs={12} sm={6}>
						<Statistic
							title="Tổng đơn hàng"
							value={totalOrders}
							prefix={<ShoppingCartOutlined />}
							valueStyle={{ color: '#1890ff' }}
						/>
					</Col>
					<Col xs={12} sm={6}>
						<Statistic
							title="Đơn chờ xác nhận"
							value={pendingOrders}
							valueStyle={{ color: '#ff7a45' }}
						/>
					</Col>
					<Col xs={12} sm={6}>
						<Statistic
							title="Đơn hoàn thành"
							value={completedOrders}
							valueStyle={{ color: '#52c41a' }}
						/>
					</Col>
					<Col xs={12} sm={6}>
						<Statistic
							title="Tổng doanh thu"
							value={totalRevenue}
							prefix={<DollarOutlined />}
							suffix="đ"
							formatter={(value: any) => value.toLocaleString('vi-VN')}
							valueStyle={{ color: '#13c2c2' }}
						/>
					</Col>
				</Row>
			</Card>

			{/* Header */}
			<div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h1 style={{ margin: 0 }}>Quản lý đơn hàng</h1>
				<Space>
					<Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleCreateNew}>
						Thêm đơn hàng
					</Button>
				</Space>
			</div>

			{/* Table */}
			<DonHangTable onRefresh={handleRefresh} />

			{/* Modal Form */}
			<Modal
				title={isEdit ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng mới'}
				visible={visible}
				footer={null}
				onCancel={() => setVisible(false)}
				width={1000}
				destroyOnClose
			>
				<DonHangForm onSuccess={handleRefresh} />
			</Modal>
		</div>
	);
};

export default DonHang;
