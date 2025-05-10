import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { recipients } from '../../utils/mockData';

export default function DonateScreen() {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState(recipients[0]);
  const [step, setStep] = useState(1);
  const [donationComplete, setDonationComplete] = useState(false);

  const presetAmounts = [10, 50, 100, 500, 1000];

  const handleSelectPreset = (value: number) => {
    setAmount(value.toString());
  };

  const handleNext = () => {
    if (step === 1 && amount && parseInt(amount) > 0) {
      setStep(2);
    } else if (step === 2) {
      // In a real app, process payment here
      setStep(3);
      setTimeout(() => {
        setDonationComplete(true);
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetDonation = () => {
    setStep(1);
    setAmount('');
    setMessage('');
    setDonationComplete(false);
  };

  const renderStep1 = () => (
    <Animated.View entering={FadeIn} style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Choose an amount</Text>
      <Text style={styles.stepDescription}>
        Every donation, no matter how small, makes a difference.
      </Text>
      
      <View style={styles.presetContainer}>
        {presetAmounts.map((preset) => (
          <TouchableOpacity
            key={preset}
            style={[
              styles.presetButton,
              parseInt(amount) === preset && styles.selectedPreset,
            ]}
            onPress={() => handleSelectPreset(preset)}
          >
            <Text style={[
              styles.presetText,
              parseInt(amount) === preset && styles.selectedPresetText,
            ]}>
              ₹{preset}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.customLabel}>Or enter a custom amount:</Text>
      <View style={styles.customAmountContainer}>
        <Text style={styles.currencySymbol}>₹</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          keyboardType="number-pad"
          maxLength={7}
        />
      </View>
      
      <Text style={styles.recipientSectionTitle}>Who are you helping today?</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recipientListContainer}
      >
        {recipients.map((recipient) => (
          <TouchableOpacity
            key={recipient.id}
            style={[
              styles.recipientCard,
              selectedRecipient.id === recipient.id && styles.selectedRecipientCard,
            ]}
            onPress={() => setSelectedRecipient(recipient)}
          >
            <Image source={{ uri: recipient.imageUrl }} style={styles.recipientImage} />
            <View style={styles.recipientCardContent}>
              <Text style={styles.recipientName}>{recipient.name}</Text>
              <Text style={styles.recipientCategory}>{recipient.category}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );

  const renderStep2 = () => (
    <Animated.View entering={FadeIn} style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Add a personal message</Text>
      <Text style={styles.stepDescription}>
        Your words can inspire hope and strength. Optional but appreciated.
      </Text>
      
      <View style={styles.selectedRecipientContainer}>
        <Image source={{ uri: selectedRecipient.imageUrl }} style={styles.selectedRecipientImage} />
        <View style={styles.selectedRecipientInfo}>
          <Text style={styles.selectedRecipientName}>{selectedRecipient.name}</Text>
          <Text style={styles.selectedRecipientQuote}>"{selectedRecipient.quote}"</Text>
        </View>
      </View>
      
      <Text style={styles.donationSummary}>
        Your donation: <Text style={styles.donationAmount}>₹{amount}</Text>
      </Text>
      
      <TextInput
        style={styles.messageInput}
        value={message}
        onChangeText={setMessage}
        placeholder="Write a message of encouragement (optional)"
        multiline
        maxLength={150}
      />
      
      <View style={styles.paymentInfoContainer}>
        <Text style={styles.paymentInfoTitle}>Payment Information</Text>
        <Text style={styles.paymentInfoDescription}>
          In a real app, this would securely collect payment information.
        </Text>
        {/* Mock payment fields would go here */}
      </View>
    </Animated.View>
  );

  const renderStep3 = () => (
    <Animated.View entering={FadeIn} style={styles.stepContainer}>
      {donationComplete ? (
        <View style={styles.confirmationContainer}>
          <View style={styles.heartIconContainer}>
            <Heart size={48} color="white" />
          </View>
          <Text style={styles.thankYouTitle}>Thank You!</Text>
          <Text style={styles.confirmationMessage}>
            Your donation of ₹{amount} to {selectedRecipient.name} has been processed.
            Your generosity will make a real difference.
          </Text>
          
          <View style={styles.impactContainer}>
            <Text style={styles.impactTitle}>Your Impact</Text>
            <Text style={styles.impactMessage}>
              You've helped someone take a step closer to a better life.
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={() => {/* Share functionality would go here */}}
          >
            <Text style={styles.shareButtonText}>Share Your Impact</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.donateAgainButton}
            onPress={resetDonation}
          >
            <Text style={styles.donateAgainText}>Donate Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.processingContainer}>
          <Text style={styles.processingText}>Processing your donation...</Text>
          {/* In a real app, add a loading animation here */}
        </View>
      )}
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </ScrollView>
      
      {step < 3 && (
        <View style={styles.navigationContainer}>
          {step > 1 && (
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={handleBack}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[
              styles.nextButton,
              (step === 1 && (!amount || parseInt(amount) <= 0)) && styles.disabledButton
            ]}
            onPress={handleNext}
            disabled={step === 1 && (!amount || parseInt(amount) <= 0)}
          >
            <Text style={styles.nextButtonText}>{step === 2 ? 'Donate Now' : 'Next'}</Text>
          </TouchableOpacity>
        </View>
      )}
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
    paddingBottom: 100, // Space for navigation buttons
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.light.text,
    marginBottom: Layout.spacing.sm,
  },
  stepDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.neutral,
    marginBottom: Layout.spacing.lg,
    lineHeight: 22,
  },
  presetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.lg,
  },
  presetButton: {
    backgroundColor: Colors.light.backgroundSecondary,
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.round,
    marginBottom: Layout.spacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
    width: '30%',
  },
  selectedPreset: {
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.primary,
  },
  presetText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.light.neutral,
    textAlign: 'center',
  },
  selectedPresetText: {
    color: Colors.light.primary,
  },
  customLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: Layout.spacing.sm,
  },
  customAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  currencySymbol: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    color: Colors.light.neutral,
  },
  amountInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    color: Colors.light.text,
    padding: Layout.spacing.md,
  },
  recipientSectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.light.text,
    marginTop: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
  },
  recipientListContainer: {
    paddingTop: Layout.spacing.xs,
    paddingBottom: Layout.spacing.md,
  },
  recipientCard: {
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    width: 150,
    marginRight: Layout.spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  selectedRecipientCard: {
    borderColor: Colors.light.primary,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  recipientImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  recipientCardContent: {
    padding: Layout.spacing.sm,
  },
  recipientName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 2,
  },
  recipientCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.light.neutral,
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Layout.spacing.md,
    backgroundColor: Colors.light.background,
    borderTopWidth: 1,
    borderTopColor: Colors.light.cardBorder,
  },
  backButton: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.round,
    borderWidth: 1,
    borderColor: Colors.light.neutral,
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.light.neutral,
  },
  nextButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.xl,
    borderRadius: Layout.borderRadius.round,
    flex: 1,
    marginLeft: Layout.spacing.md,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.light.neutralLight,
  },
  nextButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'white',
  },
  selectedRecipientContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.lg,
  },
  selectedRecipientImage: {
    width: 60,
    height: 60,
    borderRadius: Layout.borderRadius.md,
    marginRight: Layout.spacing.md,
  },
  selectedRecipientInfo: {
    flex: 1,
  },
  selectedRecipientName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 4,
  },
  selectedRecipientQuote: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.light.text,
  },
  donationSummary: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: Layout.spacing.md,
  },
  donationAmount: {
    fontFamily: 'Inter-Bold',
    color: Colors.light.primary,
  },
  messageInput: {
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.text,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: Layout.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  paymentInfoContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  paymentInfoTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: Layout.spacing.sm,
  },
  paymentInfoDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.neutral,
    lineHeight: 20,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  processingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: Colors.light.text,
  },
  confirmationContainer: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl,
  },
  heartIconContainer: {
    backgroundColor: Colors.light.primary,
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  thankYouTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: Colors.light.text,
    marginBottom: Layout.spacing.md,
  },
  confirmationMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: Layout.spacing.xl,
    lineHeight: 24,
    paddingHorizontal: Layout.spacing.md,
  },
  impactContainer: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    width: '100%',
    marginBottom: Layout.spacing.xl,
  },
  impactTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: Layout.spacing.sm,
  },
  impactMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 22,
  },
  shareButton: {
    backgroundColor: Colors.light.secondary,
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.xl,
    borderRadius: Layout.borderRadius.round,
    marginBottom: Layout.spacing.md,
    width: '100%',
    alignItems: 'center',
  },
  shareButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'white',
  },
  donateAgainButton: {
    backgroundColor: 'transparent',
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.round,
    borderWidth: 1,
    borderColor: Colors.light.neutral,
  },
  donateAgainText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.neutral,
  },
});