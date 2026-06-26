import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function DisclaimerScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FEA116" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('disclaimer.header', 'Disclaimer')}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{t('disclaimer.genInfo', 'General Information')}</Text>
          <Text style={styles.paragraph}>
            {t('disclaimer.genInfoText', 'The information provided by this application ("we," "us," or "our") is for general informational purposes only. All information on the application is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the application.')}
          </Text>

          <Text style={styles.heading}>{t('disclaimer.prodList', 'Product Listing & Availability')}</Text>
          <Text style={styles.paragraph}>
            {t('disclaimer.prodListText', 'This application acts as a digital catalog for browsing products. The displaying of products does not constitute a legally binding offer. Prices, availability, and product descriptions are subject to change without notice. We reserve the right to modify or discontinue any product at any time.')}
          </Text>

          <Text style={styles.heading}>{t('disclaimer.inquiries', 'Inquiries & Communications')}</Text>
          <Text style={styles.paragraph}>
            {t('disclaimer.inquiriesText', 'All inquiries and communications initiated through our "Chat on WhatsApp" feature are subject to standard messaging and data rates applied by your service provider. We are not responsible for any delays, failures, or issues related to third-party messaging services.')}
          </Text>

          <Text style={styles.heading}>{t('disclaimer.links', 'External Links')}</Text>
          <Text style={styles.paragraph}>
            {t('disclaimer.linksText', 'The application may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy by us, and we do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites.')}
          </Text>

          <Text style={styles.heading}>{t('disclaimer.liability', 'Limitation of Liability')}</Text>
          <Text style={styles.paragraph}>
            {t('disclaimer.liabilityText', 'Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the application or reliance on any information provided on the application. Your use of the application and your reliance on any information on the application is solely at your own risk.')}
          </Text>
          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#042D31',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 24 : 54,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  textContainer: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FEA116',
    marginBottom: 12,
    marginTop: 24,
  },
  paragraph: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 24,
    marginBottom: 8,
  },
});
