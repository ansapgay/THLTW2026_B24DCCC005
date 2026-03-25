export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},
	{
		path: '/products',
		name: 'Quản lý Sản phẩm',	
		icon: 'ShoppingOutlined',
		component: './ProductList',
	},

	// VĂN BẰNG TỐT NGHIỆP - BÀI THỰC HÀNH 04
	{
		name: 'Quản lý Văn bằng',
		path: '/van-bang',
		icon: 'FileTextOutlined',
		routes: [
			{
				name: 'Sổ văn bằng',
				path: 'so-van-bang',
				component: './VanBang/SoVanBang',
			},
			{
				name: 'Quyết định tốt nghiệp',
				path: 'quyet-dinh-tot-nghiep',
				component: './VanBang/QuyetDinhTotNghiep',
			},
			{
				name: 'Cấu hình biểu mẫu',
				path: 'cau-hinh-bieu-mau',
				component: './VanBang/CauHinhBieuMau',
			},
			{
				name: 'Thông tin văn bằng',
				path: 'thong-tin-van-bang',
				component: './VanBang/ThongTinVanBang',
			},
		],
	},
	{
		path: '/van-bang-search',
		name: 'Tra cứu Văn bằng',
		icon: 'SearchOutlined',
		component: './VanBang/TraCuuVanBang',
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
	
];
