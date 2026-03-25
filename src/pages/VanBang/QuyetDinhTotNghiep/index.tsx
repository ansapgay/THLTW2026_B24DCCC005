import { Button, Form, Input, Modal, message, Popconfirm, Tooltip, DatePicker, Select } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import moment from 'moment';
import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';
import { TRANG_THAI_QUYET_DINH } from '@/services/VanBang/constant';

const QuyetDinhForm = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Số Quyết định" name="soQD" rules={[{ required: true, message: 'Nhập số QĐ!' }]}>
        <Input placeholder="VD: 001-QĐ/2024" />
      </Form.Item>
      <Form.Item label="Ngày ban hành" name="ngayBanHanh" rules={[{ required: true }]}>
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item label="Trích yếu" name="trichYeu" rules={[{ required: true }]}>
        <Input.TextArea rows={3} placeholder="Mô tả nội dung quyết định" />
      </Form.Item>
      <Form.Item label="Sổ văn bằng" name="soVanBangId" rules={[{ required: true }]}>
        <Input placeholder="Chọn sổ văn bằng" />
      </Form.Item>
      <Form.Item label="Trạng thái" name="trangThai" initialValue="DRAFT">
        <Select options={[
          { label: 'Nháp', value: 'DRAFT' },
          { label: 'Hoạt động', value: 'ACTIVE' },
          { label: 'Đã đóng', value: 'CLOSED' },
        ]} />
      </Form.Item>
      <Form.Item label="Ghi chú" name="ghiChu">
        <Input.TextArea rows={2} />
      </Form.Item>
    </Form>
  );
};

const QuyetDinhTotNghiepPage = () => {
  const { getModel, page, limit, deleteModel, handleEdit } = useModel('vanbang.quyetdinhtotnghiep');

  const columns: IColumn<QuyetDinhTotNghiep.IRecord>[] = [
    {
      title: 'Số QĐ',
      dataIndex: 'soQD',
      width: 150,
      filterType: 'string',
      sortable: true,
    },
    {
      title: 'Ngày ban hành',
      dataIndex: 'ngayBanHanh',
      width: 130,
      render: (val) => (val ? moment(val).format('DD/MM/YYYY') : ''),
      sortable: true,
    },
    {
      title: 'Trích yếu',
      dataIndex: 'trichYeu',
      width: 300,
      ellipsis: true,
    },
    {
      title: 'Năm',
      dataIndex: 'soVanBangNam',
      width: 80,
      sortable: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      width: 100,
      filterType: 'select',
      filterData: ['DRAFT', 'ACTIVE', 'CLOSED'],
      render: (status) => {
        const statusMap = { DRAFT: 'Nháp', ACTIVE: 'Hoạt động', CLOSED: 'Đã đóng' };
        return statusMap[status] || status;
      },
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 120,
      fixed: 'right',
      render: (record: QuyetDinhTotNghiep.IRecord) => (
        <>
          <Tooltip title="Chỉnh sửa">
            <Button onClick={() => handleEdit(record)} type="link" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              onConfirm={() => deleteModel(record._id, getModel)}
              title="Xác nhận xóa quyết định này?"
              placement="topLeft"
            >
              <Button danger type="link" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <TableBase
      columns={columns}
      dependencies={[page, limit]}
      modelName="vanbang.quyetdinhtotnghiep"
      title="Quản lý Quyết định Tốt nghiệp"
      Form={QuyetDinhForm}
    />
  );
};

export default QuyetDinhTotNghiepPage;
