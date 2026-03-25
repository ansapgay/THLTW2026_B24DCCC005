import { Button, Form, Input, Modal, message, Popconfirm, Tooltip, InputNumber, Select } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import moment from 'moment';
import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';
import { KIEU_DU_LIEU } from '@/services/VanBang/constant';

const CauHinhForm = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Tên trường" name="tenTruong" rules={[{ required: true, message: 'Nhập tên trường!' }]}>
        <Input placeholder="VD: Dân tộc, Nơi sinh, Đơn vị công tác" />
      </Form.Item>
      <Form.Item label="Kiểu dữ liệu" name="kieuDuLieu" rules={[{ required: true }]}>
        <Select options={[
          { label: 'Chuỗi ký tự (String)', value: 'String' },
          { label: 'Số (Number)', value: 'Number' },
          { label: 'Ngày tháng (Date)', value: 'Date' },
        ]} />
      </Form.Item>
      <Form.Item label="Thứ tự hiển thị" name="thuTuHienThi" rules={[{ required: true }]}>
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item label="Bắt buộc?" name="batBuoc" valuePropName="checked">
        <Select options={[
          { label: 'Có', value: true },
          { label: 'Không', value: false },
        ]} />
      </Form.Item>
      <Form.Item label="Giá trị mặc định" name="giaTri">
        <Input />
      </Form.Item>
      <Form.Item label="Mô tả" name="moTa">
        <Input.TextArea rows={2} />
      </Form.Item>
    </Form>
  );
};

const CauHinhBieuMauPage = () => {
  const { getModel, page, limit, deleteModel, handleEdit } = useModel('vanbang.cauhinhbieumau');

  const columns: IColumn<CauHinhBieuMau.IRecord>[] = [
    {
      title: 'Tên trường',
      dataIndex: 'tenTruong',
      width: 200,
      filterType: 'string',
    },
    {
      title: 'Kiểu dữ liệu',
      dataIndex: 'kieuDuLieu',
      width: 120,
      filterType: 'select',
      filterData: ['String', 'Number', 'Date'],
    },
    {
      title: 'Thứ tự',
      dataIndex: 'thuTuHienThi',
      width: 80,
      sortable: true,
    },
    {
      title: 'Bắt buộc',
      dataIndex: 'batBuoc',
      width: 100,
      render: (val) => (val ? '✓' : ''),
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 120,
      fixed: 'right',
      render: (record: CauHinhBieuMau.IRecord) => (
        <>
          <Tooltip title="Chỉnh sửa">
            <Button onClick={() => handleEdit(record)} type="link" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              onConfirm={() => deleteModel(record._id, getModel)}
              title="Xác nhận xóa cấu hình này?"
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
      modelName="vanbang.cauhinhbieumau"
      title="Cấu hình Biểu mẫu Văn bằng"
      Form={CauHinhForm}
    />
  );
};

export default CauHinhBieuMauPage;
