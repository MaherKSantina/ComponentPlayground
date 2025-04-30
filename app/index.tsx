import React from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useScreensWebSocket } from '@/hooks/useScreensWebSocket';
import { useScreensStore, Screen } from '@/stores/useScreensStore';

export default function IndexScreen() {
  useScreensWebSocket();
  const screens = useScreensStore((s) => s.screens);
  const router = useRouter();

  const renderItem = ({ item }: { item: Screen }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        console.log(item.key)
        router.push(`/${item.key}`)
      }}
    >
      <View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={screens}
      keyExtractor={(s) => s.key}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<Text style={styles.empty}>No screens yet…</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  row: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  title: { fontSize: 18, fontWeight: '600' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 40, color: '#999' },
});
