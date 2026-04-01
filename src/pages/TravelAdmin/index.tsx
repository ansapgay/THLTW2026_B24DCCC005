import React, { useEffect, useState } from 'react';
import {
	Card,
	Row,
	Col,
	Table,
	Form,
	Input,
	Button,
	Select,
	message,
	Space,
	Statistic,
	Divider,
	Popconfirm,
	Upload,
	Tabs,
	Modal,
} from 'antd';
import {
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
	UploadOutlined,
	BarChartOutlined,
} from '@ant-design/icons';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	LineChart,
	Line,
} from 'recharts';
import styles from './index.less';

const TravelAdmin: React.FC = () => {
	const [activeTab, setActiveTab] = useState('1');
	const [destinations, setDestinations] = useState<Travel.Destination[]>([]);
	const [form] = Form.useForm();
	const [modalVisible, setModalVisible] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	// Mock data
	useEffect(() => {
		const mockDestinations: Travel.Destination[] = [
			{
				id: '1',
				name: 'Vịnh Hạ Long',
				location: 'Quảng Ninh',
				type: 'beach',
				description: 'Vịnh Hạ Long là một trong những kỳ quan thiên nhiên thế giới',
				rating: 4.8,
				totalReviews: 2850,
				pricePerDay: 800000,
				foodCost: 300000,
				accommodationCost: 500000,
				transportCost: 200000,
				viewingTime: 2,
			},
			{
				id: '2',
				name: 'Sa Pa',
				location: 'Lào Cai',
				type: 'mountain',
				description: 'Sa Pa nổi tiếng với những thửa ruộng bậc thang',
				rating: 4.6,
				totalReviews: 1920,
				pricePerDay: 600000,
				foodCost: 200000,
				accommodationCost: 400000,
				transportCost: 150000,
				viewingTime: 1.5,
			},
		];
		setDestinations(mockDestinations);
	}, []);

	const typeLabels: Record<string, string> = {
		beach: 'Biển',
		mountain: 'Núi',
		city: 'Thành phố',
		rural: 'Nông thôn',
		other: 'Khác',
	};

	const handleAddDestination = async (values: any) => {
		try {
			setLoading(true);
			const newDestination: Travel.Destination = {
				id: editingId || Date.now().toString(),
				...values,
				pricePerDay: parseInt(values.pricePerDay),
				foodCost: parseInt(values.foodCost),
				accommodationCost: parseInt(values.accommodationCost),
				transportCost: parseInt(values.transportCost),
				viewingTime: parseFloat(values.viewingTime),
				imageUrl: selectedImage,
			};

			if (editingId) {
				setDestinations(
					destinations.map((d) => (d.id === editingId ? newDestination : d)),
				);
				message.success('Cập nhật địa điểm thành công');
			} else {
				setDestinations([...destinations, newDestination]);
				message.success('Thêm địa điểm thành công');
			}

			setModalVisible(false);
			form.resetFields();
			setEditingId(null);
			setSelectedImage(null);
		} catch (error) {
			message.error('Thêm/cập nhật địa điểm thất bại');
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (record: Travel.Destination) => {
		form.setFieldsValue(record);
		setSelectedImage(record.imageUrl || null);
		setEditingId(record.id || '');
		setModalVisible(true);
	};

	const handleDelete = (id: string) => {
		setDestinations(destinations.filter((d) => d.id !== id));
		message.success('Xóa địa điểm thành công');
	};

	const handleImageUpload = (e: any) => {
		const file = e.file;
		if (file.originFileObj) {
			const reader = new FileReader();
			reader.onload = (event: any) => {
				setSelectedImage(event.target.result);

				message.success('Upload hình ảnh thành công');
			};
			reader.readAsDataURL(file.originFileObj);
		}
	};

	const destinationColumns = [
		{
			title: 'Tên',
			dataIndex: 'name',
			key: 'name',
			render: (text: string) => <strong>{text}</strong>,
		},
		{
			title: 'Địa điểm',
			dataIndex: 'location',
			key: 'location',
		},
		{
			title: 'Loại',
			dataIndex: 'type',
			key: 'type',
			render: (type: string) => typeLabels[type],
			responsive: ['md' as const],
		},
		{
			title: 'Đánh giá',
			dataIndex: 'rating',
			key: 'rating',
			render: (rating: number) => (
				<span>
					{'⭐'.repeat(Math.floor(rating))} {rating.toFixed(1)}
				</span>
			),
			responsive: ['lg' as const],
		},
		{
			title: 'Giá/ngày',
			dataIndex: 'pricePerDay',
			key: 'pricePerDay',
			render: (price: number) => `${price.toLocaleString()}đ`,
			align: 'right' as const,
			responsive: ['lg' as const],
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_: any, record: Travel.Destination) => (
				<Space>
					<Button
						type="text"
						icon={<EditOutlined />}
						onClick={() => handleEdit(record)}
						size="small"
					/>
					<Popconfirm
						title="Bạn có chắc chắn muốn xóa địa điểm này?"
						onConfirm={() => handleDelete(record.id!)}
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
				</Space>
			),
		},
	];

	// Mock statistics data
	const monthlyStats = [
		{ month: 'T1', itineraries: 45, revenue: 2250000 },
		{ month: 'T2', itineraries: 62, revenue: 3100000 },
		{ month: 'T3', itineraries: 58, revenue: 2900000 },
		{ month: 'T4', itineraries: 75, revenue: 3750000 },
	];

	const popularDestinations = [
		{ name: 'Vịnh Hạ Long', count: 128 },
		{ name: 'Sa Pa', count: 95 },
		{ name: 'Phú Quốc', count: 87 },
		{ name: 'Hà Nội', count: 72 },
	];

	const budgetStats = [
		{ category: 'Lưu trú', amount: 1500000, percentage: 40 },
		{ category: 'Ăn uống', amount: 900000, percentage: 24 },
		{ category: 'Di chuyển', amount: 750000, percentage: 20 },
		{ category: 'Hoạt động', amount: 600000, percentage: 16 },
	];

	return (
		<div className={styles.container}>
			<Card className={styles.mainCard}>
				<h1>⚙️ Trang quản trị du lịch</h1>

				<Tabs
					activeKey={activeTab}
					onChange={setActiveTab}
				>
					<Tabs.TabPane tab="📍 Quản lý điểm đến" key="1">
						<div style={{ marginBottom: 16 }}>
							<Button
								type="primary"
								icon={<PlusOutlined />}
								onClick={() => {
									setEditingId(null);
									setSelectedImage(null);
									form.resetFields();
									setModalVisible(true);
								}}
							>
								Thêm điểm đến
							</Button>
						</div>

						<Table
							columns={destinationColumns}
							dataSource={destinations.map((d) => ({ ...d, key: d.id }))}
							loading={loading}
							pagination={{ pageSize: 10 }}
							scroll={{ x: 600 }}
						/>
					</Tabs.TabPane>

					<Tabs.TabPane tab="📊 Thống kê" key="2">
						<Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
							<Col xs={12} sm={6} md={6}>
								<Statistic
									title="Tổng lịch trình"
									value={287}
									prefix={<BarChartOutlined />}
								/>
							</Col>
							<Col xs={12} sm={6} md={6}>
								<Statistic
									title="Tổng doanh thu"
									value={11900000}
									precision={0}
									suffix="đ"
									valueStyle={{ color: '#52c41a' }}
								/>
							</Col>
							<Col xs={12} sm={6} md={6}>
								<Statistic
									title="Địa điểm phổ biến"
									value="Vịnh Hạ Long"
									valueStyle={{ color: '#1890ff' }}
								/>
							</Col>
							<Col xs={12} sm={6} md={6}>
								<Statistic
									title="Đánh giá trung bình"
									value="4.6"
									suffix="⭐"
									valueStyle={{ color: '#faad14' }}
								/>
							</Col>
						</Row>

						<Divider>Lịch trình theo tháng</Divider>
						<Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
							<Col xs={24} md={12}>
								<Card title="Số lượng lịch trình">
									<ResponsiveContainer width="100%" height={300}>
										<LineChart data={monthlyStats}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="month" />
											<YAxis />
											<Tooltip />
											<Legend />
											<Line
												type="monotone"
												dataKey="itineraries"
												stroke="#1890ff"
												name="Số lịch trình"
											/>
										</LineChart>
									</ResponsiveContainer>
								</Card>
							</Col>
							<Col xs={24} md={12}>
								<Card title="Doanh thu theo tháng">
									<ResponsiveContainer width="100%" height={300}>
										<BarChart data={monthlyStats}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="month" />
											<YAxis />
											<Tooltip formatter={(value: any) => `${(value || 0).toLocaleString()}đ`} />
											<Legend />
											<Bar dataKey="revenue" fill="#52c41a" name="Doanh thu (đ)" />
										</BarChart>
									</ResponsiveContainer>
								</Card>
							</Col>
						</Row>

						<Divider>Địa điểm phổ biến</Divider>
						<Row gutter={[16, 16]}>
							<Col xs={24} md={12}>
								<Card>
									<ResponsiveContainer width="100%" height={300}>
										<BarChart data={popularDestinations}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="name" />
											<YAxis />
											<Tooltip />
											<Bar dataKey="count" fill="#1890ff" name="Số lượt" />
										</BarChart>
									</ResponsiveContainer>
								</Card>
							</Col>
							<Col xs={24} md={12}>
								<Card title="Phân bổ chi phí">
									<table style={{ width: '100%', textAlign: 'center' }}>
										<tbody>
											{budgetStats.map((item) => (
												<tr key={item.category}>
													<td style={{ textAlign: 'left' }}>
														<strong>{item.category}</strong>
													</td>
													<td>{item.amount.toLocaleString()}đ</td>
													<td>{item.percentage}%</td>
												</tr>
											))}
										</tbody>
									</table>
								</Card>
							</Col>
						</Row>
					</Tabs.TabPane>
				</Tabs>

				{/* Modal Thêm/Chỉnh sửa Destination */}
				<Modal
					title={editingId ? 'Chỉnh sửa điểm đến' : 'Thêm điểm đến'}
					visible={modalVisible}
					onCancel={() => {
						setModalVisible(false);
						setEditingId(null);
						setSelectedImage(null);
					}}
					footer={null}
					width={700}
				>
					<Form
						form={form}
						layout="vertical"
						onFinish={handleAddDestination}
					>
						<Form.Item
							name="name"
							label="Tên địa điểm"
							rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
						>
							<Input placeholder="VD: Vịnh Hạ Long" />
						</Form.Item>

						<Form.Item
							name="location"
							label="Địa điểm"
							rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}
						>
							<Input placeholder="VD: Quảng Ninh" />
						</Form.Item>

						<Form.Item
							name="type"
							label="Loại hình"
							rules={[{ required: true }]}
						>
							<Select
								options={[
									{ label: 'Biển', value: 'beach' },
									{ label: 'Núi', value: 'mountain' },
									{ label: 'Thành phố', value: 'city' },
									{ label: 'Nông thôn', value: 'rural' },
									{ label: 'Khác', value: 'other' },
								]}
							/>
						</Form.Item>

						<Form.Item
							name="description"
							label="Mô tả"
						>
							<Input.TextArea rows={3} placeholder="Mô tả về địa điểm..." />
						</Form.Item>

						<Form.Item label="Hình ảnh">
							<Upload
								accept="image/*"
								maxCount={1}
								customRequest={handleImageUpload}

								listType="picture"
							>
								<Button icon={<UploadOutlined />}>
									{selectedImage ? 'Thay đổi hình ảnh' : 'Tải lên hình ảnh'}
								</Button>
							</Upload>
							{selectedImage && (
								<img
									src={selectedImage}
									alt="preview"
									style={{
										width: '100%',
										maxHeight: 200,
										marginTop: 8,
										borderRadius: 4,
									}}
								/>
							)}
						</Form.Item>

						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="rating"
									label="Đánh giá"
									rules={[{ required: true }]}
								>
									<Select
										options={[
											{ label: '⭐', value: 1 },
											{ label: '⭐⭐', value: 2 },
											{ label: '⭐⭐⭐', value: 3 },
											{ label: '⭐⭐⭐⭐', value: 4 },
											{ label: '⭐⭐⭐⭐⭐', value: 5 },
										]}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="viewingTime"
									label="Thời gian tham quan (h)"
								>
									<Input type="number" placeholder="2.5" />
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="foodCost"
									label="Chi phí ăn uống (đ)"
								>
									<Input type="number" placeholder="300000" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="accommodationCost"
									label="Chi phí lưu trú (đ)"
								>
									<Input type="number" placeholder="500000" />
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="transportCost"
									label="Chi phí di chuyển (đ)"
								>
									<Input type="number" placeholder="200000" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="pricePerDay"
									label="Giá/ngày (đ)"
								>
									<Input type="number" placeholder="800000" />
								</Form.Item>
							</Col>
						</Row>

						<Space style={{ width: '100%', justifyContent: 'flex-end' }}>
							<Button onClick={() => setModalVisible(false)}>Hủy</Button>
							<Button type="primary" htmlType="submit" loading={loading}>
								{editingId ? 'Cập nhật' : 'Thêm'}
							</Button>
						</Space>
					</Form>
				</Modal>
			</Card>
		</div>
	);
};

export default TravelAdmin;
