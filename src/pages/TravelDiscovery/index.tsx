import React, { useEffect, useState } from 'react';
import { Row, Col, Empty, Spin, Button, Drawer, Space } from 'antd';
import DestinationCard from '@/components/Travel/DestinationCard';
import DestinationFilter from '@/components/Travel/DestinationFilter';
import styles from './index.less';

const TravelDiscovery: React.FC = () => {
	const [destinations, setDestinations] = useState<Travel.Destination[]>([]);
	const [loading, setLoading] = useState(false);
	const [filter, setFilter] = useState<Travel.DestinationFilter>({});
	const [selectedDestination, setSelectedDestination] = useState<Travel.Destination | undefined>();
	const [drawerVisible, setDrawerVisible] = useState(false);

	useEffect(() => {
		fetchDestinations();
	}, []);

	const fetchDestinations = async () => {
		try {
			setLoading(true);
			// Mock data - trong thực tế sẽ gọi API
			const mockDestinations: Travel.Destination[] = [
				{
					id: '1',
					name: 'Vịnh Hạ Long',
					location: 'Quảng Ninh',
					type: 'beach',
					description: 'Vịnh Hạ Long là một trong những kỳ quan thiên nhiên thế giới nổi tiếng với những hòn đảo đá vôi hùng vĩ.',
					imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
					rating: 4.8,
					totalReviews: 2850,
					pricePerDay: 800000,
					foodCost: 300000,
					accommodationCost: 500000,
					transportCost: 200000,
					viewingTime: 2,
				},
				{
					id: '2',
					name: 'Sa Pa',
					location: 'Lào Cai',
					type: 'mountain',
					description: 'Sa Pa là điểm du lịch nổi tiếng với những thửa ruộng bậc thang, thời tiết mát mẻ và những dân tộc địa phương.',
					imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
					rating: 4.6,
					totalReviews: 1920,
					pricePerDay: 600000,
					foodCost: 200000,
					accommodationCost: 400000,
					transportCost: 150000,
					viewingTime: 1.5,
				},
				{
					id: '3',
					name: 'Hồ Ba Bể',
					location: 'Bắc Kạn',
					type: 'beach',
					description: 'Hồ Ba Bể là hồ nước tự nhiên lớn nhất Việt Nam, nằm giữa ba loạt núi hùng vĩ.',
					imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
					rating: 4.5,
					totalReviews: 1200,
					pricePerDay: 500000,
					foodCost: 180000,
					accommodationCost: 350000,
					transportCost: 120000,
					viewingTime: 1.5,
				},
				{
					id: '4',
					name: 'TP. Hồ Chí Minh',
					location: 'Hồ Chí Minh',
					type: 'city',
					description: 'TP. Hồ Chí Minh là trung tâm kinh tế, văn hóa lớn nhất Việt Nam với những tòa nhà hiện đại.',
					imageUrl: 'https://images.unsplash.com/photo-1488747807830-63789f68bb65?w=400',
					rating: 4.3,
					totalReviews: 3200,
					pricePerDay: 1000000,
					foodCost: 400000,
					accommodationCost: 600000,
					transportCost: 150000,
					viewingTime: 1,
				},
				{
					id: '5',
					name: 'Phú Quốc',
					location: 'Kiên Giang',
					type: 'beach',
					description: 'Phú Quốc là hòn đảo lớn nhất Việt Nam với những bãi biển cát trắng tươi đẹp.',
					imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
					rating: 4.7,
					totalReviews: 2100,
					pricePerDay: 900000,
					foodCost: 350000,
					accommodationCost: 550000,
					transportCost: 180000,
					viewingTime: 2,
				},
				{
					id: '6',
					name: 'Ninh Bình',
					location: 'Ninh Bình',
					type: 'mountain',
					description: 'Ninh Bình được gọi là "Hạ Long trên cạn" với những núi đá vôi đôi mái rất đặc sắc.',
					imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
					rating: 4.4,
					totalReviews: 1650,
					pricePerDay: 550000,
					foodCost: 200000,
					accommodationCost: 350000,
					transportCost: 100000,
					viewingTime: 1.5,
				},
				{
					id: '7',
					name: 'Đà Nẵng',
					location: 'Đà Nẵng',
					type: 'city',
					description: 'Đà Nẵng là thành phố ven biển xinh đẹp với bãi biển My Khê nổi tiếng.',
					imageUrl: 'https://images.unsplash.com/photo-1488747807830-63789f68bb65?w=400',
					rating: 4.5,
					totalReviews: 2400,
					pricePerDay: 750000,
					foodCost: 300000,
					accommodationCost: 450000,
					transportCost: 120000,
					viewingTime: 1.5,
				},
				{
					id: '8',
					name: 'Hà Nội',
					location: 'Hà Nội',
					type: 'city',
					description: 'Hà Nội là thủ đô của Việt Nam, nơi lưu giữ những di sản lịch sử và văn hóa quý báu.',
					imageUrl: 'https://images.unsplash.com/photo-1488747807830-63789f68bb65?w=400',
					rating: 4.2,
					totalReviews: 3500,
					pricePerDay: 800000,
					foodCost: 350000,
					accommodationCost: 500000,
					transportCost: 120000,
					viewingTime: 1,
				},
			];
			setDestinations(mockDestinations);
		} catch (error) {
			console.error('Error fetching destinations:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleFilter = (newFilter: Travel.DestinationFilter) => {
		setFilter(newFilter);
		// Implement filter logic here
	};

	const handleAddToItinerary = (destination: Travel.Destination) => {
		// TODO: Add to itinerary logic
		console.log('Add to itinerary:', destination);
	};

	const handleViewDetails = (destination: Travel.Destination) => {
		setSelectedDestination(destination);
		setDrawerVisible(true);
	};

	const filteredDestinations = destinations.filter((dest: Travel.Destination) => {
		if (filter.search && !dest.name.toLowerCase().includes(filter.search.toLowerCase())) {
			return false;
		}
		if (filter.type && dest.type !== filter.type) {
			return false;
		}
		if (filter.priceMax && dest.pricePerDay && dest.pricePerDay > filter.priceMax) {
			return false;
		}
		if (filter.ratingMin && dest.rating < filter.ratingMin) {
			return false;
		}
		return true;
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>🌍 Khám phá điểm đến du lịch</h1>
				<p>Tìm kiếm và khám phá những điểm đến tuyệt vời trên khắp thế giới</p>
			</div>

			<DestinationFilter onFilter={handleFilter} loading={false} />

			<Spin spinning={loading}>
				{filteredDestinations.length > 0 ? (
					<Row gutter={[16, 16]}>
						{filteredDestinations.map((destination: Travel.Destination) => (
							<Col key={destination.id} xs={24} sm={12} md={8} lg={6}>
								<DestinationCard
									destination={destination}
									onAddToItinerary={handleAddToItinerary}
									onViewDetails={handleViewDetails}
								/>
							</Col>
						))}
					</Row>
				) : (
					<Empty
						description="Không tìm thấy điểm đến"
						style={{ marginTop: '60px' }}
					/>
				)}
			</Spin>

			<Drawer
				title={selectedDestination?.name}
				placement="right"
				onClose={() => setDrawerVisible(false)}
			visible={drawerVisible}
				width={600}
			>
				{selectedDestination && (
					<div className={styles.detailContent}>
						{selectedDestination.imageUrl && (
							<img
								src={selectedDestination.imageUrl}
								alt={selectedDestination.name}
								className={styles.detailImage}
							/>
						)}
						<div className={styles.detailInfo}>
							<h2>{selectedDestination.name}</h2>
							<p><strong>Địa điểm:</strong> {selectedDestination.location}</p>
							<p><strong>Mô tả:</strong> {selectedDestination.description}</p>
							<div className={styles.costInfo}>
								<h3>Chi phí (1 ngày)</h3>
								<p>Ăn uống: {selectedDestination.foodCost?.toLocaleString()} đ</p>
								<p>Lưu trú: {selectedDestination.accommodationCost?.toLocaleString()} đ</p>
								<p>Di chuyển: {selectedDestination.transportCost?.toLocaleString()} đ</p>
								<p className={styles.total}>
									<strong>Tổng:</strong> {(
										(selectedDestination.foodCost || 0) +
										(selectedDestination.accommodationCost || 0) +
										(selectedDestination.transportCost || 0)
									).toLocaleString()} đ
								</p>
							</div>
							<Space style={{ marginTop: '16px' }}>
								<Button
									type="primary"
									onClick={() => handleAddToItinerary(selectedDestination)}
								>
									Thêm vào lịch trình
								</Button>
							</Space>
						</div>
					</div>
				)}
			</Drawer>
		</div>
	);
};

export default TravelDiscovery;
