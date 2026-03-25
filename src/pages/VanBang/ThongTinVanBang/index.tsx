import { Button, Form, Input, Modal, message, Popconfirm, Tooltip, DatePicker, Select, Row, Col, Spin } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import moment from 'moment';
import { useState, useEffect } from 'react';
import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';

/**
 * Form động dựa trên cấu hình biểu mẫu
 */
const ThongTinVanBangForm = ({ configFields }: { configFields: CauHinhBieuMau.IRecord[] }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Sort fields by order
  const sortedFields = [...(configFields || [])].sort((a, b) => a.thuTuHienThi - b.thuTuHienThi);

  const renderFieldByType = (field: CauHinhBieuMau.IRecord) => {
    switch (field.kieuDuLieu) {
      case 'Date':
        return <DatePicker format="YYYY-MM-DD" />;
      case 'Number':
        return <Input type="number" />;
      case 'String':
      default:
        return <Input />;
    }
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Mã sinh viên" name="maSinhVien" rules={[{ required: true }]}>
        <Input placeholder="VD: 24DCCC005" />
      </Form.Item>
      <Form.Item label="Họ tên" name="hoTen" rules={[{ required: true }]}>
        <Input placeholder="Họ và tên sinh viên" />
      </Form.Item>
      <Form.Item label="Ngày sinh" name="ngaySinh" rules={[{ required: true }]}>
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item label="Quyết định tốt nghiệp" name="quyetDinhId" rules={[{ required: true }]}>
        <Input placeholder="Chọn quyết định" />
      </Form.Item>

      {/* Dynamic fields from config */}
      {sortedFields.map((field) => (
        <Form.Item
          key={field._id}
          label={field.tenTruong}
          name={['thongTinThem', field.tenTruong]}
          rules={field.batBuoc ? [{ required: true, message: `${field.tenTruong} là bắt buộc` }] : []}
        >
          {renderFieldByType(field)}
        </Form.Item>
      ))}

      <Form.Item label="Ghi chú" name="ghiChu">
        <Input.TextArea rows={2} />
      </Form.Item>
    </Form>
  );
};

const ThongTinVanBangPage = () => {
  const { getModel, page, limit, deleteModel, handleEdit } = useModel('vanbang.thongtinvanbang');
  const [configFields, setConfigFields] = useState<CauHinhBieuMau.IRecord[]>([]);
  const [loadingConfig, setLoadingConfig] = useState(true);

  // Load config fields on mount
  useEffect(() => {
    // Giả sử lấy từ API
    setLoadingConfig(false);
  }, []);

  const columns: IColumn<ThongTinVanBang.IRecord>[] = [
    {
      title: 'Số vào sổ',
      dataIndex: 'soVaoSo',
      width: 100,
      sortable: true,
    },
    {
      title: 'Mã SV',
      dataIndex: 'maSinhVien',
      width: 120,
      filterType: 'string',
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      width: 200,
      filterType: 'string',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngaySinh',
      width: 130,
      render: (val) => (val ? moment(val).format('DD/MM/YYYY') : ''),
    },
    {
      title: 'Số hiệu VB',
      dataIndex: 'soHieuVanBang',
      width: 150,
    },
    {
      title: 'Lượt tra cứu',
      dataIndex: 'luotTraCuu',
      width: 100,
      sortable: true,
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 120,
      fixed: 'right',
      render: (record: ThongTinVanBang.IRecord) => (
        <>
          <Tooltip title="Xem">
            <Button onClick={() => handleEdit(record)} type="link" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              onConfirm={() => deleteModel(record._id, getModel)}
              title="Xác nhận xóa?"
              placement="topLeft"
            >
              <Button danger type="link" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  if (loadingConfig) {
    return <Spin />;
  }

  return (
    <TableBase
      columns={columns}
      dependencies={[page, limit]}
      modelName="vanbang.thongtinvanbang"
      title="Quản lý Thông tin Văn bằng"
      Form={() => <ThongTinVanBangForm configFields={configFields} />}
    />
  );
};

export default ThongTinVanBangPage;
