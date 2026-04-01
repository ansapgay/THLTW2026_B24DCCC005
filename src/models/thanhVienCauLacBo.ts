import { useState, useCallback } from 'react';

export default () => {
	const [data, setData] = useState<ThanhVienCauLacBo.Item[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	const getThanhVienByCauLacBo = useCallback(async (cauLacBoId?: string) => {
		try {
			setLoading(true);
			// Lấy danh sách những người đã được duyệt (Approved)
			const registrations: DangKyThanhVien.Item[] = JSON.parse(
				localStorage.getItem('dangKyThanhVien') || '[]'
			);
			
			let members = registrations.filter(r => r.status === 'Approved');
			
			if (cauLacBoId) {
				members = members.filter(m => m.cauLacBoId === cauLacBoId);
			}
			
			setData(members as any);
		} catch (error) {
			console.error('Error loading members:', error);
			setData([]);
		} finally {
			setLoading(false);
		}
	}, []);

	const changeCauLacBo = useCallback((memberIds: string[], newCauLacBoId: string, newCauLacBoName: string) => {
		const registrations: DangKyThanhVien.Item[] = JSON.parse(
			localStorage.getItem('dangKyThanhVien') || '[]'
		);
		
		const now = new Date().toISOString();
		
		registrations.forEach(item => {
			if (memberIds.includes(item.id)) {
				const oldCauLacBo = item.cauLacBoName;
				item.cauLacBoId = newCauLacBoId;
				item.cauLacBoName = newCauLacBoName;
				item.updatedAt = now;
				if (!item.history) item.history = [];
				item.history.push({
					action: 'ChangedCauLacBo',
					adminName: 'Admin',
					timestamp: now,
					reason: `Chuyển từ ${oldCauLacBo} sang ${newCauLacBoName}`,
				});
			}
		});
		
		localStorage.setItem('dangKyThanhVien', JSON.stringify(registrations));
		// Reload members after changing club
		getThanhVienByCauLacBo();
		setSelectedRowKeys([]);
	}, [getThanhVienByCauLacBo]);

	return {
		data,
		setData,
		loading,
		selectedRowKeys,
		setSelectedRowKeys,
		getThanhVienByCauLacBo,
		changeCauLacBo,
	};
};
