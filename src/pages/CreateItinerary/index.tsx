import React, { useEffect, useState } from 'react';
import {
	Card,
	Form,
	Input,
	DatePicker,
	Button,
	Row,
	Col,
	Space,
	Select,
	Empty,
	Divider,
	Alert,
	message,
} from 'antd';
import {
	DeleteOutlined,
	ArrowUpOutlined,
	ArrowDownOutlined,
	SaveOutlined,
	ClearOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './index.less';

const CreateItinerary: React.FC = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [selectedDay, setSelectedDay] = useState<string | undefined>();
	const [availableDestinations, setAvailableDestinations] = useState<Travel.Destination[]>([]);
	const [days, setDays] = useState<Travel.Day[]>([]);
	const [totalCost, setTotalCost] = useState(0);

	useEffect(() => {
		// Fetch destinations (mock data)
		const mockDestinations: Travel.Destination[] = [
			{
				id: '1',
				name: 'Vịnh Hạ Long',
				location: 'Quảng Ninh',
				type: 'beach',
				rating: 4.8,
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
				rating: 4.6,
				pricePerDay: 600000,
				foodCost: 200000,
				accommodationCost: 400000,
				transportCost: 150000,
				viewingTime: 1.5,
			},
			{
				id: '3',
				name: 'Hà Nội',
				location: 'Hà Nội',
				type: 'city',
				rating: 4.2,
				pricePerDay: 800000,
				foodCost: 350000,
				accommodationCost: 500000,
				transportCost: 120000,
				viewingTime: 1,
			},
			{
				id: '4',
				name: 'Phú Quốc',
				location: 'Kiên Giang',
				type: 'beach',
				rating: 4.7,
				pricePerDay: 900000,
				foodCost: 350000,
				accommodationCost: 550000,
				transportCost: 180000,
				viewingTime: 2,
			},
		];
		setAvailableDestinations(mockDestinations);
	}, []);

	const handleDateRangeChange = (dates: any) => {
		if (dates && dates[0] && dates[1]) {
			const start = dates[0];
			const end = dates[1];
			const daysDiff = end.diff(start, 'day') + 1;

			const newDays: Travel.Day[] = [];
			for (let i = 0; i < daysDiff; i++) {
				const date = start.clone().add(i, 'day');
				newDays.push({
					date: date.format('YYYY-MM-DD'),
					destinations: [],
				});
			}
			setDays(newDays);
			form.setFieldsValue({ startDate: start, endDate: end });
		}
	};

	const handleAddDestinationToDay = (dayDate: string, destinationId: string) => {
		const destination = availableDestinations.find((d) => d.id === destinationId);
		if (!destination) return;

		setDays((prevDays) =>
			prevDays.map((day) => {
				if (day.date === dayDate) {
					const maxOrder = day.destinations.length;
					return {
						...day,
						destinations: [
							...day.destinations,
							{
								destinationId,
								destination,
								order: maxOrder + 1,
								notes: '',
							},
						],
					};
				}
				return day;
			}),
		);

		calculateTotalCost();
		message.success('Thêm điểm đến thành công');
	};

	const handleRemoveDestinationFromDay = (dayDate: string, order: number) => {
		setDays((prevDays) =>
			prevDays.map((day) => {
				if (day.date === dayDate) {
					return {
						...day,
						destinations: day.destinations
							.filter((dest) => dest.order !== order)
							.map((dest, index) => ({
								...dest,
								order: index + 1,
							})),
					};
				}
				return day;
			}),
		);
		calculateTotalCost();
	};

	const handleMoveDestination = (dayDate: string, order: number, direction: 'up' | 'down') => {
		setDays((prevDays) =>
			prevDays.map((day) => {
				if (day.date === dayDate) {
					const dests = [...day.destinations].sort((a, b) => a.order - b.order);
					const index = dests.findIndex((d) => d.order === order);

					if (
						(direction === 'up' && index > 0) ||
						(direction === 'down' && index < dests.length - 1)
					) {
						const targetIndex = direction === 'up' ? index - 1 : index + 1;
						[dests[index].order, dests[targetIndex].order] = [
							dests[targetIndex].order,
							dests[index].order,
						];
					}

					return {
						...day,
						destinations: dests,
					};
				}
				return day;
			}),
		);
	};

	const calculateTotalCost = () => {
		let total = 0;
		days.forEach((day) => {
			day.destinations.forEach((dest) => {
				if (dest.destination) {
					total +=
						(dest.destination.foodCost || 0) +
						(dest.destination.accommodationCost || 0) +
						(dest.destination.transportCost || 0);
				}
			});
		});
		setTotalCost(total);
	};

	const handleSaveItinerary = async () => {
		try {
			setLoading(true);
			const values = form.getFieldsValue();

			if (!values.title) {
				message.error('Vui lòng nhập tiêu đề lịch trình');
				return;
			}

			if (days.length === 0 || days.every((d) => d.destinations.length === 0)) {
				message.error('Vui lòng thêm ít nhất một điểm đến');
				return;
			}

			const itinerary: Travel.Itinerary = {
				title: values.title,
				startDate: values.startDate.format('YYYY-MM-DD'),
				endDate: values.endDate.format('YYYY-MM-DD'),
				days: days.filter((d) => d.destinations.length > 0),
				totalBudget: values.totalBudget || totalCost,
				destinations: availableDestinations.filter((d) =>
					days.some((day) =>
						day.destinations.some((dest) => dest.destinationId === d.id),
					),
				),
				description: values.description,
				isPublic: values.isPublic || false,
			};

			// Mock API call
			console.log('Saving itinerary:', itinerary);
			message.success('Lưu lịch trình thành công!');
			form.resetFields();
			setDays([]);
			setTotalCost(0);
		} catch (error) {
			message.error('Lỗi khi lưu lịch trình');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleClear = () => {
		form.resetFields();
		setDays([]);
		setSelectedDay(undefined);
		setTotalCost(0);
	};

	return (
		<div className={styles.container}>
			<Card className={styles.mainCard}>
				<h1>📝 Tạo lịch trình du lịch</h1>

				<Form
					form={form}
					layout="vertical"
					initialValues={{ isPublic: false }}
				>
					<Row gutter={[16, 16]}>
						<Col xs={24} sm={12}>
							<Form.Item
								name="title"
								label="Tiêu đề lịch trình"
								rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
							>
								<Input placeholder="VD: Hành trình Miền Bắc 3 ngày" />
							</Form.Item>
						</Col>

						<Col xs={24} sm={12}>
							<Form.Item name="isPublic" label="Công khai lịch trình">
								<Select
									options={[
										{ label: 'Công khai', value: true },
										{ label: 'Riêng tư', value: false },
									]}
								/>
							</Form.Item>
						</Col>

							<Form.Item
								name="dateRange"
								label="Chọn ngày bắt đầu và kết thúc"
								required
							>
								<DatePicker.RangePicker
									style={{ width: '100%' }}
									onChange={handleDateRangeChange}
									format="DD/MM/YYYY"
									disabled={loading}
								/>
							</Form.Item>

						<Col xs={24}>
							<Form.Item
								name="description"
								label="Mô tả lịch trình"
							>
								<Input.TextArea
									rows={3}
									placeholder="Mô tả chi tiết về lịch trình của bạn..."
								/>
							</Form.Item>
						</Col>

						<Col xs={24}>
							<Form.Item
								name="totalBudget"
								label="Tổng ngân sách dự kiến (đ)"
							>
								<Input
									type="number"
									placeholder="VD: 5000000"
								/>
							</Form.Item>
						</Col>
					</Row>
				</Form>

				{days.length > 0 && (
					<>
						<Divider>Lịch trình theo ngày</Divider>

						{days.map((day) => (
							<Card
								key={day.date}
								className={styles.dayCard}
								style={{
									marginBottom: 16,
									border: selectedDay === day.date ? '2px solid #1890ff' : undefined,
								}}
								onClick={() => setSelectedDay(day.date)}
							>
								<h3>
									📅 {dayjs(day.date).format('dddd, DD/MM/YYYY')}
									{day.destinations.length > 0 && (
										<span style={{ marginLeft: 8, color: '#595959', fontSize: '14px' }}>
											({day.destinations.length} điểm)
										</span>
									)}
								</h3>

								{day.destinations.length > 0 ? (
									<div className={styles.destinationList}>
										{day.destinations
											.sort((a, b) => a.order - b.order)
											.map((item) => (
												<div key={item.order} className={styles.destinationItem}>
													<div className={styles.destinationInfo}>
														<strong>{item.order}. {item.destination?.name}</strong>
														<p>{item.destination?.location}</p>
														<p>
															Thời gian tham quan: {item.destination?.viewingTime}h
														</p>
													</div>
													<div className={styles.destinationActions}>
														<Button.Group>
															<Button
																size="small"
																icon={<ArrowUpOutlined />}
																onClick={() => handleMoveDestination(day.date, item.order, 'up')}
																disabled={item.order === 1}
															/>
															<Button
																size="small"
																icon={<ArrowDownOutlined />}
																onClick={() => handleMoveDestination(day.date, item.order, 'down')}
																disabled={item.order === day.destinations.length}
															/>
															<Button
																size="small"
																danger
																icon={<DeleteOutlined />}
																onClick={() => handleRemoveDestinationFromDay(day.date, item.order)}
															/>
														</Button.Group>
													</div>
												</div>
											))}
									</div>
								) : (
									<Empty description="Chưa có điểm đến" />
								)}

								{selectedDay === day.date && (
									<div style={{ marginTop: 12 }}>
										<Select
											placeholder="Chọn điểm đến để thêm"
											options={availableDestinations.map((d) => ({
												label: `${d.name} (${d.location})`,
												value: d.id,
											}))}
											onSelect={(value) => handleAddDestinationToDay(day.date, value)}
											style={{ width: '100%' }}
										/>
									</div>
								)}
							</Card>
						))}

						<Alert
							message={`Tổng chi phí dự kiến: ${totalCost.toLocaleString()}đ`}
							type="info"
							style={{ marginBottom: 16 }}
						/>
					</>
				)}

				<Space style={{ marginTop: 16 }}>
					<Button
						type="primary"
						icon={<SaveOutlined />}
						onClick={handleSaveItinerary}
						loading={loading}
						size="large"
					>
						Lưu lịch trình
					</Button>
					<Button
						icon={<ClearOutlined />}
						onClick={handleClear}
					>
						Xóa hết
					</Button>
				</Space>
			</Card>
		</div>
	);
};

export default CreateItinerary;
