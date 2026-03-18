import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, TimePicker, Button, Card, message, Space } from 'antd';
import dayjs from 'dayjs';
import { useModel } from 'umi';
import * as api from '@/services/QLichHen/api';

const AppointmentBooking: React.FC = () => {
	const { employees, setEmployees, services, setServices, appointments, setAppointments } = useModel('QLichHen/index');
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setEmployees(api.getEmployees());
		setServices(api.getServices());
		setAppointments(api.getAppointments());
	}, []);

	const handleBookAppointment = async () => {
		try {
			setLoading(true);
			const values = await form.validateFields();

			const selectedService = services.find(s => s.id === values.serviceId);
			if (!selectedService) {
				message.error('Vui lòng chọn dịch vụ');
				return;
			}

			const startTime = new Date(
				values.date.year(),
				values.date.month(),
				values.date.date(),
				values.time.hour(),
				values.time.minute()
			).toISOString();

			const endTime = new Date(new Date(startTime).getTime() + selectedService.durationMinutes * 60000).toISOString();

			// Check for conflicts
			const conflict = api.checkAppointmentConflict(values.employeeId, startTime, endTime);
			if (conflict) {
				message.error('Nhân viên này đã có lịch hẹn vào thời gian này. Vui lòng chọn thời gian khác.');
				return;
			}

			// Count appointments for this employee on this day
			const dayAppointments = appointments.filter(
				apt =>
					apt.employeeId === values.employeeId &&
					new Date(apt.scheduledTime).toDateString() === values.date.toDate().toDateString() &&
					apt.status !== 'cancelled'
			);

			const employee = employees.find(e => e.id === values.employeeId);
			if (employee && dayAppointments.length >= employee.maxClientsPerDay) {
				message.error(`Nhân viên này chỉ có thể phục vụ tối đa ${employee.maxClientsPerDay} khách/ngày`);
				return;
			}

			const newAppointment: QLichHen.Appointment = {
				id: '',
				customerId: values.customerId || 'guest_' + Date.now(),
				customerName: values.customerName,
				customerPhone: values.customerPhone,
				customerEmail: values.customerEmail,
				employeeId: values.employeeId,
				serviceId: values.serviceId,
				scheduledTime: startTime,
				endTime: endTime,
				status: 'pending',
				notes: values.notes,
			};

			api.addAppointment(newAppointment);
			setAppointments(api.getAppointments());
			form.resetFields();
			message.success('Đặt lịch hẹn thành công! Lịch hẹn của bạn đang chờ xác nhận.');
		} catch (error: any) {
			message.error(error.message || 'Có lỗi xảy ra');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<h2>Đặt lịch hẹn</h2>
			<Form form={form} layout='vertical' style={{ maxWidth: '600px' }}>
				<Form.Item
					label='Tên khách hàng'
					name='customerName'
					rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Điện thoại'
					name='customerPhone'
					rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item label='Email' name='customerEmail'>
					<Input type='email' />
				</Form.Item>

				<Form.Item
					label='Chọn dịch vụ'
					name='serviceId'
					rules={[{ required: true, message: 'Vui lòng chọn dịch vụ' }]}
				>
					<Select placeholder='Chọn dịch vụ'>
						{services.map(svc => (
							<Select.Option key={svc.id} value={svc.id}>
								{svc.name} - {svc.price.toLocaleString('vi-VN')} VND ({svc.durationMinutes} phút)
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					label='Chọn nhân viên'
					name='employeeId'
					rules={[{ required: true, message: 'Vui lòng chọn nhân viên' }]}
				>
					<Select placeholder='Chọn nhân viên'>
						{employees
							.filter(e => e.isActive)
							.map(emp => (
								<Select.Option key={emp.id} value={emp.id}>
									{emp.name} - {emp.phone}
								</Select.Option>
							))}
					</Select>
				</Form.Item>

				<Form.Item
					label='Chọn ngày'
					name='date'
					rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
				>
					<DatePicker disabledDate={current => current && current < dayjs().startOf('day')} />
				</Form.Item>

				<Form.Item
					label='Chọn giờ'
					name='time'
					rules={[{ required: true, message: 'Vui lòng chọn giờ' }]}
				>
					<TimePicker format='HH:mm' />
				</Form.Item>

				<Form.Item label='Ghi chú' name='notes'>
					<Input.TextArea rows={3} />
				</Form.Item>

				<Form.Item>
					<Space>
						<Button type='primary' onClick={handleBookAppointment} loading={loading}>
							Đặt lịch hẹn
						</Button>
						<Button onClick={() => form.resetFields()}>Xóa</Button>
					</Space>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default AppointmentBooking;
