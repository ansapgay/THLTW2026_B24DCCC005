import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Rate, Space, Card, Tag, message, Descriptions } from 'antd';
import { useModel } from 'umi';
import * as api from '@/services/QLichHen/api';
import dayjs from 'dayjs';

const RatingManagement: React.FC = () => {
	const { appointments, setAppointments, employees, services, ratings, setRatings, visibleRatingModal, setVisibleRatingModal } = useModel('QLichHen/index');
	const [form] = Form.useForm();
	const [selectedRating, setSelectedRating] = useState<QLichHen.Rating>();
	const [isAddingRating, setIsAddingRating] = useState(false);

	useEffect(() => {
		loadRatings();
		setAppointments(api.getAppointments());
	}, []);

	const loadRatings = () => {
		setRatings(api.getRatings());
	};

	const handleAddRating = (appointment: QLichHen.Appointment) => {
		// Check if appointment is completed
		if (appointment.status !== 'completed') {
			message.error('Chỉ có thể đánh giá lịch hẹn đã hoàn thành');
			return;
		}

		// Check if already rated
		const existingRating = ratings.find(r => r.appointmentId === appointment.id);
		if (existingRating) {
			message.error('Lịch hẹn này đã được đánh giá');
			return;
		}

		setIsAddingRating(true);
		setSelectedRating({
			id: '',
			appointmentId: appointment.id,
			employeeId: appointment.employeeId,
			customerId: appointment.customerId,
			rating: 5,
			comment: '',
		});
		form.resetFields();
		setVisibleRatingModal(true);
	};

	const handleAddResponse = (rating: QLichHen.Rating) => {
		setIsAddingRating(false);
		setSelectedRating(rating);
		form.setFieldsValue({ response: rating.response });
		setVisibleRatingModal(true);
	};

	const handleSaveRating = async () => {
		try {
			const values = await form.validateFields();
			if (isAddingRating && selectedRating) {
				api.addRating({ ...selectedRating, ...values });
			} else if (selectedRating) {
				const updated = {
					...selectedRating,
					response: values.response,
					respondedAt: new Date().toISOString(),
				};
				const updatedRatings = ratings.map(r => (r.id === selectedRating.id ? updated : r));
				localStorage.setItem('qlh_ratings', JSON.stringify(updatedRatings));
			}
			loadRatings();
			setVisibleRatingModal(false);
			message.success(isAddingRating ? 'Đánh giá thành công' : 'Phản hồi thành công');
		} catch (error) {
			console.log('Validate Failed:', error);
		}
	};

	const incompleteAppointments = appointments.filter(
		apt =>
			apt.status === 'completed' && !ratings.find(r => r.appointmentId === apt.id)
	);

	const getEmployeeName = (id: string) => {
		return employees.find(e => e.id === id)?.name || id;
	};

	const getAverageRatingDisplay = (employeeId: string) => {
		const avgRating = api.getAverageRating(employeeId);
		return avgRating > 0 ? `${avgRating}/5 ⭐` : 'Chưa có đánh giá';
	};

	// Ratings table columns
	const ratingsColumns = [
		{
			title: 'Nhân viên',
			dataIndex: 'employeeId',
			key: 'employeeId',
			render: (id: string) => getEmployeeName(id),
		},
		{
			title: 'Điểm đánh giá',
			dataIndex: 'rating',
			key: 'rating',
			render: (rating: number) => <Rate disabled value={rating} />,
		},
		{
			title: 'Nhận xét',
			dataIndex: 'comment',
			key: 'comment',
			ellipsis: true,
		},
		{
			title: 'Phản hồi',
			dataIndex: 'response',
			key: 'response',
			ellipsis: true,
			render: (response: string) => response || <Tag>Chưa phản hồi</Tag>,
		},
		{
			title: 'Ngày đánh giá',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_: any, record: QLichHen.Rating) => (
				<Button type='primary' size='small' onClick={() => handleAddResponse(record)}>
					{record.response ? 'Sửa phản hồi' : 'Phản hồi'}
				</Button>
			),
		},
	];

	return (
		<>
			<Card style={{ marginBottom: '20px' }}>
				<h3>Lịch hẹn chờ đánh giá</h3>
				<Table
					columns={[
						{
							title: 'Tên khách hàng',
							dataIndex: 'customerName',
							key: 'customerName',
						},
						{
							title: 'Nhân viên',
							dataIndex: 'employeeId',
							key: 'employeeId',
							render: (id: string) => getEmployeeName(id),
						},
						{
							title: 'Thời gian',
							dataIndex: 'scheduledTime',
							key: 'scheduledTime',
							render: (time: string) => dayjs(time).format('DD/MM/YYYY HH:mm'),
						},
						{
							title: 'Hành động',
							key: 'action',
							render: (_: any, record: QLichHen.Appointment) => (
								<Button type='primary' size='small' onClick={() => handleAddRating(record)}>
									Đánh giá
								</Button>
							),
						},
					]}
					dataSource={incompleteAppointments}
					rowKey='id'
				/>
			</Card>

			<Card>
				<h3>Đánh giá & Phản hồi</h3>
				<Table columns={ratingsColumns} dataSource={ratings} rowKey='id' scroll={{ x: 1000 }} />
			</Card>

			<Modal
				title={isAddingRating ? 'Đánh giá dịch vụ' : 'Phản hồi đánh giá'}
				open={visibleRatingModal}
				onOk={handleSaveRating}
				onCancel={() => setVisibleRatingModal(false)}
			>
				<Form form={form} layout='vertical'>
					{isAddingRating ? (
						<>
							<Form.Item label='Nhân viên'>{getEmployeeName(selectedRating?.employeeId || '')}</Form.Item>
							<Form.Item
								label='Điểm đánh giá'
								name='rating'
								rules={[{ required: true, message: 'Vui lòng chọn điểm đánh giá' }]}
							>
								<Rate />
							</Form.Item>
							<Form.Item
								label='Nhận xét'
								name='comment'
								rules={[{ required: true, message: 'Vui lòng nhập nhận xét' }]}
							>
								<Input.TextArea rows={4} />
							</Form.Item>
						</>
					) : (
						<>
							<Descriptions column={1} size='small'>
								<Descriptions.Item label='Nhân viên'>
									{getEmployeeName(selectedRating?.employeeId || '')}
								</Descriptions.Item>
								<Descriptions.Item label='Điểm đánh giá'>
									<Rate disabled value={selectedRating?.rating} />
								</Descriptions.Item>
								<Descriptions.Item label='Nhận xét'>{selectedRating?.comment}</Descriptions.Item>
							</Descriptions>
							<Form.Item
								label='Phản hồi'
								name='response'
								rules={[{ required: true, message: 'Vui lòng nhập phản hồi' }]}
							>
								<Input.TextArea rows={4} />
							</Form.Item>
						</>
					)}
				</Form>
			</Modal>
		</>
	);
};

export default RatingManagement;
