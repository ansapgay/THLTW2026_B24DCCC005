import React, { useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, Popconfirm, Card, Select, Time, TimePicker } from 'antd';
import { useModel } from 'umi';
import * as api from '@/services/QLichHen/api';

const EmployeeManagement: React.FC = () => {
	const { employees, setEmployees, selectedEmployee, setSelectedEmployee, visibleEmployeeModal, setVisibleEmployeeModal, isEditEmployee, setIsEditEmployee } = useModel('QLichHen/index');
	const [form] = Form.useForm();

	useEffect(() => {
		loadEmployees();
	}, []);

	const loadEmployees = () => {
		setEmployees(api.getEmployees());
	};

	const handleAddNew = () => {
		setSelectedEmployee(undefined);
		setIsEditEmployee(false);
		form.resetFields();
		setVisibleEmployeeModal(true);
	};

	const handleEdit = (record: QLichHen.Employee) => {
		setSelectedEmployee(record);
		setIsEditEmployee(true);
		form.setFieldsValue(record);
		setVisibleEmployeeModal(true);
	};

	const handleDelete = (id: string) => {
		api.deleteEmployee(id);
		loadEmployees();
	};

	const handleSave = async () => {
		try {
			const values = await form.validateFields();
			if (isEditEmployee && selectedEmployee) {
				api.updateEmployee(selectedEmployee.id, { ...selectedEmployee, ...values });
			} else {
				api.addEmployee(values as QLichHen.Employee);
			}
			loadEmployees();
			setVisibleEmployeeModal(false);
		} catch (error) {
			console.log('Validate Failed:', error);
		}
	};

	const columns = [
		{
			title: 'Tên nhân viên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Điện thoại',
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Số khách/ngày',
			dataIndex: 'maxClientsPerDay',
			key: 'maxClientsPerDay',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'isActive',
			key: 'isActive',
			render: (isActive: boolean) => (isActive ? 'Hoạt động' : 'Không hoạt động'),
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_: any, record: QLichHen.Employee) => (
				<Space size='small'>
					<Button type='primary' size='small' onClick={() => handleEdit(record)}>
						Sửa
					</Button>
					<Popconfirm
						title='Xóa nhân viên'
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
			<Button type='primary' onClick={handleAddNew} style={{ marginBottom: '16px' }}>
				Thêm nhân viên
			</Button>

			<Table columns={columns} dataSource={employees} rowKey='id' />

			<Modal
				title={isEditEmployee ? 'Sửa nhân viên' : 'Thêm nhân viên'}
				open={visibleEmployeeModal}
				onOk={handleSave}
				onCancel={() => setVisibleEmployeeModal(false)}
			>
				<Form form={form} layout='vertical'>
					<Form.Item
						label='Tên nhân viên'
						name='name'
						rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Điện thoại'
						name='phone'
						rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item label='Email' name='email'>
						<Input type='email' />
					</Form.Item>
					<Form.Item
						label='Số khách giới hạn/ngày'
						name='maxClientsPerDay'
						rules={[{ required: true, message: 'Vui lòng nhập số khách' }]}
					>
						<InputNumber min={1} />
					</Form.Item>
					<Form.Item label='Lịch làm việc' tooltip='Chọn các ngày làm việc và giờ'>
						<div style={{ padding: '10px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
							<p style={{ marginBottom: '10px' }}>Lịch làm việc (Để trống nếu không thay đổi)</p>
							<p style={{ fontSize: '12px', color: '#999' }}>Thứ 2-7 (0=CN, 1=T2, ..., 6=T7)</p>
						</div>
					</Form.Item>
				</Form>
			</Modal>
		</Card>
	);
};

export default EmployeeManagement;
