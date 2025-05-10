import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { MapPin } from 'lucide-react-native';
import { Recipient } from '../utils/mockData';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import DonationProgress from './DonationProgress';

interface StoryCardProps {
  recipient: Recipient;
  index: number;
  featured?: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({ recipient, index, featured = false }) => {
  const router = useRouter();
  const { name, age, location, imageUrl, quote, category, goal, raised } = recipient;
  
  const handlePress = () => {
    router.push({
      pathname: '/recipient/[id]',
      params: { id: recipient.id }
    });
  };

  const containerStyle = featured 
    ? [styles.container, styles.featuredContainer] 
    : styles.container;
    
  const imageStyle = featured 
    ? styles.featuredImage 
    : styles.image;

  return (
    <Animated.View 
      entering={FadeInRight.delay(index * 200).springify()}
      style={containerStyle}
    >
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={handlePress}
        style={styles.touchable}
      >
        <Image source={{ uri: imageUrl }} style={imageStyle} />
        <View style={styles.contentContainer}>
          {featured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>Story of the Day</Text>
            </View>
          )}
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{category}</Text>
          </View>
          <Text style={styles.name}>{name}, {age}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={Colors.light.neutral} />
            <Text style={styles.location}>{location}</Text>
          </View>
          <Text numberOfLines={featured ? 3 : 2} style={styles.quote}>"{quote}"</Text>
          <DonationProgress raised={raised} goal={goal} showAmount />
          <View style={styles.donateButton}>
            <Text style={styles.donateText}>Donate Now</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    marginBottom: Layout.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  featuredContainer: {
    marginBottom: Layout.spacing.lg,
  },
  touchable: {
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  featuredImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: Layout.spacing.md,
  },
  featuredBadge: {
    position: 'absolute',
    top: -Layout.spacing.md - 12,
    left: Layout.spacing.md,
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.round,
  },
  featuredText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  categoryContainer: {
    backgroundColor: Colors.light.backgroundSecondary,
    alignSelf: 'flex-start',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.round,
    marginBottom: Layout.spacing.xs,
  },
  category: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.light.secondary,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: Layout.spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.neutral,
    marginLeft: Layout.spacing.xs,
  },
  quote: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: Colors.light.text,
    fontStyle: 'italic',
    marginBottom: Layout.spacing.md,
    lineHeight: 22,
  },
  donateButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.round,
    alignItems: 'center',
    marginTop: Layout.spacing.md,
  },
  donateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'white',
  },
});

export default StoryCard;