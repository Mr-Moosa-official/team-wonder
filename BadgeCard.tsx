import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Heart, Book, Calendar, Users } from 'lucide-react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Badge } from '../utils/mockData';

interface BadgeCardProps {
  badge: Badge;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge }) => {
  const { name, description, icon, earned } = badge;
  
  const getIcon = () => {
    switch (icon) {
      case 'heart':
        return <Heart size={24} color={earned ? Colors.light.primary : Colors.light.neutralLight} />;
      case 'book':
        return <Book size={24} color={earned ? Colors.light.primary : Colors.light.neutralLight} />;
      case 'calendar':
        return <Calendar size={24} color={earned ? Colors.light.primary : Colors.light.neutralLight} />;
      case 'users':
        return <Users size={24} color={earned ? Colors.light.primary : Colors.light.neutralLight} />;
      default:
        return <Heart size={24} color={earned ? Colors.light.primary : Colors.light.neutralLight} />;
    }
  };

  return (
    <View style={[styles.container, !earned && styles.unearned]}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.name, !earned && styles.unearnedText]}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {earned ? (
        <View style={styles.earnedBadge}>
          <Text style={styles.earnedText}>Earned</Text>
        </View>
      ) : (
        <View style={styles.lockedBadge}>
          <Text style={styles.lockedText}>Locked</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
  unearned: {
    opacity: 0.7,
  },
  iconContainer: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: Layout.borderRadius.round,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  contentContainer: {
    flex: 1,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 2,
  },
  unearnedText: {
    color: Colors.light.neutral,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.neutral,
  },
  earnedBadge: {
    backgroundColor: Colors.light.success,
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.round,
  },
  earnedText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: 'white',
  },
  lockedBadge: {
    backgroundColor: Colors.light.neutralLight,
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.round,
  },
  lockedText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.light.neutral,
  },
});

export default BadgeCard;