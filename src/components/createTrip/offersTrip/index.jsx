import { Table } from 'antd';

const columns = [
  {
    title: 'Settlement',
    dataIndex: 'settlement',
    width: 150,
  },
  {
    title: 'Expiration Date',
    dataIndex: 'expirationDate',
    width: 150,
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    width: 85,
  },
  {
    title: 'Goods',
    dataIndex: 'goods',
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
];

const data = [];

for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    expirationDate: `Edward King ${i}`,
    weight: 32,
    goods: `good no. ${i}`,
  });
}

const AppK = () => (
  <Table
    columns={columns}
    dataSource={data}
    pagination={{
      pageSize: 10,
    }}
    scroll={{
      y: 240,
    }}
  />
);

export default AppK;
