import React, { useEffect } from 'react';
import { Form, Input, Select, Button, InputNumber, Row, Col, Table, Space, message } from 'antd';
import { useModel } from 'umi';

interface FormProps {
	onSuccess?: () => void;
}

const DonHangForm: React.FC<FormProps> = ({ onSuccess }) => {
	const [form] = Form.useForm();
	const {
		currentOrder,
		isEdit,
		saveOrder,
		getCustomers,
		getProducts,
		generateOrderId,
		setVisible,
		data,
	} = useModel('donhang');

	const [selectedProducts, setSelectedProducts] = React.useState<DonHang.OrderProduct[]>([]);
	const [newProductId, setNewProductId] = React.useState<number | null>(null);
	const [newProductQuantity, setNewProductQuantity] = React.useState<number>(1);

	useEffect(() => {
		if (currentOrder && isEdit) {
			form.setFieldsValue({
				maDonHang: currentOrder.maDonHang,
				customerId: currentOrder.customer.id,
				status: currentOrder.status,
			});
			setSelectedProducts(currentOrder.products);
		} else {
			form.setFieldsValue({
				maDonHang: generateOrderId(),
				status: 'Chờ xác nhận',
			});
			setSelectedProducts([]);
		}
		setNewProductId(null);
		setNewProductQuantity(1);
	}, [currentOrder, isEdit, form, generateOrderId]);

	const handleAddProduct = () => {
		if (!newProductId || newProductQuantity <= 0) {
			message.error('Vui lòng chọn sản phẩm và nhập số lượng');
			return;
		}

		const product = getProducts().find((p) => p.id === newProductId);
		if (!product) {
			message.error('Sản phẩm không tồn tại');
			return;
		}

		// Check if product already exists
		const existingProduct = selectedProducts.find((p) => p.productId === newProductId);
		if (existingProduct) {
			// Update quantity
			setSelectedProducts(
				selectedProducts.map((p) =>
					p.productId === newProductId
						? {
								...p,
								quantity: p.quantity + newProductQuantity,
								total: (p.quantity + newProductQuantity) * p.price,
						  }
						: p,
				),
			);
		} else {
			// Add new product
			const newProduct: DonHang.OrderProduct = {
				productId: product.id,
				productName: product.name,
				price: product.price,
				quantity: newProductQuantity,
				total: product.price * newProductQuantity,
			};
			setSelectedProducts([...selectedProducts, newProduct]);
		}

		setNewProductId(null);
		setNewProductQuantity(1);
	};

	const handleRemoveProduct = (productId: number) => {
		setSelectedProducts(selectedProducts.filter((p) => p.productId !== productId));
	};

	const handleSubmit = async (values: any) => {
		if (selectedProducts.length === 0) {
			message.error('Vui lòng chọn ít nhất một sản phẩm');
			return;
		}

		// Check for duplicate order ID
		if (!isEdit) {
			const isDuplicate = data.some((o) => o.maDonHang === values.maDonHang);
			if (isDuplicate) {
				message.error('Mã đơn hàng đã tồn tại');
				return;
			}
		}

		const customer = getCustomers().find((c) => c.id === values.customerId);
		if (!customer) {
			message.error('Khách hàng không tồn tại');
			return;
		}

		const totalAmount = selectedProducts.reduce((sum, p) => sum + p.total, 0);

		const newOrder: DonHang.Item = {
			id: currentOrder?.id || '',
			maDonHang: values.maDonHang,
			customer,
			products: selectedProducts,
			totalAmount,
			status: values.status,
			orderDate: currentOrder?.orderDate || new Date().toISOString().split('T')[0],
			createdAt: currentOrder?.createdAt || new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		saveOrder(newOrder);
		message.success(isEdit ? 'Cập nhật đơn hàng thành công' : 'Thêm đơn hàng thành công');
		setVisible(false);
		onSuccess?.();
	};

	const productColumns = [
		{
			title: 'Tên sản phẩm',
			dataIndex: 'productName',
			key: 'productName',
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			key: 'price',
			render: (price: number) => price.toLocaleString('vi-VN') + ' đ',
		},
		{
			title: 'Số lượng',
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: 'Thành tiền',
			dataIndex: 'total',
			key: 'total',
			render: (total: number) => total.toLocaleString('vi-VN') + ' đ',
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: (_: any, record: DonHang.OrderProduct) => (
				<Button danger size="small" onClick={() => handleRemoveProduct(record.productId)}>
					Xóa
				</Button>
			),
		},
	];

	return (
		<div>
			<Form form={form} layout="vertical" onFinish={handleSubmit}>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							label="Mã đơn hàng"
							name="maDonHang"
							rules={[{ required: true, message: 'Vui lòng nhập mã đơn hàng' }]}
						>
							<Input placeholder="Mã đơn hàng" disabled={isEdit} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label="Khách hàng"
							name="customerId"
							rules={[{ required: true, message: 'Vui lòng chọn khách hàng' }]}
						>
							<Select placeholder="Chọn khách hàng">
								{getCustomers().map((customer) => (
									<Select.Option key={customer.id} value={customer.id}>
										{customer.name} - {customer.phone}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							label="Sản phẩm"
							name="productId"
							rules={[{ required: false }]}
						>
							<Select
								placeholder="Chọn sản phẩm"
								value={newProductId}
								onChange={setNewProductId}
							>
								{getProducts().map((product) => (
									<Select.Option key={product.id} value={product.id}>
										{product.name} - {product.price.toLocaleString('vi-VN')} đ
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label="Số lượng"
							name="quantity"
							rules={[{ required: false }]}
						>
							<InputNumber
								placeholder="Số lượng"
								value={newProductQuantity}
								onChange={(val) => setNewProductQuantity(val || 1)}
								min={1}
								style={{ width: '100%' }}
							/>
						</Form.Item>
					</Col>
					<Col span={4} style={{ display: 'flex', alignItems: 'flex-end' }}>
						<Button type="primary" onClick={handleAddProduct} block>
							Thêm
						</Button>
					</Col>
				</Row>

				<Form.Item label="Danh sách sản phẩm">
					<Table
						columns={productColumns}
						dataSource={selectedProducts}
						rowKey="productId"
						pagination={false}
						size="small"
						scroll={{ x: true }}
					/>
					<div style={{ marginTop: 16, textAlign: 'right', fontWeight: 'bold' }}>
						Tổng tiền: {selectedProducts.reduce((sum, p) => sum + p.total, 0).toLocaleString('vi-VN')} đ
					</div>
				</Form.Item>

				<Form.Item
					label="Trạng thái"
					name="status"
					rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
					initialValue="Chờ xác nhận"
				>
					<Select>
						<Select.Option value="Chờ xác nhận">Chờ xác nhận</Select.Option>
						<Select.Option value="Đang giao">Đang giao</Select.Option>
						<Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
						<Select.Option value="Hủy">Hủy</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit">
							{isEdit ? 'Cập nhật' : 'Thêm mới'}
						</Button>
						<Button onClick={() => setVisible(false)}>Hủy</Button>
					</Space>
				</Form.Item>
			</Form>
		</div>
	);
};

export default DonHangForm;
