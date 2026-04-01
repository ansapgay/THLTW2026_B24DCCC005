import { useState, useCallback } from 'react';

export default () => {
	const [data, setData] = useState<DangKyThanhVien.Item[]>([]);
	const [currentItem, setCurrentItem] = useState<DangKyThanhVien.Item>();
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [visible, setVisible] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	const getDataDangKyThanhVien = useCallback(async () => {
		try {
			setLoading(true);
			const dataLocal: any = JSON.parse(localStorage.getItem('dangKyThanhVien') || '[]');
			setData(dataLocal);
		} catch (error) {
			console.error('Error loading registration data:', error);
			setData([]);
		} finally {
			setLoading(false);
		}
	}, []);

	const initializeDefaultData = useCallback(() => {
		const existingData = localStorage.getItem('dangKyThanhVien');
		if (!existingData) {
			const defaultData = [
				{
					id: '1',
					fullName: 'Phạm Quốc Thành',
					email: 'thanhpq@ptit.edu.vn',
					phone: '0987654321',
					gender: 'Nam',
					address: 'Hà Nội',
					strength: 'Toán học',
					cauLacBoId: '1',
					cauLacBoName: 'CLB Lập trình',
					reason: 'Muốn nâng cao kỹ năng lập trình',
					status: 'Approved',
					note: '',
					history: [
						{
							action: 'Approved',
							adminName: 'Admin',
							timestamp: new Date().toISOString(),
							reason: 'Phù hợp',
						}
					],
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				},
			];
			localStorage.setItem('dangKyThanhVien', JSON.stringify(defaultData));
			setData(defaultData);
		} else {
			getDataDangKyThanhVien();
		}
	}, [getDataDangKyThanhVien]);

	const addOrUpdateRegistration = useCallback((item: DangKyThanhVien.Item) => {
		const allData: DangKyThanhVien.Item[] = JSON.parse(localStorage.getItem('dangKyThanhVien') || '[]');
		
		if (item.id) {
			// Update
			const index = allData.findIndex(d => d.id === item.id);
			if (index > -1) {
				allData[index] = { ...item, updatedAt: new Date().toISOString() };
			}
		} else {
			// Add new
			const newItem = {
				...item,
				id: Date.now().toString(),
				status: 'Pending' as DangKyThanhVien.Status,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				history: [],
			};
			allData.push(newItem);
		}
		
		localStorage.setItem('dangKyThanhVien', JSON.stringify(allData));
		setData(allData);
	}, []);

	const approveRegistrations = useCallback((ids: string[], reason?: string) => {
		const allData: DangKyThanhVien.Item[] = JSON.parse(localStorage.getItem('dangKyThanhVien') || '[]');
		const now = new Date().toISOString();
		
		allData.forEach(item => {
			if (ids.includes(item.id)) {
				item.status = 'Approved';
				item.note = reason || '';
				if (!item.history) item.history = [];
				item.history.push({
					action: 'Approved',
					adminName: 'Admin',
					timestamp: now,
					reason: reason || '',
				});
				item.updatedAt = now;
			}
		});
		
		localStorage.setItem('dangKyThanhVien', JSON.stringify(allData));
		setData(allData);
		setSelectedRowKeys([]);
	}, []);

	const rejectRegistrations = useCallback((ids: string[], reason: string) => {
		const allData: DangKyThanhVien.Item[] = JSON.parse(localStorage.getItem('dangKyThanhVien') || '[]');
		const now = new Date().toISOString();
		
		allData.forEach(item => {
			if (ids.includes(item.id)) {
				item.status = 'Rejected';
				item.note = reason;
				if (!item.history) item.history = [];
				item.history.push({
					action: 'Rejected',
					adminName: 'Admin',
					timestamp: now,
					reason: reason,
				});
				item.updatedAt = now;
			}
		});
		
		localStorage.setItem('dangKyThanhVien', JSON.stringify(allData));
		setData(allData);
		setSelectedRowKeys([]);
	}, []);

	const deleteRegistration = useCallback((id: string) => {
		const allData: DangKyThanhVien.Item[] = JSON.parse(localStorage.getItem('dangKyThanhVien') || '[]');
		const filtered = allData.filter(d => d.id !== id);
		localStorage.setItem('dangKyThanhVien', JSON.stringify(filtered));
		setData(filtered);
	}, []);

	return {
		data,
		setData,
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
	};
};
