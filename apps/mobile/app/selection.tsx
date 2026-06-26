import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import spiceBlissLogo from '../assets/images/spice-bliss-logo.png';

export default function SplashScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleSelection = (section: string) => {
    if (section === 'ecommerce') {
      router.replace('/ecommerce/home');
    } else if (section === 'restaurant') {
      router.replace('/fulfillment');
    }

  };

  return (
    <View style={styles.container}>
      {/* Top decorative accent */}
      <View style={styles.topAccent} />

      {/* Header / Branding */}
      <View style={styles.header}>
        <View style={styles.logoWrap}>
          <Ionicons name="diamond" size={28} color="#042D31" />
        </View>
        <Text style={styles.brandName}>{t('selection.brand', 'DELHI DARBAR')}</Text>
        <View style={styles.ornamentRow}>
          <View style={styles.ornamentLine} />
          <Text style={styles.ornamentText}>{t('selection.est', 'EST. 1999')}</Text>
          <View style={styles.ornamentLine} />
        </View>
        <Text style={styles.tagline}>{t('selection.tagline', 'A World of Flavors & Scents')}</Text>
      </View>

      {/* Middle section */}
      <View style={styles.middle}>
        <Text style={styles.heading}>{t('selection.heading_line1', 'Choose Your')}{'\n'}{t('selection.heading_line2', 'Experience')}</Text>
        <Text style={styles.desc}>
          {t('selection.desc', 'Savor the rich flavors of India or shop the latest trends — all in one place.')}
        </Text>
      </View>

      {/* Action Cards */}
      <View style={styles.cardsArea}>
        {/* Restaurant Card */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => handleSelection('restaurant')}
        >
          <View style={styles.cardLeft}>
            <View style={styles.cardIcon}>
              <Ionicons name="restaurant" size={22} color="#042D31" />
            </View>
            <View>
              <Text style={styles.cardTitle}>{t('selection.skyline', 'Skyline')}</Text>
              <Text style={styles.cardSub}>{t('selection.skylineSub', 'Dine in · Events')}</Text>
            </View>
          </View>
          <View style={styles.cardArrow}>
            <Ionicons name="arrow-forward" size={18} color="#FEA116" />
          </View>
        </TouchableOpacity>

        {/* E-Commerce Card */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => handleSelection('ecommerce')}
        >
          <View style={styles.cardLeft}>
            <Image 
              source={spiceBlissLogo} 
              style={styles.ecommerceLogo} 
              resizeMode="contain" 
            />
            <View>
              <Text style={styles.cardTitle}>{t('selection.spiceBliss', 'Spice and Bliss')}</Text>
              <Text style={styles.cardSub}>{t('selection.spiceBlissSub', 'E-Commerce · Spices · Attires')}</Text>
            </View>
          </View>
          <View style={styles.cardArrow}>
            <Ionicons name="arrow-forward" size={18} color="#FEA116" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLineLeft} />
        <Text style={styles.footerText}>{t('selection.footer', 'DELHI DARBAR GROUP')}</Text>
        <View style={styles.footerLineRight} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#042D31',
    paddingHorizontal: 24,
  },
  topAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#FEA116',
  },

  // Header
  header: {
    alignItems: 'center',
    paddingTop: 72,
  },
  logoWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FEA116',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#FEA116',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  brandName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 6,
  },
  ornamentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  ornamentLine: {
    width: 32,
    height: 1.5,
    backgroundColor: '#FEA116',
  },
  ornamentText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FEA116',
    letterSpacing: 3,
  },
  tagline: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    marginTop: 6,
    letterSpacing: 1,
  },

  // Middle
  middle: {
    marginTop: 48,
    marginBottom: 36,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 38,
  },
  desc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 12,
    lineHeight: 22,
  },

  // Cards
  cardsArea: {
    gap: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: '#FEA116',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ecommerceLogo: {
    width: 46,
    height: 46,
    borderRadius: 13,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  cardSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: 0.3,
  },
  cardArrow: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(254, 161, 22, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingBottom: 36,
    gap: 14,
  },
  footerLineLeft: {
    width: 28,
    height: 1,
    backgroundColor: 'rgba(254, 161, 22, 0.3)',
  },
  footerLineRight: {
    width: 28,
    height: 1,
    backgroundColor: 'rgba(254, 161, 22, 0.3)',
  },
  footerText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.25)',
    letterSpacing: 3,
    fontWeight: '600',
  },
});
