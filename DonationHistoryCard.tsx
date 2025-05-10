import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar } from 'lucide-react-native';
import { Donation } from '../utils/mockData';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

interface DonationHistoryCardProps {
  donation: Donation;
  recipientName: string;
}

const DonationHistoryCard: React.FC<DonationHistoryCardProps> = ({ 
  donation, 
  recipientName 
}) => {
  const router = useRouter();
  const { recipientId, amount, date, message } = donation;

  const handlePress = () => {
    router.push({
      pathname: '/recipient/[id]',
      params: { id: recipientId }
    });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatCurrency = (value: number) => {
    return '₹' + value.toLocaleString('en-IN');
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <Text style={styles.amount}>{formatCurrency(amount)}</Text>
        <View style={styles.dateContainer}>
          <Calendar size={12} color={Colors.light.neutral} />
          <Text style={styles.date}>{formatDate(date)}</Text>
        </View>
      </View>
      <View style={styles.recipientContainer}>
        <Text style={styles.recipientLabel}>To:</Text>
        <Text style={styles.recipientName}>{recipientName}</Text>
      </View>
      {message && (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>"{message}"</Text>
        </View>
      )}
      <View style={styles.impactContainer}>
        <Text style={styles.impactText}>Thank you for making a difference!</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  amount: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.light.text,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.light.neutral,
    marginLeft: Layout.spacing.xs,
  },
  recipientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  recipientLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.neutral,
    marginRight: Layout.spacing.xs,
  },
  recipientName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.text,
  },
  messageContainer: {
    backgroundColor: Colors.light.backgroundSecondary,
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.sm,
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.light.text,
  },
  impactContainer: {
    paddingTop: Layout.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.light.cardBorder,
  },
  impactText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.light.success,
    textAlign: 'center',
  },
});

export default DonationHistoryCard;