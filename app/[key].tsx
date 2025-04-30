import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useScreensStore } from '@/stores/useScreensStore';
import LayoutRenderer, { LayoutNode } from '@/components/LayoutRenderer';

type Params = { key: string };

export default function DetailScreen() {
  const { key } = useLocalSearchParams<Params>();
  const allScreens = useScreensStore((s) => s.screens);
  const navigation = useNavigation();

  

  const meta = allScreens.find((s) => s.key === key);

  useEffect(() => {
    navigation.setOptions({ title: meta.title });
  }, [key]);

  function getCode() {
    console.log(meta.code)
    if(typeof meta.code === "string") {
      return {type: "text", text: "Invalid"}
    } else {
      return meta.code
    }
  }

  if (!meta) {
    return (
      <View style={styles.center}>
        <Text>Screen “{key}” not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{meta.title}</Text>
      <LayoutRenderer layout={[getCode() as any as LayoutNode]}></LayoutRenderer>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 16 },
  description: { fontSize: 16, lineHeight: 22 },
});
