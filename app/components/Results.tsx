import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
              <TouchableOpacity style={styles.wrapper}>
                <View style={styles.boxContainer}>
                  <Text style={styles.boxText}>{item?.employeeName?.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={styles.name}>{item?.employeeName}</Text>
                  <Text>
                    {item?.designation} ({item?.employeeId})
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
        }}
      />
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 20,
  },
  boxContainer: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'cyan',
    marginBottom: 20,
    borderRadius: 10,
  },
  boxText: {
    fontSize: 21,
    fontWeight: '900',
    color: 'white',
  },
  name: {
    fontWeight: '700',
    fontSize: 17,
  },
});
