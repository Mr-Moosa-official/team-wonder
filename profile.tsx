import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Settings, Bell, Share2, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

export default function ProfileScreen() {
  // Mock user data - in a real app this would come from authentication
  const user = {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    joinDate: 'January 2025',
  };

  const menuItems = [
    {
      icon: <Heart size={20} color={Colors.light.text} />,
      title: 'Saved Stories',
      badge: '3',
    },
    {
      icon: <Bell size={20} color={Colors.light.text} />,
      title: 'Notifications',
      badge: '5',
    },
    {
      icon: <Settings size={20} color={Colors.light.text} />,
      title: 'Account Settings',
    },
    {
      icon: <Share2 size={20} color={Colors.light.text} />,
      title: 'Invite Friends',
    },
    {
      icon: <HelpCircle size={20} color={Colors.light.text} />,
      title: 'Help & Support',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.profileHeader}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.joinDate}>Member since {user.joinDate}</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹1,500</Text>
            <Text style={styles.statLabel}>Total Given</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>People Helped</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Badges Earned</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.donateAgainButton}>
          <Text style={styles.donateAgainText}>Find More People to Help</Text>
        </TouchableOpacity>
        
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Preferences</Text>
        </View>
        
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuIconContainer}>{item.icon}</View>
              <Text style={styles.menuItemText}>{item.title}</Text>
              {item.badge && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color={Colors.light.error} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            give hope - Small Amounts. Big Change.
          </Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: Layout.spacing.lg,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.light.text,
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.neutral,
    marginBottom: 4,
  },
  joinDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.light.neutral,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    paddingVertical: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.light.cardBorder,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.light.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.light.neutral,
  },
  donateAgainButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: Layout.borderRadius.round,
    paddingVertical: Layout.spacing.md,
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  donateAgainText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'white',
  },
  sectionTitle: {
    marginBottom: Layout.spacing.md,
  },
  sectionTitleText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.light.text,
  },
  menuContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: Layout.spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.lg,
    paddingHorizontal: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.cardBorder,
  },
  menuIconContainer: {
    marginRight: Layout.spacing.md,
  },
  menuItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.light.text,
    flex: 1,
  },
  badgeContainer: {
    backgroundColor: Colors.light.primary,
    borderRadius: Layout.borderRadius.round,
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
  },
  badgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: 'white',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.md,
    marginBottom: Layout.spacing.xl,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.light.error,
    marginLeft: Layout.spacing.sm,
  },
  footer: {
    alignItems: 'center',
    marginTop: Layout.spacing.lg,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.neutral,
    marginBottom: 4,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.light.neutral,
  },
});