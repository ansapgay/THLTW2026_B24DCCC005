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

	// TRAVEL PLANNING
	{
		path: '/travel',
		name: 'Lập kế hoạch du lịch',
		icon: 'GlobalOutlined',
		routes: [
			{
				path: '/travel',
				name: 'Khám phá điểm đến',
				component: './TravelDiscovery',
			},
			{
				path: '/travel/create-itinerary',
				name: 'Tạo lịch trình',
				component: './CreateItinerary',
			},
			{
				path: '/travel/budget',
				name: 'Quản lý ngân sách',
				component: './BudgetManagement',
			},
			{
				path: '/travel/admin',
				name: 'Quản trị',
				component: './TravelAdmin',
			},
		],
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
		path: '/products',
		name: 'Products',
		component: './products',
	},
	{
		path: '/don-hang',
		name: 'Quản lý đơn hàng',
		icon: 'ShoppingCartOutlined',
		component: './DonHang',
	},
	// CLB QUAN LY
	{
		path: '/cau-lac-bo',
		name: 'Câu Lạc Bộ',
		icon: 'TeamOutlined',
		routes: [
			{
				path: '/cau-lac-bo',
				name: 'Danh sách CLB',
				component: './CauLacBo',
			},
			{
				path: '/cau-lac-bo/dang-ky',
				name: 'Đơn đăng ký',
				component: './DangKyThanhVien',
			},
			{
				path: '/cau-lac-bo/thanh-vien',
				name: 'Quản lý thành viên',
				component: './ThanhVienCauLacBo',
			},
			{
				path: '/cau-lac-bo/bao-cao',
				name: 'Báo cáo & Thống kê',
				component: './BaoCaoThongKe',
			},
		],
	},
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
	// TASK MANAGEMENT
	{
		path: '/task-management',
		name: 'Task Management',
		icon: 'CheckSquareOutlined',
		routes: [
			{
				path: '/task-management',
				redirect: '/task-management/dashboard',
			},
			{
				path: '/task-management/dashboard',
				name: 'Dashboard',
				component: './TaskManagement/Dashboard',
			},
			{
				path: '/task-management/kanban',
				name: 'Kanban Board',
				component: './TaskManagement/KanbanBoard',
			},
			{
				path: '/task-management/list',
				name: 'Task List',
				component: './TaskManagement/TaskList',
			},
		],
	},
	// BLOG
	{
		path: '/blog',
		name: 'Blog',
		icon: 'FileTextOutlined',
		routes: [
			{
				path: '/blog',
				name: 'Blog Home',
				component: './Blog',
			},
			{
				path: '/blog/:slug',
				name: 'Blog Detail',
				component: './Blog/detail',
				hideInMenu: true,
			},
			{
				path: '/blog-admin',
				name: 'Blog Management',
				component: './BlogAdmin',
			},
			{
				path: '/blog-about',
				name: 'About',
				component: './BlogAbout',
				hideInMenu: true,
			},
		],
	},
	{
		component: './exception/404',
	},
];
