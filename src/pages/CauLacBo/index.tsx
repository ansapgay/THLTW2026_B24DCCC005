import React, { useEffect } from 'react';
import { Button, Table, Modal, Form, Input, DatePicker, message, Space, Popconfirm, Tag, Empty } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, TeamOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import FormCauLacBo from './Form';
import ViewMembers from './ViewMembers';
import dayjs from 'dayjs';

const CauLacBoList: React.FC = () => {
	const {
		data,
		currentItem,
		setCurrentItem,
		isEdit,
		setIsEdit,
		visible,
		setVisible,
		loading,
		getDataCauLacBo,
		initializeDefaultData,
		addOrUpdateCauLacBo,
		deleteCauLacBo,
	} = useModel('cauLacBo');

	const [viewMembersVisible, setViewMembersVisible] = React.useState(false);
	const [selectedCauLacBoId, setSelectedCauLacBoId] = React.useState<string>('');

	useEffect(() => {
		initializeDefaultData();
	}, []);

	const handleCreate = () => {
		setCurrentItem(undefined);
		setIsEdit(false);
		setVisible(true);
	};

	const handleEdit = (record: CauLacBo.Item) => {
		setCurrentItem(record);
		setIsEdit(true);
		setVisible(true);
	};

	const handleDelete = (id: string) => {
		deleteCauLacBo(id);
		message.success('Xóa câu lạc bộ thành công');
	};

	const handleViewMembers = (record: CauLacBo.Item) => {
		setSelectedCauLacBoId(record.id);
		setViewMembersVisible(true);
	};

	const columns: any[] = [
		{
			title: 'STT',
			width: 60,
			render: (_, __, index) => index + 1,
		},
		{
			title: 'Ảnh đại diện',
			dataIndex: 'avatar',
			width: 80,
			render: (avatar: string) => (
				<img src={avatar} alt="avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} />
			),
		},
		{
			title: 'Tên câu lạc bộ',
			dataIndex: 'name',
			sorter: (a: CauLacBo.Item, b: CauLacBo.Item) => a.name.localeCompare(b.name),
		},
		{
			title: 'Ngày thành lập',
			dataIndex: 'foundedDate',
			sorter: (a: CauLacBo.Item, b: CauLacBo.Item) =>
				new Date(a.foundedDate).getTime() - new Date(b.foundedDate).getTime(),
			render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
		},
		{
			title: 'Chủ nhiệm CLB',
			dataIndex: 'chairman',
		},
		{
			title: 'Hoạt động',
			dataIndex: 'active',
			render: (active: boolean) => (
				<Tag color={active ? 'green' : 'red'}>{active ? 'Có' : 'Không'}</Tag>
			),
		},
		{
			title: 'Thao tác',
			fixed: 'right',
			width: 150,
			render: (_, record: CauLacBo.Item) => (
				<Space size="small">
					<Button
						type="primary"
						size="small"
						icon={<TeamOutlined />}
						onClick={() => handleViewMembers(record)}
					>
						Thành viên
					</Button>
					<Button
						type="default"
						size="small"
						icon={<EditOutlined />}
						onClick={() => handleEdit(record)}
					>
						Sửa
					</Button>
					<Popconfirm title="Xóa câu lạc bộ?" onConfirm={() => handleDelete(record.id)}>
						<Button type="primary" danger size="small" icon={<DeleteOutlined />}>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div style={{ padding: '24px' }}>
			<div style={{ marginBottom: 16 }}>
				<h2>Danh sách Câu lạc bộ</h2>
				<Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
					Thêm mới
				</Button>
			</div>

			<Table
				rowKey="id"
				columns={columns}
				dataSource={data}
				loading={loading}
				pagination={{ pageSize: 10 }}
				scroll={{ x: 1000 }}
			/>

			<Modal
				title={isEdit ? 'Chỉnh sửa câu lạc bộ' : 'Thêm mới câu lạc bộ'}
				visible={visible}
				footer={null}
				onCancel={() => setVisible(false)}
				destroyOnClose
				width={700}
			>
				<FormCauLacBo onSuccess={() => setVisible(false)} />
			</Modal>

			<Modal
				title={`Danh sách thành viên`}
				visible={viewMembersVisible}
				footer={null}
				onCancel={() => setViewMembersVisible(false)}
				destroyOnClose
				width={900}
			>
				<ViewMembers cauLacBoId={selectedCauLacBoId} />
			</Modal>
		</div>
	);
};

export default CauLacBoList;
