import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

const EmployeeList = () => {
  const [text, setText] = useState<string>('');
  const route = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
        <View style={styles.searchBar}>
          <Feather name="search" size={24} color="grey" />
          <TextInput
            placeholder="search"
            value={text}
            onChangeText={(text) => setText(text)}
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.addUserBtn} onPress={() => route.push('/CreateUser')}>
          <AntDesign name="adduser" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EmployeeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    gap: 10,
    borderRadius: 15,
  },
  input: {
    width: '85%',
  },
  addUserBtn: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40 / 2,
    backgroundColor: '#D3D3D3',
  },
});
