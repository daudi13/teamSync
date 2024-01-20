import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

type Props = {
  input: string;
  employee: any;
};

const Results = ({ input, employee }: Props) => {
  console.log(employee);

  return (
    <View>
      <FlatList
        data={employee}
        renderItem={({ item }: any) => {
          if (item?.employeeName?.toLowerCase().includes(input.toLowerCase())) {
            return (
              <View>
                <View>
                  <Text>{item?.employeeName?.charAt(0)}</Text>
                </View>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({});
