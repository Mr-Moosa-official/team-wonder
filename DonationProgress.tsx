import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

interface DonationProgressProps {
  raised: number;
  goal: number;
  showAmount?: boolean;
  large?: boolean;
}

const DonationProgress: React.FC<DonationProgressProps> = ({ 
  raised, 
  goal, 
  showAmount = false,
  large = false 
}) => {
  const progress = raised / goal;
  const progressWidth = useSharedValue(0);
  
  useEffect(() => {
    progressWidth.value = withTiming(progress, { duration: 1000 });
  }, [progress]);
  
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value * 100}%`,
    };
  });

  const formatCurrency = (amount: number) => {
    return '₹' + amount.toLocaleString('en-IN');
  };

  return (
    <View style={styles.container}>
      {showAmount && (
        <View style={styles.amountContainer}>
          <Text style={[styles.raised, large && styles.largeText]}>
            {formatCurrency(raised)}
          </Text>
          <Text style={[styles.goal, large && styles.largeSubtext]}>
            of {formatCurrency(goal)}
          </Text>
        </View>
      )}
      <View style={[styles.progressContainer, large && styles.largeProgress]}>
        <Animated.View 
          style={[styles.progressBar, progressStyle, { backgroundColor: getProgressColor(progress) }]} 
        />
      </View>
      <Text style={[styles.percentText, large && styles.largeSubtext]}>
        {Math.round(progress * 100)}% funded
      </Text>
    </View>
  );
};

const getProgressColor = (progress: number) => {
  if (progress < 0.3) return Colors.light.error;
  if (progress < 0.7) return Colors.light.warning;
  return Colors.light.success;
};

const styles = StyleSheet.create({
  container: {
    marginTop: Layout.spacing.xs,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Layout.spacing.xs,
  },
  raised: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.light.text,
  },
  goal: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.neutral,
    marginLeft: Layout.spacing.xs,
  },
  progressContainer: {
    height: 8,
    backgroundColor: Colors.light.neutralLight,
    borderRadius: Layout.borderRadius.round,
    overflow: 'hidden',
  },
  largeProgress: {
    height: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: Layout.borderRadius.round,
  },
  percentText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.light.neutral,
    marginTop: Layout.spacing.xs,
  },
  largeText: {
    fontSize: 20,
  },
  largeSubtext: {
    fontSize: 16,
  }
});

export default DonationProgress;