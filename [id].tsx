import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MapPin, Share2, Check, FileText } from 'lucide-react-native';
import { recipients } from '../../utils/mockData';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import DonationProgress from '../../components/DonationProgress';

export default function RecipientProfile() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('story');
  
  const recipient = recipients.find(r => r.id === id);
  
  if (!recipient) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Recipient not found</Text>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const { 
    name, 
    age, 
    location, 
    imageUrl, 
    story, 
    quote, 
    category, 
    goal, 
    raised, 
    verifiedBy,
    updates,
    documents
  } = recipient;
  
  const progress = raised / goal;
  
  const renderStory = () => (
    <View style={styles.tabContent}>
      <Text style={styles.quote}>"{quote}"</Text>
      <Text style={styles.storyText}>{story}</Text>
    </View>
  );
  
  const renderUpdates = () => (
    <View style={styles.tabContent}>
      {updates && updates.length > 0 ? (
        updates.map((update, index) => (
          <View key={index} style={styles.updateContainer}>
            <Text style={styles.updateDate}>{update.date}</Text>
            <Text style={styles.updateMessage}>{update.message}</Text>
            {update.imageUrl && (
              <Image source={{ uri: update.imageUrl }} style={styles.updateImage} />
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noContentText}>
          No updates available yet. Check back soon!
        </Text>
      )}
    </View>
  );
  
  const renderDocuments = () => (
    <View style={styles.tabContent}>
      {documents && documents.length > 0 ? (
        documents.map((document, index) => (
          <TouchableOpacity key={index} style={styles.documentButton}>
            <FileText size={20} color={Colors.light.text} />
            <Text style={styles.documentText}>
              Document {index + 1}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noContentText}>
          No documents are currently available for viewing.
        </Text>
      )}
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backIconButton} 
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={Colors.light.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareIconButton}>
            <Share2 size={20} color={Colors.light.text} />
          </TouchableOpacity>
        </View>
        
        <Image source={{ uri: imageUrl }} style={styles.heroImage} />
        
        <View style={styles.profileContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
          
          <Text style={styles.name}>{name}, {age}</Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={16} color={Colors.light.neutral} />
            <Text style={styles.location}>{location}</Text>
          </View>
          
          <View style={styles.verificationContainer}>
            <Check size={16} color={Colors.light.success} />
            <Text style={styles.verificationText}>
              Verified by {verifiedBy}
            </Text>
          </View>
          
          <View style={styles.progressContainer}>
            <DonationProgress 
              raised={raised} 
              goal={goal} 
              showAmount 
              large 
            />
          </View>
          
          <TouchableOpacity 
            style={styles.donateButton}
            onPress={() => router.push('/donate')}
          >
            <Text style={styles.donateButtonText}>Donate Now</Text>
          </TouchableOpacity>
          
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[
                styles.tabButton, 
                activeTab === 'story' && styles.activeTab
              ]}
              onPress={() => setActiveTab('story')}
            >
              <Text style={[
                styles.tabButtonText,
                activeTab === 'story' && styles.activeTabText
              ]}>
                Story
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.tabButton, 
                activeTab === 'updates' && styles.activeTab
              ]}
              onPress={() => setActiveTab('updates')}
            >
              <Text style={[
                styles.tabButtonText,
                activeTab === 'updates' && styles.activeTabText
              ]}>
                Updates
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.tabButton, 
                activeTab === 'documents' && styles.activeTab
              ]}
              onPress={() => setActiveTab('documents')}
            >
              <Text style={[
                styles.tabButtonText,
                activeTab === 'documents' && styles.activeTabText
              ]}>
                Documents
              </Text>
            </TouchableOpacity>
          </View>
          
          {activeTab === 'story' && renderStory()}
          {activeTab === 'updates' && renderUpdates()}
          {activeTab === 'documents' && renderDocuments()}
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
    paddingBottom: Layout.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: Layout.spacing.md,
    left: Layout.spacing.md,
    right: Layout.spacing.md,
    zIndex: 10,
  },
  backIconButton: {
    backgroundColor: Colors.light.card,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shareIconButton: {
    backgroundColor: Colors.light.card,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  profileContainer: {
    paddingHorizontal: Layout.spacing.md,
    paddingTop: Layout.spacing.lg,
  },
  categoryContainer: {
    backgroundColor: Colors.light.backgroundSecondary,
    alignSelf: 'flex-start',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.round,
    marginBottom: Layout.spacing.xs,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.light.secondary,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.light.text,
    marginBottom: Layout.spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.neutral,
    marginLeft: Layout.spacing.xs,
  },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  verificationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.success,
    marginLeft: Layout.spacing.xs,
  },
  progressContainer: {
    marginBottom: Layout.spacing.lg,
  },
  donateButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.round,
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  donateButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: 'white',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.cardBorder,
    marginBottom: Layout.spacing.lg,
  },
  tabButton: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    marginRight: Layout.spacing.md,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.primary,
  },
  tabButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.neutral,
  },
  activeTabText: {
    color: Colors.light.primary,
  },
  tabContent: {
    marginBottom: Layout.spacing.xl,
  },
  quote: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    fontStyle: 'italic',
    color: Colors.light.text,
    marginBottom: Layout.spacing.md,
    lineHeight: 26,
  },
  storyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 24,
  },
  updateContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  updateDate: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.neutral,
    marginBottom: Layout.spacing.xs,
  },
  updateMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: Layout.spacing.sm,
    lineHeight: 22,
  },
  updateImage: {
    width: '100%',
    height: 180,
    borderRadius: Layout.borderRadius.md,
    resizeMode: 'cover',
  },
  documentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  documentText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.text,
    marginLeft: Layout.spacing.sm,
  },
  noContentText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.neutral,
    textAlign: 'center',
    padding: Layout.spacing.xl,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  notFoundText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: Layout.spacing.lg,
  },
  backButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.round,
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'white',
  },
});