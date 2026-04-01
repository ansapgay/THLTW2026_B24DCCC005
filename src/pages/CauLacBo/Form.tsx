import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker, Checkbox, message, Upload } from 'antd';
import { useModel } from 'umi';
import dayjs from 'dayjs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface FormCauLacBoProps {
	onSuccess?: () => void;
}

const FormCauLacBo: React.FC<FormCauLacBoProps> = ({ onSuccess }) => {
	const [form] = Form.useForm();
	const { currentItem, setCurrentItem, addOrUpdateCauLacBo, isEdit } = useModel('cauLacBo');
	const [description, setDescription] = React.useState<string>('');
	const [loading, setLoading] = React.useState(false);

	useEffect(() => {
		if (currentItem) {
			form.setFieldsValue({
				name: currentItem.name,
				foundedDate: dayjs(currentItem.foundedDate),
				chairman: currentItem.chairman,
				active: currentItem.active,
				avatar: currentItem.avatar,
			});
			setDescription(currentItem.description || '');
		}
	}, [currentItem, form]);

	const onFinish = async (values: any) => {
		try {
			setLoading(true);
			const newItem: CauLacBo.Item = {
				id: currentItem?.id || '',
				name: values.name,
				avatar: values.avatar || 'https://via.placeholder.com/50',
				foundedDate: values.foundedDate.format('YYYY-MM-DD'),
				description: description,
				chairman: values.chairman,
				active: values.active || false,
				createdAt: currentItem?.createdAt || new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			addOrUpdateCauLacBo(newItem);
			message.success(isEdit ? 'Cập nhật thành công' : 'Thêm mới thành công');
			form.resetFields();
			setDescription('');
			setCurrentItem(undefined);
			onSuccess?.();
		} catch (error) {
			message.error('Có lỗi xảy ra');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form
			form={form}
			layout="vertical"
			onFinish={onFinish}
		>
			<Form.Item
				name="name"
				label="Tên câu lạc bộ"
				rules={[{ required: true, message: 'Vui lòng nhập tên câu lạc bộ' }]}
			>
				<Input placeholder="Nhập tên câu lạc bộ" />
			</Form.Item>

			<Form.Item
				name="avatar"
				label="URL Ảnh đại diện"
			>
				<Input placeholder="Nhập URL ảnh đại diện" />
			</Form.Item>

			<Form.Item
				name="foundedDate"
				label="Ngày thành lập"
				rules={[{ required: true, message: 'Vui lòng chọn ngày thành lập' }]}
			>
				<DatePicker format="DD/MM/YYYY" />
			</Form.Item>

			<Form.Item
				label="Mô tả (HTML)"
			>
				<ReactQuill value={description} onChange={setDescription} />
			</Form.Item>

			<Form.Item
				name="chairman"
				label="Chủ nhiệm CLB"
				rules={[{ required: true, message: 'Vui lòng nhập chủ nhiệm CLB' }]}
			>
				<Input placeholder="Nhập tên chủ nhiệm" />
			</Form.Item>

			<Form.Item
				name="active"
				valuePropName="checked"
			>
				<Checkbox>Đang hoạt động</Checkbox>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" loading={loading} block>
					{isEdit ? 'Cập nhật' : 'Thêm mới'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormCauLacBo;
