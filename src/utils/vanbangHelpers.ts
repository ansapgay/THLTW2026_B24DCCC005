/**
 * Utility helpers cho VanBang module
 */

import { Form, Input, InputNumber, DatePicker, Select, Checkbox, Radio, Rate, Slider } from 'antd';
import moment from 'moment';
import type { CauHinhBieuMau } from '../services/VanBang/CauHinhBieuMau/typing.d';

/**
 * Render input control dựa trên kiểu dữ liệu
 */
export const getInputByType = (field: CauHinhBieuMau.IRecord) => {
  const { kieuDuLieu, giaTri } = field;

  const defaultProps = {
    placeholder: `Nhập ${field.tenTruong.toLowerCase()}`,
  };

  switch (kieuDuLieu) {
    case 'Date':
      return <DatePicker format="YYYY-MM-DD" {...defaultProps} />;

    case 'Number':
      return (
        <InputNumber
          {...defaultProps}
          min={0}
          step={0.01}
          parser={(value) => parseFloat(value || 0)}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        />
      );

    case 'String':
    default:
      return <Input {...defaultProps} />;
  }
};

/**
 * Validate value dựa trên kiểu dữ liệu
 */
export const validateFieldValue = (
  value: any,
  type: 'String' | 'Number' | 'Date',
  fieldName: string,
): { valid: boolean; error?: string } => {
  if (type === 'String') {
    if (typeof value !== 'string') {
      return { valid: false, error: `${fieldName} phải là chuỗi ký tự` };
    }
    return { valid: true };
  }

  if (type === 'Number') {
    const num = parseFloat(value);
    if (isNaN(num)) {
      return { valid: false, error: `${fieldName} phải là số` };
    }
    return { valid: true };
  }

  if (type === 'Date') {
    const date = moment(value, 'YYYY-MM-DD', true);
    if (!date.isValid()) {
      return { valid: false, error: `${fieldName} phải theo định dạng YYYY-MM-DD` };
    }
    return { valid: true };
  }

  return { valid: true };
};

/**
 * Format giá trị để hiển thị dựa trên kiểu dữ liệu
 */
export const formatDisplayValue = (value: any, type: 'String' | 'Number' | 'Date'): string => {
  if (!value) return '';

  switch (type) {
    case 'Date':
      return moment(value).format('DD/MM/YYYY');

    case 'Number':
      if (typeof value === 'number') {
        return value.toLocaleString('vi-VN');
      }
      return value.toString();

    case 'String':
    default:
      return value.toString();
  }
};

/**
 * Build Form.Item rules dựa trên cấu hình trường
 */
export const getBuildRules = (field: CauHinhBieuMau.IRecord) => {
  const rules: any[] = [];

  if (field.batBuoc) {
    rules.push({
      required: true,
      message: `${field.tenTruong} là bắt buộc`,
    });
  }

  // Type validation
  if (field.kieuDuLieu === 'Number') {
    rules.push({
      pattern: /^[0-9]+([.,][0-9]{1,2})?$/,
      message: `${field.tenTruong} phải là số`,
    });
  }

  if (field.kieuDuLieu === 'Date') {
    rules.push({
      pattern: /^\d{4}-\d{2}-\d{2}$/,
      message: `${field.tenTruong} phải theo định dạng YYYY-MM-DD`,
    });
  }

  return rules;
};

/**
 * Convert thongTinThem object thành FormData format
 */
export const thongTinThemToFormData = (thongTinThem: Record<string, any>) => {
  const result: any = {};
  Object.entries(thongTinThem || {}).forEach(([key, value]) => {
    result[['thongTinThem', key]] = value;
  });
  return result;
};

/**
 * Convert FormData back to thongTinThem
 */
export const formDataToThongTinThem = (formValues: any) => {
  const thongTinThem: Record<string, any> = {};
  if (formValues?.thongTinThem) {
    Object.entries(formValues.thongTinThem).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        thongTinThem[key] = value;
      }
    });
  }
  return thongTinThem;
};

/**
 * Check if 2 search parameters is satisfied
 */
export const validateSearchParams = (params: Record<string, any>): boolean => {
  const filledParams = Object.values(params).filter(
    (v) => v && v.toString && v.toString().trim(),
  ).length;
  return filledParams >= 2;
};

/**
 * Build search filter dựa trên tham số
 */
export const buildSearchFilter = (params: {
  soHieuVanBang?: string;
  soVaoSo?: number | string;
  maSinhVien?: string;
  hoTen?: string;
  ngaySinh?: string;
}) => {
  const filter: any = {};

  if (params.soHieuVanBang) {
    filter.soHieuVanBang = { $regex: params.soHieuVanBang, $options: 'i' };
  }
  if (params.soVaoSo) {
    filter.soVaoSo = parseInt(params.soVaoSo.toString());
  }
  if (params.maSinhVien) {
    filter.maSinhVien = { $regex: params.maSinhVien, $options: 'i' };
  }
  if (params.hoTen) {
    filter.hoTen = { $regex: params.hoTen, $options: 'i' };
  }
  if (params.ngaySinh) {
    filter.ngaySinh = params.ngaySinh;
  }

  return filter;
};
