import { Card, Rate, Tag, Button, Tooltip, Empty, Spin } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useState } from 'react';
import styles from './DestinationCard.less';

interface DestinationCardProps {
	destination: Travel.Destination;
	onAddToItinerary?: (destination: Travel.Destination) => void;
	onViewDetails?: (destination: Travel.Destination) => void;
	onFavorite?: (destination: Travel.Destination) => void;
	loading?: boolean;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
	destination,
	onAddToItinerary,
	onViewDetails,
	onFavorite,
	loading = false,
}) => {
	const [isFavorite, setIsFavorite] = useState(false);

	const handleFavorite = () => {
		setIsFavorite(!isFavorite);
		onFavorite?.(destination);
	};

	const typeColors: Record<string, string> = {
		beach: 'blue',
		mountain: 'green',
		city: 'orange',
		rural: 'cyan',
		other: 'default',
	};

	const typeLabels: Record<string, string> = {
		beach: 'Biển',
		mountain: 'Núi',
		city: 'Thành phố',
		rural: 'Nông thôn',
		other: 'Khác',
	};

	return (
		<div className={styles.cardContainer}>
			<Card
				hoverable
				cover={
					<div className={styles.imageContainer}>
						{destination.imageUrl ? (
							<img
								alt={destination.name}
								src={destination.imageUrl}
								className={styles.image}
							/>
						) : (
							<Empty
								style={{ padding: '40px 0' }}
								description="Chưa có hình ảnh"
							/>
						)}
						<div className={styles.favoriteBtn}>
							<Tooltip title={isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'}>
								<Button
									type="text"
									icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
									onClick={handleFavorite}
									style={{
										color: isFavorite ? '#ff4d4f' : '#fff',
										fontSize: '18px',
									}}
								/>
							</Tooltip>
						</div>
					</div>
				}
				className={styles.card}
			>
				<Spin spinning={loading}>
					<div className={styles.content}>
						<h3 className={styles.title}>{destination.name}</h3>
						<p className={styles.location}>📍 {destination.location}</p>

						<div className={styles.ratingContainer}>
							<Rate
								allowHalf
								disabled
								value={destination.rating}
								style={{ color: '#faad14' }}
							/>
							<span className={styles.rating}>
								{destination.rating.toFixed(1)} ({destination.totalReviews || 0} đánh giá)
							</span>
						</div>

						<div className={styles.typeTag}>
							<Tag color={typeColors[destination.type]}>
								{typeLabels[destination.type]}
							</Tag>
						</div>

						{destination.description && (
							<p className={styles.description}>{destination.description.substring(0, 100)}...</p>
						)}

						<div className={styles.priceInfo}>
							{destination.pricePerDay && (
								<div className={styles.price}>
									<strong>Giá:</strong> {destination.pricePerDay.toLocaleString()} đ/ngày
								</div>
							)}
							{destination.viewingTime && (
								<div className={styles.time}>
									<strong>Thời gian:</strong> {destination.viewingTime}h
								</div>
							)}
						</div>

						<div className={styles.actions}>
							{onViewDetails && (
								<Button
									type="primary"
									block
									onClick={() => onViewDetails(destination)}
									style={{ marginBottom: '8px' }}
								>
									Xem chi tiết
								</Button>
							)}
							{onAddToItinerary && (
								<Button
									type="default"
									block
									onClick={() => onAddToItinerary(destination)}
								>
									Thêm vào lịch trình
								</Button>
							)}
						</div>
					</div>
				</Spin>
			</Card>
		</div>
	);
};

export default DestinationCard;
