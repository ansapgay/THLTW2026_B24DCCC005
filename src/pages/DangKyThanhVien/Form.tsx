import React, { useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useModel } from 'umi';

interface FormDangKyThanhVienProps {
	onSuccess?: () => void;
}

const FormDangKyThanhVien: React.FC<FormDangKyThanhVienProps> = ({ onSuccess }) => {
	const [form] = Form.useForm();
	const { currentItem, setCurrentItem, addOrUpdateRegistration, isEdit } =
		useModel('dangKyThanhVien');
	const { data: cauLacBoData } = useModel('cauLacBo');
	const [loading, setLoading] = React.useState(false);

	useEffect(() => {
		if (currentItem) {
			form.setFieldsValue({
				fullName: currentItem.fullName,
				email: currentItem.email,
				phone: currentItem.phone,
				gender: currentItem.gender,
				address: currentItem.address,
				strength: currentItem.strength,
				cauLacBoId: currentItem.cauLacBoId,
				reason: currentItem.reason,
			});
		}
	}, [currentItem, form]);

	const onFinish = async (values: any) => {
		try {
			setLoading(true);
			const selectedClub = cauLacBoData.find((c) => c.id === values.cauLacBoId);
			const newItem: DangKyThanhVien.Item = {
				id: currentItem?.id || '',
				fullName: values.fullName,
				email: values.email,
				phone: values.phone,
				gender: values.gender,
				address: values.address,
				strength: values.strength,
				cauLacBoId: values.cauLacBoId,
				cauLacBoName: selectedClub?.name || '',
				reason: values.reason,
				status: currentItem?.status || 'Pending',
				note: currentItem?.note || '',
				history: currentItem?.history || [],
				createdAt: currentItem?.createdAt || new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			addOrUpdateRegistration(newItem);
			message.success(isEdit ? 'Cập nhật thành công' : 'Thêm mới thành công');
			form.resetFields();
			setCurrentItem(undefined);
			onSuccess?.();
		} catch (error) {
			message.error('Có lỗi xảy ra');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form form={form} layout="vertical" onFinish={onFinish}>
			<Form.Item
				name="fullName"
				label="Họ và tên"
				rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
			>
				<Input placeholder="Nhập họ và tên" />
			</Form.Item>

			<Form.Item
				name="email"
				label="Email"
				rules={[
					{ required: true, message: 'Vui lòng nhập email' },
					{ type: 'email', message: 'Email không hợp lệ' },
				]}
			>
				<Input placeholder="Nhập email" />
			</Form.Item>

			<Form.Item
				name="phone"
				label="Số điện thoại"
				rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
			>
				<Input placeholder="Nhập số điện thoại" />
			</Form.Item>

			<Form.Item
				name="gender"
				label="Giới tính"
				rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
			>
				<Select placeholder="Chọn giới tính">
					<Select.Option value="Nam">Nam</Select.Option>
					<Select.Option value="Nữ">Nữ</Select.Option>
					<Select.Option value="Khác">Khác</Select.Option>
				</Select>
			</Form.Item>

			<Form.Item
				name="address"
				label="Địa chỉ"
				rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
			>
				<Input placeholder="Nhập địa chỉ" />
			</Form.Item>

			<Form.Item
				name="strength"
				label="Sở trường"
				rules={[{ required: true, message: 'Vui lòng nhập sở trường' }]}
			>
				<Input placeholder="Nhập sở trường (VD: Lập trình, Thiết kế, ...)" />
			</Form.Item>

			<Form.Item
				name="cauLacBoId"
				label="Câu lạc bộ"
				rules={[{ required: true, message: 'Vui lòng chọn câu lạc bộ' }]}
			>
				<Select placeholder="Chọn câu lạc bộ">
					{cauLacBoData.map((club) => (
						<Select.Option key={club.id} value={club.id}>
							{club.name}
						</Select.Option>
					))}
				</Select>
			</Form.Item>

			<Form.Item
				name="reason"
				label="Lý do đăng ký"
				rules={[{ required: true, message: 'Vui lòng nhập lý do đăng ký' }]}
			>
				<Input.TextArea rows={3} placeholder="Nhập lý do muốn tham gia câu lạc bộ" />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" loading={loading} block>
					{isEdit ? 'Cập nhật' : 'Thêm mới'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormDangKyThanhVien;
