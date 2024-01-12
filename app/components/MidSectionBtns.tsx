import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  title: string;
  iconName: any;
};

const MidSectionBtns = ({ title, iconName }: Props) => {
  return (
    <TouchableOpacity style={styles.midSectionBtn}>
      <View style={styles.right}>
        <View style={styles.iconContainerSquare}>
          <Ionicons name={iconName} size={24} />
        </View>
        <Text>{title}</Text>
      </View>
      <View style={styles.iconContainerSquare}>
        <Ionicons name="chevron-forward-outline" size={24} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  midSectionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#7f7fd5',
    padding: 12,
    borderRadius: 10,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainerSquare: {
    width: 32,
    height: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

export default MidSectionBtns;
