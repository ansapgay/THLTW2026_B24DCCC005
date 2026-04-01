import { Form, Input, Select, Row, Col, Button, Space, Card } from 'antd';
import { SearchOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons';
import styles from './DestinationFilter.less';

interface DestinationFilterProps {
	onFilter: (filter: Travel.DestinationFilter) => void;
	loading?: boolean;
}

const DestinationFilter: React.FC<DestinationFilterProps> = ({ onFilter, loading = false }) => {
	const [form] = Form.useForm();

	const handleFilter = () => {
		const values = form.getFieldsValue();
		onFilter({
			search: values.search,
			type: values.type,
			priceMin: values.priceMin,
			priceMax: values.priceMax,
			ratingMin: values.rating,
		});
	};

	const handleClear = () => {
		form.resetFields();
		onFilter({});
	};

	return (
		<Card className={styles.filterCard}>
			<Form
				form={form}
				layout="vertical"
				onValuesChange={handleFilter}
			>
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={12} md={6}>
						<Form.Item
							name="search"
							label="Tìm kiếm"
							className={styles.formItem}
						>
							<Input
								placeholder="Tên địa điểm..."
								prefix={<SearchOutlined />}
								allowClear
							/>
						</Form.Item>
					</Col>

					<Col xs={24} sm={12} md={6}>
						<Form.Item
							name="type"
							label="Loại hình"
							className={styles.formItem}
						>
							<Select
								placeholder="Chọn loại hình"
								allowClear
								options={[
									{ label: 'Biển', value: 'beach' },
									{ label: 'Núi', value: 'mountain' },
									{ label: 'Thành phố', value: 'city' },
									{ label: 'Nông thôn', value: 'rural' },
								]}
							/>
						</Form.Item>
					</Col>

					<Col xs={24} sm={12} md={6}>
						<Form.Item
							name="rating"
							label="Đánh giá tối thiểu"
							className={styles.formItem}
						>
							<Select
								placeholder="Chọn đánh giá"
								allowClear
								options={[
									{ label: '⭐ 4.0+', value: 4 },
									{ label: '⭐⭐ 3.5+', value: 3.5 },
									{ label: '⭐⭐⭐ 3.0+', value: 3 },
								]}
							/>
						</Form.Item>
					</Col>

					<Col xs={24} sm={12} md={6}>
						<Form.Item
							name="priceMax"
							label="Giá tối đa (đ/ngày)"
							className={styles.formItem}
						>
							<Input
								type="number"
								placeholder="VD: 1000000"
								allowClear
							/>
						</Form.Item>
					</Col>

					<Col xs={24} className={styles.actions}>
						<Space>
							<Button
								type="primary"
								icon={<FilterOutlined />}
								onClick={handleFilter}
								loading={loading}
							>
								Lọc
							</Button>
							<Button
								icon={<ClearOutlined />}
								onClick={handleClear}
							>
								Xóa bộ lọc
							</Button>
						</Space>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};

export default DestinationFilter;
