import React, { useState } from 'react';
import { Table, Button, Space, Input, Select, Row, Col, Modal, message, Tooltip, Tag } from 'antd';
import { SearchOutlined, DeleteOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

interface DonHangTableProps {
	onRefresh?: () => void;
}

const DonHangTable: React.FC<DonHangTableProps> = ({ onRefresh }) => {
	const {
		getFilteredData,
		searchText,
		setSearchText,
		filterStatus,
		setFilterStatus,
		sortBy,
		setSortBy,
		sortOrder,
		setSortOrder,
		setCurrentOrder,
		setIsEdit,
		setVisible,
		cancelOrder,
		deleteOrder,
	} = useModel('donhang');

	const handleEdit = (record: DonHang.Item) => {
		setCurrentOrder(record);
		setIsEdit(true);
		setVisible(true);
	};

	const handleDelete = (record: DonHang.Item) => {
		Modal.confirm({
			title: 'Xác nhận xóa',
			content: `Bạn có chắc chắn muốn xóa đơn hàng ${record.maDonHang}?`,
			okText: 'Xóa',
			cancelText: 'Hủy',
			onOk() {
				deleteOrder(record.id);
				message.success('Xóa đơn hàng thành công');
				onRefresh?.();
			},
		});
	};

	const handleCancel = (record: DonHang.Item) => {
		if (record.status !== 'Chờ xác nhận') {
			message.error('Chỉ có thể hủy đơn hàng ở trạng thái "Chờ xác nhận"');
			return;
		}

		Modal.confirm({
			title: 'Xác nhận hủy đơn hàng',
			content: `Bạn có chắc chắn muốn hủy đơn hàng ${record.maDonHang}? Hành động này không thể hoàn tác.`,
			okText: 'Hủy đơn hàng',
			okButtonProps: { danger: true },
			cancelText: 'Đóng',
			onOk() {
				cancelOrder(record.id);
				message.success('Hủy đơn hàng thành công');
				onRefresh?.();
			},
		});
	};

	const getStatusColor = (status: DonHang.StatusDonHang) => {
		switch (status) {
			case 'Chờ xác nhận':
				return 'orange';
			case 'Đang giao':
				return 'blue';
			case 'Hoàn thành':
				return 'green';
			case 'Hủy':
				return 'red';
			default:
				return 'default';
		}
	};

	const columns = [
		{
			title: 'STT',
			render: (_: any, __: any, index: number) => index + 1,
			width: 50,
		},
		{
			title: 'Mã đơn hàng',
			dataIndex: 'maDonHang',
			key: 'maDonHang',
			width: 100,
		},
		{
			title: 'Khách hàng',
			key: 'customer',
			render: (_: any, record: DonHang.Item) => (
				<div>
					<div>{record.customer.name}</div>
					<small>{record.customer.phone}</small>
				</div>
			),
			width: 150,
		},
		{
			title: 'Ngày đặt hàng',
			dataIndex: 'orderDate',
			key: 'orderDate',
			width: 120,
		},
		{
			title: 'Tổng tiền',
			dataIndex: 'totalAmount',
			key: 'totalAmount',
			render: (amount: number) => amount.toLocaleString('vi-VN') + ' đ',
			width: 130,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (status: DonHang.StatusDonHang) => (
				<Tag color={getStatusColor(status)}>{status}</Tag>
			),
			width: 120,
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: (_: any, record: DonHang.Item) => (
				<Space size="small">
					<Tooltip title="Chỉnh sửa">
						<Button
							type="primary"
							size="small"
							icon={<EditOutlined />}
							onClick={() => handleEdit(record)}
						/>
					</Tooltip>
					<Tooltip title="Hủy đơn hàng">
						<Button
							danger
							size="small"
							icon={<CloseOutlined />}
							disabled={record.status !== 'Chờ xác nhận'}
							onClick={() => handleCancel(record)}
						/>
					</Tooltip>
					<Tooltip title="Xóa">
						<Button
							danger
							size="small"
							icon={<DeleteOutlined />}
							onClick={() => handleDelete(record)}
						/>
					</Tooltip>
				</Space>
			),
			width: 120,
		},
	];

	return (
		<div style={{ marginTop: 20 }}>
			{/* Search and Filter Section */}
			<Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
				<Col xs={24} sm={12} md={8}>
					<Input
						placeholder="Tìm kiếm mã hoặc tên khách hàng"
						prefix={<SearchOutlined />}
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					/>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Select
						placeholder="Lọc theo trạng thái"
						style={{ width: '100%' }}
						value={filterStatus}
						onChange={setFilterStatus}
					>
						<Select.Option value="All">Tất cả</Select.Option>
						<Select.Option value="Chờ xác nhận">Chờ xác nhận</Select.Option>
						<Select.Option value="Đang giao">Đang giao</Select.Option>
						<Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
						<Select.Option value="Hủy">Hủy</Select.Option>
					</Select>
				</Col>
				<Col xs={12} sm={12} md={5}>
					<Select
						placeholder="Sắp xếp theo"
						style={{ width: '100%' }}
						value={sortBy}
						onChange={setSortBy}
					>
						<Select.Option value="date">Ngày đặt hàng</Select.Option>
						<Select.Option value="amount">Tổng tiền</Select.Option>
					</Select>
				</Col>
				<Col xs={12} sm={12} md={5}>
					<Select
						placeholder="Thứ tự"
						style={{ width: '100%' }}
						value={sortOrder}
						onChange={setSortOrder}
					>
						<Select.Option value="asc">Tăng dần</Select.Option>
						<Select.Option value="desc">Giảm dần</Select.Option>
					</Select>
				</Col>
			</Row>

			{/* Table */}
			<Table
				columns={columns}
				dataSource={getFilteredData()}
				rowKey="id"
				pagination={{
					pageSize: 10,
					showSizeChanger: true,
					showTotal: (total) => `Tổng cộng: ${total} đơn hàng`,
				}}
				scroll={{ x: true }}
				bordered
			/>
		</div>
	);
};

export default DonHangTable;
