import { Card, Descriptions, Tag, Button, Row, Col, Modal, message } from 'antd';
import { CheckCircleOutlined, PrinterOutlined, DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';

interface ICertificateDetailProps {
  data: ThongTinVanBang.IRecord;
  configFields?: CauHinhBieuMau.IRecord[];
  onPrint?: () => void;
  onDownload?: () => void;
}

/**
 * Hiển thị chi tiết một văn bằng sau khi tra cứu
 */
const CertificateDetail = ({
  data,
  configFields = [],
  onPrint,
  onDownload,
}: ICertificateDetailProps) => {
  if (!data) return null;

  // Sort fields by order
  const sortedFields = [...configFields].sort((a, b) => a.thuTuHienThi - b.thuTuHienThi);

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '20px' }} />
          <span>Thông tin Văn bằng</span>
        </div>
      }
      extra={
        <Row gutter={8}>
          {onPrint && (
            <Col>
              <Button icon={<PrinterOutlined />} onClick={onPrint}>
                In
              </Button>
            </Col>
          )}
          {onDownload && (
            <Col>
              <Button icon={<DownloadOutlined />} onClick={onDownload}>
                Tải
              </Button>
            </Col>
          )}
        </Row>
      }
      style={{ marginTop: '24px' }}
    >
      <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }} size="small">
        {/* Thông tin cơ bản */}
        <Descriptions.Item label="Mã sinh viên" span={1}>
          <strong>{data.maSinhVien}</strong>
        </Descriptions.Item>
        <Descriptions.Item label="Họ tên" span={1}>
          <strong>{data.hoTen}</strong>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày sinh" span={1}>
          {moment(data.ngaySinh).format('DD/MM/YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Số vào sổ" span={1}>
          <Tag color="blue">{data.soVaoSo}</Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Số hiệu văn bằng" span={2}>
          <strong style={{ fontSize: '16px' }}>{data.soHieuVanBang}</strong>
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái" span={2}>
          <Tag
            color={
              data.trangThai === 'PUBLISHED'
                ? 'green'
                : data.trangThai === 'COMPLETED'
                  ? 'blue'
                  : 'default'
            }
          >
            {data.trangThai === 'PUBLISHED'
              ? 'Đã công bố'
              : data.trangThai === 'COMPLETED'
                ? 'Hoàn thành'
                : 'Nháp'}
          </Tag>
        </Descriptions.Item>

        {/* Thông tin thêm từ biểu mẫu cấu hình */}
        {sortedFields.map((field) => (
          <Descriptions.Item key={field._id} label={field.tenTruong} span={1}>
            {data.thongTinThem?.[field.tenTruong] !== undefined
              ? formatValue(data.thongTinThem[field.tenTruong], field.kieuDuLieu)
              : '-'}
          </Descriptions.Item>
        ))}

        {/* Ghi chú */}
        {data.ghiChu && (
          <Descriptions.Item label="Ghi chú" span={4}>
            {data.ghiChu}
          </Descriptions.Item>
        )}

        {/* Lượt tra cứu */}
        <Descriptions.Item label="Lượt tra cứu" span={1}>
          <Tag>{data.luotTraCuu || 0}</Tag>
        </Descriptions.Item>

        {/* Ngày tạo */}
        <Descriptions.Item label="Ngày tạo" span={1}>
          {moment(data.createdAt).format('DD/MM/YYYY HH:mm')}
        </Descriptions.Item>
      </Descriptions>

      {/* Disclaimer */}
      <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Lưu ý:</strong> Thông tin văn bằng này được trích xuất từ Sở Văn bằng Đại học Công nghệ Thông
        tin. Giấy chứng chỉ gốc có hiệu lực pháp lý.
      </div>
    </Card>
  );
};

/**
 * Format giá trị dựa vào kiểu dữ liệu
 */
function formatValue(value: any, type: string): React.ReactNode {
  if (value === undefined || value === null || value === '') return '-';

  switch (type) {
    case 'Date':
      return moment(value).format('DD/MM/YYYY');
    case 'Number':
      return parseFloat(value).toLocaleString('vi-VN');
    case 'String':
    default:
      return value;
  }
}

export default CertificateDetail;
