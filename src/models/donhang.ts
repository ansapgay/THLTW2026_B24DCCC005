import { useState, useEffect } from 'react';

// Mock list of customers
const MOCK_CUSTOMERS: DonHang.Customer[] = [
	{ id: '1', name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', phone: '0901234567', address: 'Hà Nội' },
	{ id: '2', name: 'Trần Thị B', email: 'tranthib@email.com', phone: '0912345678', address: 'TP.HCM' },
	{ id: '3', name: 'Phạm Viết C', email: 'phamvietc@email.com', phone: '0923456789', address: 'Đà Nẵng' },
	{ id: '4', name: 'Hoàng Minh D', email: 'hoangminhd@email.com', phone: '0934567890', address: 'Hải Phòng' },
	{ id: '5', name: 'Lê Quốc E', email: 'lequoce@email.com', phone: '0945678901', address: 'Cần Thơ' },
];

// Mock products
const MOCK_PRODUCTS: DonHang.Product[] = [
	{ id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
	{ id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
	{ id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
	{ id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
	{ id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
];

// Mock initial orders
const MOCK_ORDERS: DonHang.Item[] = [
	{
		id: '1',
		maDonHang: 'DH001',
		customer: MOCK_CUSTOMERS[0],
		products: [
			{
				productId: 1,
				productName: 'Laptop Dell XPS 13',
				price: 25000000,
				quantity: 1,
				total: 25000000,
			},
		],
		totalAmount: 25000000,
		status: 'Chờ xác nhận',
		orderDate: '2026-04-10',
		createdAt: new Date('2026-04-10').toISOString(),
	},
	{
		id: '2',
		maDonHang: 'DH002',
		customer: MOCK_CUSTOMERS[1],
		products: [
			{
				productId: 2,
				productName: 'iPhone 15 Pro Max',
				price: 30000000,
				quantity: 2,
				total: 60000000,
			},
		],
		totalAmount: 60000000,
		status: 'Đang giao',
		orderDate: '2026-04-08',
		createdAt: new Date('2026-04-08').toISOString(),
	},
];

export default () => {
	const [data, setData] = useState<DonHang.Item[]>([]);
	const [currentOrder, setCurrentOrder] = useState<DonHang.Item | undefined>();
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [visible, setVisible] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>('');
	const [filterStatus, setFilterStatus] = useState<DonHang.StatusDonHang | 'All'>('All');
	const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

	// Load data from localStorage
	const getDataOrder = async () => {
		const dataLocal: any = JSON.parse(localStorage.getItem('donhang') as any) || MOCK_ORDERS;
		setData(dataLocal);
	};

	// Initialize on mount
	useEffect(() => {
		getDataOrder();
	}, []);

	// Generate unique order ID
	const generateOrderId = () => {
		const currentOrders = data.filter((o) => o.maDonHang.startsWith('DH'));
		const maxNum = currentOrders.length > 0 
			? Math.max(...currentOrders.map((o) => parseInt(o.maDonHang.replace('DH', '')))) 
			: 0;
		return `DH${String(maxNum + 1).padStart(3, '0')}`;
	};

	// Add or update order
	const saveOrder = (order: DonHang.Item) => {
		let updatedData: DonHang.Item[];
		if (isEdit && currentOrder) {
			updatedData = data.map((o) => (o.id === currentOrder.id ? order : o));
		} else {
			const newId = Math.random().toString(36).substr(2, 9);
			updatedData = [...data, { ...order, id: newId }];
		}
		setData(updatedData);
		localStorage.setItem('donhang', JSON.stringify(updatedData));
	};

	// Cancel order
	const cancelOrder = (orderId: string) => {
		const updatedData = data.map((o) =>
			o.id === orderId ? { ...o, status: 'Hủy' as DonHang.StatusDonHang } : o,
		);
		setData(updatedData);
		localStorage.setItem('donhang', JSON.stringify(updatedData));
	};

	// Delete order
	const deleteOrder = (orderId: string) => {
		const updatedData = data.filter((o) => o.id !== orderId);
		setData(updatedData);
		localStorage.setItem('donhang', JSON.stringify(updatedData));
	};

	// Get customers
	const getCustomers = () => MOCK_CUSTOMERS;

	// Get products
	const getProducts = () => MOCK_PRODUCTS;

	// Get filtered and sorted data
	const getFilteredData = () => {
		let filtered = [...data];

		// Apply search filter
		if (searchText) {
			filtered = filtered.filter(
				(order) =>
					order.maDonHang.toLowerCase().includes(searchText.toLowerCase()) ||
					order.customer.name.toLowerCase().includes(searchText.toLowerCase()),
			);
		}

		// Apply status filter
		if (filterStatus !== 'All') {
			filtered = filtered.filter((order) => order.status === filterStatus);
		}

		// Apply sorting
		filtered.sort((a, b) => {
			if (sortBy === 'date') {
				const dateA = new Date(a.orderDate).getTime();
				const dateB = new Date(b.orderDate).getTime();
				return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
			} else {
				return sortOrder === 'asc' ? a.totalAmount - b.totalAmount : b.totalAmount - a.totalAmount;
			}
		});

		return filtered;
	};

	return {
		data,
		setData,
		currentOrder,
		setCurrentOrder,
		isEdit,
		setIsEdit,
		visible,
		setVisible,
		getDataOrder,
		saveOrder,
		cancelOrder,
		deleteOrder,
		getCustomers,
		getProducts,
		generateOrderId,
		searchText,
		setSearchText,
		filterStatus,
		setFilterStatus,
		sortBy,
		setSortBy,
		sortOrder,
		setSortOrder,
		getFilteredData,
	};
};
