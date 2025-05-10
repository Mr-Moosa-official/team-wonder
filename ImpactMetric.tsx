import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

interface ImpactMetricProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  delay?: number;
}

const ImpactMetric: React.FC<ImpactMetricProps> = ({ 
  value, 
  label, 
  icon, 
  delay = 0 
}) => {
  return (
    <Animated.View 
      style={styles.container}
      entering={[FadeIn.delay(delay), ZoomIn.delay(delay)]}
    >
      <View style={styles.valueContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  iconContainer: {
    marginRight: Layout.spacing.xs,
  },
  value: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: Colors.light.primary,
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.neutral,
    textAlign: 'center',
  },
});

export default ImpactMetric;