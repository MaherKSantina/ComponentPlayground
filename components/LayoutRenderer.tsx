// components/LayoutRenderer.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';

export type LayoutNode = {
  type: 'vstack' | 'hstack' | 'text' | 'field' | 'urlImage';
  props?: {
    // common
    style?: ViewStyle | TextStyle | ImageStyle;
    // text-specific
    text?: string;
    // field-specific
    value?: string;
    placeholder?: string;
    onChangeText?: (text: string) => void;
    // image-specific
    uri?: string;
    [key: string]: any;
  };
  children?: LayoutNode[];
};

interface LayoutRendererProps {
  layout: LayoutNode[];
}

/**
 * Renders a tree of LayoutNode objects into React Native components.
 */
const LayoutRenderer: React.FC<LayoutRendererProps> = ({ layout }) => {
  return <>{layout.map((node, i) => renderNode(node, i))}</>;
};

function renderNode(node: LayoutNode, key: number): React.ReactNode {
  const { type, props = {}, children = [] } = node;

  switch (type) {
    case 'vstack':
      return (
        <View key={key} style={[styles.vstack, props.style]}>
          {children.map((child, idx) => renderNode(child, idx))}
        </View>
      );

    case 'hstack':
      return (
        <View key={key} style={[styles.hstack, props.style]}>
          {children.map((child, idx) => renderNode(child, idx))}
        </View>
      );

    case 'text':
      return (
        <Text key={key} style={[styles.text, props.style]}>
          {props.text}
        </Text>
      );

    case 'field':
      return (
        <TextInput
          key={key}
          style={[styles.field, props.style]}
          value={props.value}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          {...props}
        />
      );

    case 'urlImage':
      return (
        <Image
          key={key}
          source={{ uri: props.uri }}
          style={[styles.image, props.style]}
          {...props}
        />
      );

    default:
      return null;
  }
}

const styles = StyleSheet.create({
  vstack: {
    flexDirection: 'column',
  },
  hstack: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  field: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default LayoutRenderer;
