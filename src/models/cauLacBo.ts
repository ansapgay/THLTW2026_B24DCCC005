import { useState, useCallback } from 'react';

export default () => {
	const [data, setData] = useState<CauLacBo.Item[]>([]);
	const [currentItem, setCurrentItem] = useState<CauLacBo.Item>();
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [visible, setVisible] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const getDataCauLacBo = useCallback(async () => {
		try {
			setLoading(true);
			const dataLocal: any = JSON.parse(localStorage.getItem('cauLacBo') || '[]');
			setData(dataLocal);
		} catch (error) {
			console.error('Error loading CLB data:', error);
			setData([]);
		} finally {
			setLoading(false);
		}
	}, []);

	const initializeDefaultData = useCallback(() => {
		const existingData = localStorage.getItem('cauLacBo');
		if (!existingData) {
			const defaultData = [
				{
					id: '1',
					name: 'CLB Lập trình',
					avatar: 'https://via.placeholder.com/50',
					foundedDate: '2023-01-15',
					description: '<p>Câu lạc bộ hướng tới nâng cao kỹ năng lập trình</p>',
					chairman: 'Nguyễn Văn A',
					active: true,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				},
				{
					id: '2',
					name: 'CLB Thiết kế đồ họa',
					avatar: 'https://via.placeholder.com/50',
					foundedDate: '2023-02-20',
					description: '<p>Chia sẻ kiến thức về thiết kế đồ họa và UX/UI</p>',
					chairman: 'Trần Thị B',
					active: true,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				},
			];
			localStorage.setItem('cauLacBo', JSON.stringify(defaultData));
			setData(defaultData);
		} else {
			getDataCauLacBo();
		}
	}, [getDataCauLacBo]);

	const addOrUpdateCauLacBo = useCallback((item: CauLacBo.Item) => {
		const allData: CauLacBo.Item[] = JSON.parse(localStorage.getItem('cauLacBo') || '[]');
		
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
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			allData.push(newItem);
		}
		
		localStorage.setItem('cauLacBo', JSON.stringify(allData));
		setData(allData);
	}, []);

	const deleteCauLacBo = useCallback((id: string) => {
		const allData: CauLacBo.Item[] = JSON.parse(localStorage.getItem('cauLacBo') || '[]');
		const filtered = allData.filter(d => d.id !== id);
		localStorage.setItem('cauLacBo', JSON.stringify(filtered));
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
		getDataCauLacBo,
		initializeDefaultData,
		addOrUpdateCauLacBo,
		deleteCauLacBo,
	};
};
