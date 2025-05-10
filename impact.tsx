import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Users, Coins, Award } from 'lucide-react-native';
import { userDonations, recipients, userBadges } from '../../utils/mockData';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import ImpactMetric from '../../components/ImpactMetric';
import BadgeCard from '../../components/BadgeCard';
import DonationHistoryCard from '../../components/DonationHistoryCard';

export default function ImpactScreen() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const totalDonated = userDonations.reduce((sum, donation) => sum + donation.amount, 0);
  const peopleHelped = new Set(userDonations.map(d => d.recipientId)).size;
  
  const getRecipientName = (recipientId: string) => {
    const recipient = recipients.find(r => r.id === recipientId);
    return recipient ? recipient.name : 'Unknown';
  };

  const renderOverview = () => (
    <View style={styles.overviewContainer}>
      <View style={styles.impactHeader}>
        <Text style={styles.impactTitle}>Your Impact</Text>
        <Text style={styles.impactSubtitle}>
          See the difference you've made in people's lives
        </Text>
      </View>
      
      <View style={styles.metricsContainer}>
        <ImpactMetric 
          value={`₹${totalDonated}`} 
          label="Total Donated"
          icon={<Coins size={20} color={Colors.light.primary} />}
          delay={100}
        />
        <ImpactMetric 
          value={peopleHelped} 
          label="People Helped"
          icon={<Users size={20} color={Colors.light.primary} />}
          delay={300}
        />
        <ImpactMetric 
          value={userBadges.filter(b => b.earned).length} 
          label="Badges Earned"
          icon={<Award size={20} color={Colors.light.primary} />}
          delay={500}
        />
      </View>
      
      <Text style={styles.sectionTitle}>
        Recent Impact
      </Text>
      
      <View style={styles.recentImpactContainer}>
        <Text style={styles.impactMessage}>
          Your donations have helped fund education for 2 children and medical
          treatment for a family in need.
        </Text>
      </View>
      
      <Text style={styles.sectionTitle}>
        Your Badges
      </Text>
      
      <View style={styles.badgesContainer}>
        {userBadges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </View>
    </View>
  );

  const renderHistory = () => (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>Donation History</Text>
      
      <View style={styles.donationsContainer}>
        {userDonations.length > 0 ? (
          userDonations.map((donation) => (
            <DonationHistoryCard
              key={donation.id}
              donation={donation}
              recipientName={getRecipientName(donation.recipientId)}
            />
          ))
        ) : (
          <Text style={styles.emptyStateText}>
            You haven't made any donations yet. Start making an impact today!
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.tabsContainer}>
        <View
          style={[
            styles.tabButton,
            activeTab === 'overview' && styles.activeTab,
          ]}
          onTouchEnd={() => setActiveTab('overview')}
        >
          <Heart
            size={18}
            color={
              activeTab === 'overview'
                ? Colors.light.primary
                : Colors.light.neutral
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'overview' && styles.activeTabText,
            ]}
          >
            Overview
          </Text>
        </View>
        <View
          style={[
            styles.tabButton,
            activeTab === 'history' && styles.activeTab,
          ]}
          onTouchEnd={() => setActiveTab('history')}
        >
          <Coins
            size={18}
            color={
              activeTab === 'history'
                ? Colors.light.primary
                : Colors.light.neutral
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'history' && styles.activeTabText,
            ]}
          >
            History
          </Text>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {activeTab === 'overview' ? renderOverview() : renderHistory()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContainer: {
    padding: Layout.spacing.md,
    paddingBottom: Layout.spacing.xl,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.cardBorder,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    marginRight: Layout.spacing.md,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.primary,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.neutral,
    marginLeft: Layout.spacing.xs,
  },
  activeTabText: {
    color: Colors.light.primary,
  },
  overviewContainer: {
    flex: 1,
  },
  impactHeader: {
    marginBottom: Layout.spacing.lg,
  },
  impactTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.light.text,
    marginBottom: Layout.spacing.xs,
  },
  impactSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.neutral,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: Layout.spacing.md,
  },
  recentImpactContainer: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.xl,
  },
  impactMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 22,
  },
  badgesContainer: {
    marginBottom: Layout.spacing.xl,
  },
  historyContainer: {
    flex: 1,
  },
  historyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.light.text,
    marginBottom: Layout.spacing.lg,
  },
  donationsContainer: {
    marginBottom: Layout.spacing.xl,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.neutral,
    textAlign: 'center',
    padding: Layout.spacing.xl,
  },
});