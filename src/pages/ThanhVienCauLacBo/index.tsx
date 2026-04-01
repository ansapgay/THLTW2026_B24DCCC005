import React, { useEffect } from 'react';
import { Table, Button, Select, Modal, message, Space, Tag, Row, Col } from 'antd';
import { useModel } from 'umi';
import dayjs from 'dayjs';

const ThanhVienCauLacBoList: React.FC = () => {
	const { data: thanhVienData, loading, selectedRowKeys, setSelectedRowKeys, getThanhVienByCauLacBo, changeCauLacBo } =
		useModel('thanhVienCauLacBo');
	const { data: cauLacBoData, getDataCauLacBo: getCauLacBoData } = useModel('cauLacBo');

	const [selectedCauLacBoId, setSelectedCauLacBoId] = React.useState<string>('');
	const [transferModalVisible, setTransferModalVisible] = React.useState(false);
	const [targetCauLacBoId, setTargetCauLacBoId] = React.useState<string>('');

	useEffect(() => {
		getCauLacBoData();
	}, []);

	useEffect(() => {
		if (selectedCauLacBoId) {
			getThanhVienByCauLacBo(selectedCauLacBoId);
		}
	}, [selectedCauLacBoId]);

	const handleChangeCauLacBo = () => {
		if (selectedRowKeys.length === 0) {
			message.warning('Vui lòng chọn ít nhất 1 thành viên');
			return;
		}
		if (!targetCauLacBoId) {
			message.warning('Vui lòng chọn câu lạc bộ mới');
			return;
		}
		setTransferModalVisible(true);
	};

	const confirmTransfer = () => {
		const targetClub = cauLacBoData.find((c) => c.id === targetCauLacBoId);
		if (!targetClub) return;

		changeCauLacBo(selectedRowKeys as string[], targetCauLacBoId, targetClub.name);
		message.success(`Chuyển ${selectedRowKeys.length} thành viên thành công`);
		setTransferModalVisible(false);
		setTargetCauLacBoId('');
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
			sorter: (a: any, b: any) => a.fullName.localeCompare(b.fullName),
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
			title: 'Ngày duyệt',
			dataIndex: 'updatedAt',
			render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm'),
		},
	];

	const rowSelection = {
		selectedRowKeys,
		onChange: setSelectedRowKeys,
	};

	if (!selectedCauLacBoId) {
		return (
			<div style={{ padding: '24px', textAlign: 'center' }}>
				<h2>Quản lý Thành viên Câu lạc bộ</h2>
				<p>Vui lòng chọn một câu lạc bộ để xem thành viên</p>
				<Select
					style={{ width: 300, marginTop: 16 }}
					placeholder="Chọn câu lạc bộ"
					value={selectedCauLacBoId || undefined}
					onChange={setSelectedCauLacBoId}
				>
					{cauLacBoData.map((club) => (
						<Select.Option key={club.id} value={club.id}>
							{club.name}
						</Select.Option>
					))}
				</Select>
			</div>
		);
	}

	const currentClub = cauLacBoData.find((c) => c.id === selectedCauLacBoId);

	return (
		<div style={{ padding: '24px' }}>
			<div style={{ marginBottom: 16 }}>
				<h2>Quản lý Thành viên: {currentClub?.name}</h2>
				<Space wrap>
					<Select
						style={{ width: 250 }}
						placeholder="Chọn câu lạc bộ"
						value={selectedCauLacBoId}
						onChange={setSelectedCauLacBoId}
					>
						{cauLacBoData.map((club) => (
							<Select.Option key={club.id} value={club.id}>
								{club.name}
							</Select.Option>
						))}
					</Select>
				</Space>
			</div>

			{thanhVienData.length > 0 && (
				<div style={{ marginBottom: 16, padding: 12, backgroundColor: '#f0f5ff', borderRadius: 4 }}>
					<Space wrap>
						<Select
							style={{ width: 250 }}
							placeholder="Chọn câu lạc bộ chuyển đến"
							value={targetCauLacBoId || undefined}
							onChange={setTargetCauLacBoId}
						>
							{cauLacBoData
								.filter((c) => c.id !== selectedCauLacBoId)
								.map((club) => (
									<Select.Option key={club.id} value={club.id}>
										{club.name}
									</Select.Option>
								))}
						</Select>
						<Button
							type="primary"
							onClick={handleChangeCauLacBo}
							disabled={selectedRowKeys.length === 0 || !targetCauLacBoId}
						>
							Chuyển {selectedRowKeys.length > 0 ? selectedRowKeys.length : ''} thành viên
						</Button>
					</Space>
				</div>
			)}

			<Table
				rowKey="id"
				columns={columns}
				dataSource={thanhVienData}
				loading={loading}
				pagination={{ pageSize: 10 }}
				scroll={{ x: 1200 }}
				rowSelection={rowSelection}
			/>

			<Modal
				title="Xác nhận chuyển câu lạc bộ"
				visible={transferModalVisible}
				onOk={confirmTransfer}
				onCancel={() => setTransferModalVisible(false)}
			>
				<Row gutter={[16, 16]}>
					<Col span={24}>
						Bạn sắp chuyển <strong>{selectedRowKeys.length} thành viên</strong> từ{' '}
						<strong>{currentClub?.name}</strong> sang{' '}
						<strong>
							{cauLacBoData.find((c) => c.id === targetCauLacBoId)?.name || 'N/A'}
						</strong>
					</Col>
					<Col span={24}>Xác nhận?</Col>
				</Row>
			</Modal>
		</div>
	);
};

export default ThanhVienCauLacBoList;
