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
	{
		path: '/guess-number-game',
		name: 'Bài 1: Đoán số',
		icon: 'GamepadOutlined',
		component: './GuessNumber',
	},
	{
		path: '/study-progress',
		name: 'Bài 2: Quản lý học tập',
		icon: 'BookOutlined',
		component: './StudyProgress',
	},
	{
		path: '/rock-paper-scissors',
		name: 'Bài 1: Trò chơi Oán Tú Tì',
		icon: 'CopyOutlined',
		component: './RockPaperScissors',
	},
	{
		path: '/question-bank',
		name: 'Bài 2: Quản lý ngân hàng câu hỏi',
		icon: 'FileSearchOutlined',
		component: './QuestionBank',
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
