import React from 'react';
import { Card } from 'react-native-paper';
import { ProgressChart } from 'react-native-chart-kit';

const ProgressCard = () => {

  const data = {
    data: [0.8],
    strokeWidth: 10,
    radius: 25,
    color: (opacity = 1) => `rgba(28, 151, 130, ${opacity})`,
  };
  
  return (
    <Card mode='contained' style={{width: 236, height: 90, marginRight:10, borderRadius: 20, backgroundColor: '#ECF6FF'}}>
      <Card.Content style={{justifyContent:'flex-end'}}>
        <ProgressChart style={{paddingTop:10}}
          data={data}
          width={80}
          height={80}
          strokeWidth={data.strokeWidth}
          radius={data.radius}
          chartConfig={{
            backgroundGradientFrom: '#ECF6FF',
            backgroundGradientTo: '#ECF6FF',
            color: data.color,
            }}
          hideLegend={true}
          
        />
      </Card.Content>
    </Card>
  );
};

export default ProgressCard;
