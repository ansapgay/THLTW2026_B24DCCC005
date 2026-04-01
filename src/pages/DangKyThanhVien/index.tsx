import React, { useEffect } from 'react';
import {
	Button,
	Table,
	Modal,
	Form,
	Input,
	Select,
	message,
	Space,
	Popconfirm,
	Tag,
	Row,
	Col,
	Drawer,
	Divider,
	Timeline,
} from 'antd';
import {
	PlusOutlined,
	EditOutlined,
	DeleteOutlined,
	CheckOutlined,
	CloseOutlined,
	EyeOutlined,
} from '@ant-design/icons';
import { useModel } from 'umi';
import FormDangKyThanhVien from './Form';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');

const DangKyThanhVienList: React.FC = () => {
	const {
		data,
		currentItem,
		setCurrentItem,
		isEdit,
		setIsEdit,
		visible,
		setVisible,
		loading,
		selectedRowKeys,
		setSelectedRowKeys,
		getDataDangKyThanhVien,
		initializeDefaultData,
		addOrUpdateRegistration,
		approveRegistrations,
		rejectRegistrations,
		deleteRegistration,
	} = useModel('dangKyThanhVien');

	const { data: cauLacBoData } = useModel('cauLacBo');

	const [historyVisible, setHistoryVisible] = React.useState(false);
	const [selectedHistory, setSelectedHistory] = React.useState<any>(null);
	const [rejectReason, setRejectReason] = React.useState('');
	const [confirmRejectModal, setConfirmRejectModal] = React.useState(false);
	const [rejectingIds, setRejectingIds] = React.useState<string[]>([]);

	useEffect(() => {
		initializeDefaultData();
	}, []);

	const handleCreate = () => {
		setCurrentItem(undefined);
		setIsEdit(false);
		setVisible(true);
	};

	const handleEdit = (record: DangKyThanhVien.Item) => {
		setCurrentItem(record);
		setIsEdit(true);
		setVisible(true);
	};

	const handleDelete = (id: string) => {
		deleteRegistration(id);
		message.success('Xóa đơn đăng ký thành công');
	};

	const handleApprove = () => {
		if (selectedRowKeys.length === 0) {
			message.warning('Vui lòng chọn ít nhất 1 đơn');
			return;
		}
		approveRegistrations(selectedRowKeys as string[]);
		message.success(`Duyệt ${selectedRowKeys.length} đơn thành công`);
	};

	const handleRejectClick = () => {
		if (selectedRowKeys.length === 0) {
			message.warning('Vui lòng chọn ít nhất 1 đơn');
			return;
		}
		setRejectingIds(selectedRowKeys as string[]);
		setConfirmRejectModal(true);
	};

	const handleReject = () => {
		if (!rejectReason.trim()) {
			message.warning('Vui lòng nhập lý do từ chối');
			return;
		}
		rejectRegistrations(rejectingIds, rejectReason);
		message.success(`Từ chối ${rejectingIds.length} đơn thành công`);
		setConfirmRejectModal(false);
		setRejectReason('');
		setRejectingIds([]);
	};

	const handleViewHistory = (record: DangKyThanhVien.Item) => {
		setSelectedHistory(record);
		setHistoryVisible(true);
	};

	const getStatusTag = (status: DangKyThanhVien.Status) => {
		switch (status) {
			case 'Approved':
				return <Tag color="green">Duyệt</Tag>;
			case 'Rejected':
				return <Tag color="red">Từ chối</Tag>;
			case 'Pending':
			default:
				return <Tag color="orange">Chờ duyệt</Tag>;
		}
	};

	const columns: any[] = [
		{
			title: 'STT',
			width: 60,
			render: (_, __, index) => index + 1,
		},
		{
			title: 'Họ tên',
			dataIndex: 'fullName',
			sorter: (a: DangKyThanhVien.Item, b: DangKyThanhVien.Item) =>
				a.fullName.localeCompare(b.fullName),
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'SĐT',
			dataIndex: 'phone',
		},
		{
			title: 'Giới tính',
			dataIndex: 'gender',
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'address',
		},
		{
			title: 'Sở trường',
			dataIndex: 'strength',
		},
		{
			title: 'Câu lạc bộ',
			dataIndex: 'cauLacBoName',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			render: getStatusTag,
		},
		{
			title: 'Thao tác',
			fixed: 'right',
			width: 180,
			render: (_, record: DangKyThanhVien.Item) => (
				<Space size="small">
					<Button
						type="default"
						size="small"
						icon={<EyeOutlined />}
						onClick={() => handleViewHistory(record)}
					>
						Lịch sử
					</Button>
					<Button
						type="default"
						size="small"
						icon={<EditOutlined />}
						onClick={() => handleEdit(record)}
					>
						Sửa
					</Button>
					<Popconfirm title="Xóa đơn?" onConfirm={() => handleDelete(record.id)}>
						<Button type="primary" danger size="small" icon={<DeleteOutlined />}>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	const rowSelection = {
		selectedRowKeys,
		onChange: setSelectedRowKeys,
	};

	return (
		<div style={{ padding: '24px' }}>
			<div style={{ marginBottom: 16 }}>
				<h2>Quản lý Đơn đăng ký Thành viên</h2>
				<Space wrap>
					<Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
						Thêm mới
					</Button>
					<Button
						type="success"
						icon={<CheckOutlined />}
						onClick={handleApprove}
						disabled={selectedRowKeys.length === 0}
					>
						Duyệt {selectedRowKeys.length > 0 ? selectedRowKeys.length : ''} đơn
					</Button>
					<Button
						type="primary"
						danger
						icon={<CloseOutlined />}
						onClick={handleRejectClick}
						disabled={selectedRowKeys.length === 0}
					>
						Từ chối {selectedRowKeys.length > 0 ? selectedRowKeys.length : ''} đơn
					</Button>
				</Space>
			</div>

			<Table
				rowKey="id"
				columns={columns}
				dataSource={data}
				loading={loading}
				pagination={{ pageSize: 10 }}
				scroll={{ x: 1400 }}
				rowSelection={rowSelection}
			/>

			<Modal
				title={isEdit ? 'Chỉnh sửa đơn đăng ký' : 'Thêm mới đơn đăng ký'}
				visible={visible}
				footer={null}
				onCancel={() => setVisible(false)}
				destroyOnClose
				width={700}
			>
				<FormDangKyThanhVien onSuccess={() => setVisible(false)} />
			</Modal>

			<Modal
				title="Lý do từ chối"
				visible={confirmRejectModal}
				onOk={handleReject}
				onCancel={() => {
					setConfirmRejectModal(false);
					setRejectReason('');
				}}
			>
				<p>
					Từ chối <strong>{rejectingIds.length} đơn</strong>. Vui lòng nhập lý do:
				</p>
				<Input.TextArea
					rows={4}
					value={rejectReason}
					onChange={(e) => setRejectReason(e.target.value)}
					placeholder="Nhập lý do từ chối..."
				/>
			</Modal>

			<Drawer
				title="Lịch sử thao tác"
				placement="right"
				onClose={() => setHistoryVisible(false)}
				open={historyVisible}
				width={500}
			>
				{selectedHistory && (
					<div>
						<h4>Thông tin đơn đăng ký</h4>
						<Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
							<Col span={24}>
								<b>Họ tên:</b> {selectedHistory.fullName}
							</Col>
							<Col span={24}>
								<b>Email:</b> {selectedHistory.email}
							</Col>
							<Col span={24}>
								<b>Câu lạc bộ:</b> {selectedHistory.cauLacBoName}
							</Col>
							<Col span={24}>
								<b>Trạng thái:</b> {getStatusTag(selectedHistory.status)}
							</Col>
						</Row>

						<Divider />

						<h4>Lịch sử thao tác</h4>
						{selectedHistory.history && selectedHistory.history.length > 0 ? (
							<Timeline
								items={selectedHistory.history.map((item: DangKyThanhVien.HistoryItem) => ({
									children: (
										<div>
											<p>
												<b>{item.action}</b> bởi <b>{item.adminName}</b>
											</p>
											<p style={{ fontSize: 12, color: '#999' }}>
												{dayjs(item.timestamp).format('HH:mm:ss DD/MM/YYYY')}
											</p>
											{item.reason && <p>Lý do: {item.reason}</p>}
										</div>
									),
									color: item.action === 'Approved' ? 'green' : 'red',
								}))}
							/>
						) : (
							<p>Không có lịch sử thao tác</p>
						)}
					</div>
				)}
			</Drawer>
		</div>
	);
};

export default DangKyThanhVienList;
