import React, { useEffect, useState } from 'react';
import {
	Card,
	Row,
	Col,
	Table,
	Form,
	Input,
	Button,
	Modal,
	Select,
	Alert,
	Statistic,
	Divider,
	Popconfirm,
	Space,
	Progress,
	Empty,
} from 'antd';
import {
	WarningOutlined,
	DeleteOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import styles from './index.less';

const BudgetManagement: React.FC = () => {
	const [budgetItems, setBudgetItems] = useState<Travel.BudgetItem[]>([]);
	const [form] = Form.useForm();
	const [modalVisible, setModalVisible] = useState(false);
	const [totalBudget] = useState(5000000);

	useEffect(() => {
		const mockBudgetItems: Travel.BudgetItem[] = [
			{
				category: 'accommodation',
				description: 'Khách sạn Hà Nội 2 đêm',
				amount: 800000,
				date: '2026-04-08',
			},
			{
				category: 'food',
				description: 'Ăn sáng tại Hà Nội',
				amount: 200000,
				date: '2026-04-08',
			},
			{
				category: 'transport',
				description: 'Xe bus Hà Nội - Sa Pa',
				amount: 400000,
				date: '2026-04-09',
			},
			{
				category: 'activities',
				description: 'Tour trekking Sa Pa',
				amount: 600000,
				date: '2026-04-09',
			},
			{
				category: 'food',
				description: 'Ăn trưa tại Sa Pa',
				amount: 250000,
				date: '2026-04-09',
			},
			{
				category: 'accommodation',
				description: 'Khách sạn Sa Pa 1 đêm',
				amount: 600000,
				date: '2026-04-09',
			},
		];
		setBudgetItems(mockBudgetItems);
	}, []);

	const categoryColors: Record<string, string> = {
		food: '#52c41a',
		accommodation: '#1890ff',
		transport: '#faad14',
		activities: '#f5222d',
		other: '#722ed1',
	};

	const categoryLabels: Record<string, string> = {
		food: 'Ăn uống',
		accommodation: 'Lưu trú',
		transport: 'Di chuyển',
		activities: 'Hoạt động',
		other: 'Khác',
	};

	const spentByCategory = budgetItems.reduce((acc: any[], item) => {
		const existing = acc.find((c) => c.category === item.category);
		if (existing) {
			existing.amount += item.amount;
		} else {
			acc.push({
				category: item.category,
				amount: item.amount,
				name: categoryLabels[item.category],
			});
		}
		return acc;
	}, []);

	const totalSpent = budgetItems.reduce((sum, item) => sum + item.amount, 0);
	const remainingBudget = totalBudget - totalSpent;
	const budgetUsedPercentage = (totalSpent / totalBudget) * 100;
	const isOverBudget = totalSpent > totalBudget;

	const handleAddBudgetItem = async (values: any) => {
		try {
			const newItem: Travel.BudgetItem = {
				category: values.category,
				description: values.description,
				amount: values.amount,
				date: values.date,
			};
			setBudgetItems([...budgetItems, newItem]);
			setModalVisible(false);
			form.resetFields();
		} catch (error) {
			console.error('Failed to add budget item:', error);
		}
	};

	const handleRemoveItem = (index: number) => {
		setBudgetItems(budgetItems.filter((_, i) => i !== index));
	};

	const columns = [
		{
			title: 'Hạng mục',
			dataIndex: 'category',
			key: 'category',
			render: (category: string) => (
				<span
					style={{
						padding: '4px 8px',
						backgroundColor: categoryColors[category],
						color: '#fff',
						borderRadius: '4px',
					}}
				>
					{categoryLabels[category]}
				</span>
			),
			responsive: ['md' as const],
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Số tiền',
			dataIndex: 'amount',
			key: 'amount',
			render: (amount: number) => <strong>{amount.toLocaleString()}đ</strong>,
			align: 'right' as const,
		},
		{
			title: 'Ngày',
			dataIndex: 'date',
			key: 'date',
			responsive: ['lg' as const],
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_: any, __: any, index: number) => (
				<Popconfirm
					title="Bạn có chắc chắn muốn xóa chi phí này?"
					onConfirm={() => handleRemoveItem(index)}
					okText="Có"
					cancelText="Không"
				>
					<Button
						type="text"
						danger
						icon={<DeleteOutlined />}
						size="small"
					/>
				</Popconfirm>
			),
		},
	];

	return (
		<div className={styles.container}>
			<Card className={styles.mainCard}>
				<h1>💰 Quản lý ngân sách</h1>

				{/* Summary Section */}
				<div className={styles.summarySection}>
					<Row gutter={[16, 16]}>
						<Col xs={12} sm={6} md={6}>
							<Statistic
								title="Tổng ngân sách"
								value={totalBudget}
								precision={0}
								suffix="đ"
								valueStyle={{ color: '#1890ff' }}
							/>
						</Col>
						<Col xs={12} sm={6} md={6}>
							<Statistic
								title="Đã chi"
								value={totalSpent}
								precision={0}
								suffix="đ"
								valueStyle={{ color: isOverBudget ? '#ff4d4f' : '#52c41a' }}
							/>
						</Col>
						<Col xs={12} sm={6} md={6}>
							<Statistic
								title="Còn lại"
								value={remainingBudget}
								precision={0}
								suffix="đ"
								valueStyle={{ color: isOverBudget ? '#ff4d4f' : '#faad14' }}
							/>
						</Col>
						<Col xs={12} sm={6} md={6}>
							<Statistic
								title="Tỷ lệ sử dụng"
								value={budgetUsedPercentage}
								precision={1}
								suffix="%"
								valueStyle={{ color: budgetUsedPercentage > 80 ? '#ff4d4f' : '#1890ff' }}
							/>
						</Col>
					</Row>

					<Divider />

					{isOverBudget && (
						<Alert
							type="error"
							icon={<WarningOutlined />}
							message="⚠️ Cảnh báo"
							description={`Bạn đã vượt quá ngân sách ${(totalSpent - totalBudget).toLocaleString()}đ`}
							closable
							style={{ marginBottom: 16 }}
						/>
					)}

					{budgetUsedPercentage > 80 && !isOverBudget && (
						<Alert
							type="warning"
							icon={<WarningOutlined />}
							message="⚠️ Chú ý"
							description={`Bạn đã sử dụng ${budgetUsedPercentage.toFixed(1)}% ngân sách dự kiến`}
							closable
							style={{ marginBottom: 16 }}
						/>
					)}

					<Progress
						percent={Math.min(budgetUsedPercentage, 100)}
						strokeColor={{
							'0%': '#52c41a',
							'50%': '#faad14',
							'100%': '#f5222d',
						}}
						status={isOverBudget ? 'exception' : 'active'}
					/>
				</div>

				<Divider>Phân bổ chi phí theo hạng mục</Divider>

				{/* Charts Section */}
				<Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
					<Col xs={24} md={12}>
						<Card>
							<h3>Biểu đồ tròn</h3>
							{spentByCategory.length > 0 ? (
								<ResponsiveContainer width="100%" height={300}>
									<PieChart>
										<Pie
											data={spentByCategory}
											dataKey="amount"
											nameKey="name"
											cx="50%"
											cy="50%"
											outerRadius={80}
										>
											{spentByCategory.map((entry: any) => (
												<Cell
													key={`cell-${entry.category}`}
													fill={categoryColors[entry.category]}
												/>
											))}
										</Pie>
										<Tooltip formatter={(value: any) => `${(value || 0).toLocaleString()}đ`} />
										<Legend />
									</PieChart>
								</ResponsiveContainer>
							) : (
								<Empty description="Chưa có dữ liệu" />
							)}
						</Card>
					</Col>

					<Col xs={24} md={12}>
						<Card>
							<h3>Biểu đồ cột</h3>
							{spentByCategory.length > 0 ? (
								<ResponsiveContainer width="100%" height={300}>
									<BarChart data={spentByCategory}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="name" />
										<YAxis />
										<Tooltip formatter={(value: any) => `${(value || 0).toLocaleString()}đ`} />
										<Bar dataKey="amount" fill="#1890ff" />
									</BarChart>
								</ResponsiveContainer>
							) : (
								<Empty description="Chưa có dữ liệu" />
							)}
						</Card>
					</Col>
				</Row>

				<Divider>Chi tiết chi phí</Divider>

				<div style={{ marginBottom: 16 }}>
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={() => setModalVisible(true)}
					>
						Thêm chi phí
					</Button>
				</div>

				<Table
					columns={columns}
					dataSource={budgetItems.map((item, index) => ({
						...item,
						key: index,
					}))}
					pagination={{ pageSize: 10 }}
					scroll={{ x: 600 }}
				/>

				{/* Add Budget Item Modal */}
				<Modal
					title="Thêm chi phí"
					visible={modalVisible}
					onCancel={() => setModalVisible(false)}
					footer={null}
				>
					<Form
						form={form}
						layout="vertical"
						onFinish={handleAddBudgetItem}
					>
						<Form.Item
							name="category"
							label="Hạng mục"
							rules={[{ required: true }]}
						>
							<Select
								options={[
									{ label: 'Ăn uống', value: 'food' },
									{ label: 'Lưu trú', value: 'accommodation' },
									{ label: 'Di chuyển', value: 'transport' },
									{ label: 'Hoạt động', value: 'activities' },
									{ label: 'Khác', value: 'other' },
								]}
							/>
						</Form.Item>

						<Form.Item
							name="description"
							label="Mô tả"
							rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
						>
							<Input placeholder="VD: Ăn sáng tại Hà Nội" />
						</Form.Item>

						<Form.Item
							name="amount"
							label="Số tiền (đ)"
							rules={[
								{ required: true, message: 'Vui lòng nhập số tiền' },
								{
									pattern: /^[0-9]+$/,
									message: 'Vui lòng nhập số',
								},
							]}
						>
							<Input type="number" placeholder="VD: 200000" />
						</Form.Item>

						<Form.Item
							name="date"
							label="Ngày"
						>
							<Input type="date" />
						</Form.Item>

						<Space style={{ width: '100%', justifyContent: 'flex-end' }}>
							<Button onClick={() => setModalVisible(false)}>Hủy</Button>
							<Button type="primary" htmlType="submit">
								Thêm
							</Button>
						</Space>
					</Form>
				</Modal>
			</Card>
		</div>
	);
};

export default BudgetManagement;
