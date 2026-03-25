import { Button, Form, Input, InputNumber, Modal, message, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import moment from 'moment';
import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';

const SoVanBangForm = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Năm" name="nam" rules={[{ required: true, message: 'Please input năm!' }]}>
        <InputNumber min={2000} max={2100} />
      </Form.Item>
      <Form.Item label="Số vào sổ hiện tại" name="soVaoSoHienTai" rules={[{ required: true }]}>
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item label="Số hiệu văn bằng" name="soHieuVanBang" rules={[{ required: true }]}>
        <Input placeholder="VD: 2024-001-PTIT" />
      </Form.Item>
      <Form.Item label="Ngày tạo" name="ngayTao">
        <Input type="date" />
      </Form.Item>
      <Form.Item label="Ghi chú" name="ghiChu">
        <Input.TextArea rows={3} />
      </Form.Item>
    </Form>
  );
};

const SoVanBangPage = () => {
  const { getModel, page, limit, deleteModel, handleEdit } = useModel('vanbang.sovanbang');

  const columns: IColumn<SoVanBang.IRecord>[] = [
    {
      title: 'Năm',
      dataIndex: 'nam',
      width: 100,
      sortable: true,
    },
    {
      title: 'Số vào sổ hiện tại',
      dataIndex: 'soVaoSoHienTai',
      width: 150,
      sortable: true,
    },
    {
      title: 'Số hiệu văn bằng',
      dataIndex: 'soHieuVanBang',
      width: 200,
      filterType: 'string',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'ngayTao',
      width: 150,
      render: (val) => (val ? moment(val).format('DD/MM/YYYY') : ''),
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghiChu',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 120,
      fixed: 'right',
      render: (record: SoVanBang.IRecord) => (
        <>
          <Tooltip title="Chỉnh sửa">
            <Button onClick={() => handleEdit(record)} type="link" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              onConfirm={() => deleteModel(record._id, getModel)}
              title="Bạn có chắc chắn muốn xóa sổ văn bằng này?"
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
      modelName="vanbang.sovanbang"
      title="Quản lý Sổ Văn Bằng"
      Form={SoVanBangForm}
    />
  );
};

export default SoVanBangPage;
