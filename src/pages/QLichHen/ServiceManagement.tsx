import React, { useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, Popconfirm, Card } from 'antd';
import { useModel } from 'umi';
import * as api from '@/services/QLichHen/api';

const ServiceManagement: React.FC = () => {
	const { services, setServices, selectedService, setSelectedService, visibleServiceModal, setVisibleServiceModal, isEditService, setIsEditService } = useModel('QLichHen/index');
	const [form] = Form.useForm();

	useEffect(() => {
		loadServices();
	}, []);

	const loadServices = () => {
		setServices(api.getServices());
	};

	const handleAddNew = () => {
		setSelectedService(undefined);
		setIsEditService(false);
		form.resetFields();
		setVisibleServiceModal(true);
	};

	const handleEdit = (record: QLichHen.Service) => {
		setSelectedService(record);
		setIsEditService(true);
		form.setFieldsValue(record);
		setVisibleServiceModal(true);
	};

	const handleDelete = (id: string) => {
		api.deleteService(id);
		loadServices();
	};

	const handleSave = async () => {
		try {
			const values = await form.validateFields();
			if (isEditService && selectedService) {
				api.updateService(selectedService.id, { ...selectedService, ...values });
			} else {
				api.addService(values as QLichHen.Service);
			}
			loadServices();
			setVisibleServiceModal(false);
		} catch (error) {
			console.log('Validate Failed:', error);
		}
	};

	const columns = [
		{
			title: 'Tên dịch vụ',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			key: 'description',
			ellipsis: true,
		},
		{
			title: 'Giá (VND)',
			dataIndex: 'price',
			key: 'price',
			render: (price: number) => price.toLocaleString('vi-VN'),
		},
		{
			title: 'Thời gian (phút)',
			dataIndex: 'durationMinutes',
			key: 'durationMinutes',
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_: any, record: QLichHen.Service) => (
				<Space size='small'>
					<Button type='primary' size='small' onClick={() => handleEdit(record)}>
						Sửa
					</Button>
					<Popconfirm
						title='Xóa dịch vụ'
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
				Thêm dịch vụ
			</Button>

			<Table columns={columns} dataSource={services} rowKey='id' />

			<Modal
				title={isEditService ? 'Sửa dịch vụ' : 'Thêm dịch vụ'}
				open={visibleServiceModal}
				onOk={handleSave}
				onCancel={() => setVisibleServiceModal(false)}
			>
				<Form form={form} layout='vertical'>
					<Form.Item
						label='Tên dịch vụ'
						name='name'
						rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item label='Mô tả' name='description'>
						<Input.TextArea rows={3} />
					</Form.Item>
					<Form.Item
						label='Giá (VND)'
						name='price'
						rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
					>
						<InputNumber min={0} formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
					</Form.Item>
					<Form.Item
						label='Thời gian thực hiện (phút)'
						name='durationMinutes'
						rules={[{ required: true, message: 'Vui lòng nhập thời gian' }]}
					>
						<InputNumber min={15} step={15} />
					</Form.Item>
				</Form>
			</Modal>
		</Card>
	);
};

export default ServiceManagement;
