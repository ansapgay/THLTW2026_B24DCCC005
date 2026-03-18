import React, { useEffect } from 'react';
import { Table, Button, Modal, Form, Select, Space, Popconfirm, Card, Tag, message } from 'antd';
import { useModel } from 'umi';
import * as api from '@/services/QLichHen/api';
import dayjs from 'dayjs';

const AppointmentManagement: React.FC = () => {
	const { appointments, setAppointments, employees, services, visibleAppointmentModal, setVisibleAppointmentModal, selectedAppointment, setSelectedAppointment } = useModel('QLichHen/index');
	const [form] = Form.useForm();

	useEffect(() => {
		loadAppointments();
	}, []);

	const loadAppointments = () => {
		setAppointments(api.getAppointments());
	};

	const handleUpdateStatus = (record: QLichHen.Appointment) => {
		setSelectedAppointment(record);
		form.setFieldsValue({ status: record.status });
		setVisibleAppointmentModal(true);
	};

	const handleSave = async () => {
		try {
			const values = await form.validateFields();
			if (selectedAppointment) {
				api.updateAppointment(selectedAppointment.id, { ...selectedAppointment, ...values });
				loadAppointments();
				setVisibleAppointmentModal(false);
				message.success('Cập nhật trạng thái thành công');
			}
		} catch (error) {
			console.log('Validate Failed:', error);
		}
	};

	const handleDelete = (id: string) => {
		api.deleteAppointment(id);
		loadAppointments();
		message.success('Xóa lịch hẹn thành công');
	};

	const getStatusTag = (status: string) => {
		const statusConfig: Record<string, { color: string; label: string }> = {
			pending: { color: 'orange', label: 'Chờ duyệt' },
			confirmed: { color: 'blue', label: 'Xác nhận' },
			completed: { color: 'green', label: 'Hoàn thành' },
			cancelled: { color: 'red', label: 'Hủy' },
		};
		return <Tag color={statusConfig[status]?.color}>{statusConfig[status]?.label}</Tag>;
	};

	const getEmployeeName = (id: string) => {
		return employees.find(e => e.id === id)?.name || id;
	};

	const getServiceName = (id: string) => {
		return services.find(s => s.id === id)?.name || id;
	};

	const columns = [
		{
			title: 'Tên khách hàng',
			dataIndex: 'customerName',
			key: 'customerName',
		},
		{
			title: 'Điện thoại',
			dataIndex: 'customerPhone',
			key: 'customerPhone',
		},
		{
			title: 'Nhân viên',
			dataIndex: 'employeeId',
			key: 'employeeId',
			render: (id: string) => getEmployeeName(id),
		},
		{
			title: 'Dịch vụ',
			dataIndex: 'serviceId',
			key: 'serviceId',
			render: (id: string) => getServiceName(id),
		},
		{
			title: 'Thời gian',
			dataIndex: 'scheduledTime',
			key: 'scheduledTime',
			render: (time: string) => dayjs(time).format('DD/MM/YYYY HH:mm'),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (status: string) => getStatusTag(status),
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_: any, record: QLichHen.Appointment) => (
				<Space size='small'>
					<Button type='primary' size='small' onClick={() => handleUpdateStatus(record)}>
						Cập nhật
					</Button>
					<Popconfirm
						title='Xóa lịch hẹn'
						description='Bạn có chắc chắn muốn xóa?'
						onConfirm={() => handleDelete(record.id)}
						okText='Có'
						cancelText='Không'
					>
						<Button danger size='small'>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Card>
			<Table columns={columns} dataSource={appointments} rowKey='id' scroll={{ x: 1200 }} />

			<Modal
				title='Cập nhật trạng thái lịch hẹn'
				open={visibleAppointmentModal}
				onOk={handleSave}
				onCancel={() => setVisibleAppointmentModal(false)}
			>
				<Form form={form} layout='vertical'>
					<Form.Item label='Tên khách hàng'>{selectedAppointment?.customerName}</Form.Item>
					<Form.Item label='Nhân viên'>{getEmployeeName(selectedAppointment?.employeeId || '')}</Form.Item>
					<Form.Item label='Dịch vụ'>{getServiceName(selectedAppointment?.serviceId || '')}</Form.Item>
					<Form.Item label='Thời gian'>
						{dayjs(selectedAppointment?.scheduledTime).format('DD/MM/YYYY HH:mm')}
					</Form.Item>
					<Form.Item
						label='Trạng thái'
						name='status'
						rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
					>
						<Select>
							<Select.Option value='pending'>Chờ duyệt</Select.Option>
							<Select.Option value='confirmed'>Xác nhận</Select.Option>
							<Select.Option value='completed'>Hoàn thành</Select.Option>
							<Select.Option value='cancelled'>Hủy</Select.Option>
						</Select>
					</Form.Item>
				</Form>
			</Modal>
		</Card>
	);
};

export default AppointmentManagement;
