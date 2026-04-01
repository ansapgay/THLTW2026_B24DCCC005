import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, message } from "antd";

const Products = () => {

  const [products, setProducts] = useState([
    { id: 1, name: "Laptop Dell XPS 13", price: 25000000, quantity: 10 },
    { id: 2, name: "iPhone 15 Pro Max", price: 30000000, quantity: 15 },
    { id: 3, name: "Samsung Galaxy S24", price: 22000000, quantity: 20 },
    { id: 4, name: "iPad Air M2", price: 18000000, quantity: 12 },
    { id: 5, name: "MacBook Air M3", price: 28000000, quantity: 8 }
  ]);

  const columns = [
    {
      title: "STT",
      render: (_, __, index) => index + 1
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name"
    },
    {
      title: "Giá",
      dataIndex: "price"
    },
    {
      title: "Số lượng",
      dataIndex: "quantity"
    },
    {
      title: "Thao tác",
      render: () => (
        <Button danger>Xóa</Button>
      )
    }
  ];

  return (
    <div>
      <h2>Quản lý sản phẩm</h2>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={products}
      />
    </div>
  );
};

export default Products;