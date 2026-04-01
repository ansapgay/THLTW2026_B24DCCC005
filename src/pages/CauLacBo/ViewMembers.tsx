import React, { useEffect } from 'react';
import { Table, Empty, Tag } from 'antd';
import { useModel } from 'umi';

interface ViewMembersProps {
	cauLacBoId: string;
}

const ViewMembers: React.FC<ViewMembersProps> = ({ cauLacBoId }) => {
	const { data, loading, getThanhVienByCauLacBo } = useModel('thanhVienCauLacBo');

	useEffect(() => {
		if (cauLacBoId) {
			getThanhVienByCauLacBo(cauLacBoId);
		}
	}, [cauLacBoId]);

	const columns: any[] = [
		{
			title: 'STT',
			width: 60,
			render: (_, __, index) => index + 1,
		},
		{
			title: 'Họ tên',
			dataIndex: 'fullName',
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
	];

	if (data.length === 0) {
		return <Empty description="Không có thành viên" />;
	}

	return (
		<Table
			rowKey="id"
			columns={columns}
			dataSource={data}
			loading={loading}
			pagination={{ pageSize: 10 }}
			scroll={{ x: 900 }}
		/>
	);
};

export default ViewMembers;
