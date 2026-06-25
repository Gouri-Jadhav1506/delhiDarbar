import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inquirySchema, type InquiryFormData } from '@delhidarbar/types';

/**
 * Inquiry Modal — Lead Capture Form
 *
 * Opens when the user taps "Enquire Now" on any product in Spice n Blish.
 * Uses the SHARED Zod schema from @delhidarbar/types for validation.
 * Submits a POST to the Node.js Gateway — NO payment, NO cart.
 *
 * CRITICAL: This is a lead-generation form ONLY.
 */

const API_BASE_URL = 'http://localhost:8000';

export default function InquiryModal() {
  const { productId, productName } = useLocalSearchParams<{
    productId: string;
    productName: string;
  }>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (formData: InquiryFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/enquire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: formData,
          productId: productId ?? 'unknown',
          productName: productName ?? 'Unknown Product',
          brand: 'spicenblish',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message ?? `Server error: ${response.status}`);
      }

      Alert.alert(
        '✅ Inquiry Sent!',
        `Thank you! We've received your inquiry about "${productName}". Our team will reach out to you shortly.`,
        [
          {
            text: 'Done',
            onPress: () => {
              reset();
              router.back();
            },
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        'Something went wrong',
        error instanceof Error
          ? error.message
          : 'Please try again later or call us directly.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-Deep-Teal"
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 48 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Product Context ── */}
        <View className="bg-Dark-Cyan-Green rounded-2xl p-5 mb-6 border border-white/10">
          <Text className="text-spice-rose text-xs uppercase tracking-widest mb-1">
            Enquiring about
          </Text>
          <Text className="text-white text-xl font-bold">
            {productName ?? 'Product'}
          </Text>
        </View>

        {/* ── Form Fields ── */}

        {/* Name */}
        <View className="mb-5">
          <Text className="text-white text-sm font-semibold mb-2">
            Full Name <Text className="text-spice-rose">*</Text>
          </Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-Dark-Cyan-Green rounded-xl px-4 py-3.5 text-white text-base border ${
                  errors.name ? 'border-spice-rose' : 'border-white/10'
                }`}
                placeholder="Enter your full name"
                placeholderTextColor="#888"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="words"
              />
            )}
          />
          {errors.name && (
            <Text className="text-spice-rose text-xs mt-1.5 ml-1">
              {errors.name.message}
            </Text>
          )}
        </View>

        {/* Phone */}
        <View className="mb-5">
          <Text className="text-white text-sm font-semibold mb-2">
            Phone Number <Text className="text-spice-rose">*</Text>
          </Text>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-Dark-Cyan-Green rounded-xl px-4 py-3.5 text-white text-base border ${
                  errors.phone ? 'border-spice-rose' : 'border-white/10'
                }`}
                placeholder="10-digit mobile number"
                placeholderTextColor="#888"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="phone-pad"
                maxLength={10}
              />
            )}
          />
          {errors.phone && (
            <Text className="text-spice-rose text-xs mt-1.5 ml-1">
              {errors.phone.message}
            </Text>
          )}
        </View>

        {/* Email */}
        <View className="mb-5">
          <Text className="text-white text-sm font-semibold mb-2">
            Email Address <Text className="text-spice-rose">*</Text>
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-Dark-Cyan-Green rounded-xl px-4 py-3.5 text-white text-base border ${
                  errors.email ? 'border-spice-rose' : 'border-white/10'
                }`}
                placeholder="you@example.com"
                placeholderTextColor="#888"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && (
            <Text className="text-spice-rose text-xs mt-1.5 ml-1">
              {errors.email.message}
            </Text>
          )}
        </View>

        {/* Message */}
        <View className="mb-8">
          <Text className="text-white text-sm font-semibold mb-2">
            Message <Text className="text-Gray">(optional)</Text>
          </Text>
          <Controller
            control={control}
            name="message"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-Dark-Cyan-Green rounded-xl px-4 py-3.5 text-white text-base border ${
                  errors.message ? 'border-spice-rose' : 'border-white/10'
                }`}
                placeholder="Any specific requirements or questions..."
                placeholderTextColor="#888"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                style={{ minHeight: 100 }}
              />
            )}
          />
          {errors.message && (
            <Text className="text-spice-rose text-xs mt-1.5 ml-1">
              {errors.message.message}
            </Text>
          )}
        </View>

        {/* ── Submit Button ── */}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className={`rounded-2xl py-4 items-center ${
            isSubmitting ? 'bg-spice-rose/50' : 'bg-spice-rose active:opacity-80'
          }`}
        >
          {isSubmitting ? (
            <View className="flex-row items-center gap-2">
              <ActivityIndicator color="#fff" size="small" />
              <Text className="text-white font-bold text-base">Submitting...</Text>
            </View>
          ) : (
            <Text className="text-white font-bold text-base uppercase tracking-wider">
              Send Inquiry
            </Text>
          )}
        </Pressable>

        {/* ── Disclaimer ── */}
        <Text className="text-Gray text-xs text-center mt-4 leading-4">
          By submitting, you agree to be contacted by our team regarding your
          inquiry. No payment is required.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
