// TransactionItem.js
import React from 'react';
import { Text } from 'react-native';
import { List } from 'react-native-paper';

const transactionData = [
  { date: 'Marz 25, 24', type: 'abono', description: 'Carlos', amount: 70.0, iconColor: '#2DD683' },
  { date: 'Marz 18, 24', type: 'cargo', description: 'Homero', amount: -37.0, iconColor: '#E74A51' },
  { date: 'Marz 17, 24', type: 'cargo', description: 'Didi Food', amount: -365.0, iconColor: '#E74A51' },
  { date: 'Marz 15, 24', type: 'cargo', description: 'Oxxa', amount: -1500.0, iconColor: '#E74A51' },
  { date: 'Marz 10, 24', type: 'abono', description: 'Alann', amount: 123.0, iconColor: '#2DD683' },
];

const ArrowIcon = ({ direction, color }) => {
  const iconName = direction === 'up' ? 'arrow-up-thin' : 'arrow-down-thin';
  return <List.Icon color={color} icon={iconName} />;
};

const TransactionItem = ({ date, description, amount, type, iconColor }) => {
  return (
    <List.Item
      title={date}
      description={description}
      left={(props) => <ArrowIcon direction={type} color={iconColor} />}
      right={(props) => (
        <Text style={{ color: iconColor }}>${Math.abs(amount).toFixed(2)}</Text>
      )}
    />
  );
};

const TransactionList = () => {
  return (
    <>
      {transactionData.map((transaction, index) => (
        <TransactionItem
          key={index}
          date={transaction.date}
          description={transaction.description}
          amount={transaction.amount}
          type={transaction.type}
          iconColor={transaction.iconColor}
        />
      ))}
    </>
  );
};

export default TransactionList;