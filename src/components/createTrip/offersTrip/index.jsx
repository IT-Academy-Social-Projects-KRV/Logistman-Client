import { Table } from 'antd';

const offerColumns = [
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

const offerData = [];

for (let i = 0; i < 100; i++) {
  offerData.push({
    key: i,
    expirationDate: `Edward King ${i}`,
    weight: 32,
    goods: `good no. ${i}`,
  });
}

const AppK = () => (
  <Table
      drg
    columns={offerColumns}
    dataSource={offerData}
    pagination={{
      pageSize: 10,
    }}
    scroll={{
      y: 240,
    }}
  />
);

export default AppK;
