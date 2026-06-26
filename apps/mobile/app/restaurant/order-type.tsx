import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTable } from '../../contexts/TableContext';

export default function OrderTypeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { setTable } = useTable();

  const handleSelection = (type: 'dine-in' | 'takeaway') => {
    if (type === 'dine-in') {
      router.push('/restaurant/book-table');
    } else {
      console.log('Takeaway selected');
      setTable(null); // Clear any existing table session
      router.push('/restaurant/menu');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Accent */}
      <View style={styles.topAccent} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FEA116" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('restaurant.brand', 'Skyline')}</Text>
        <TouchableOpacity 
          style={styles.switchBtn} 
          onPress={() => router.replace('/selection')}
        >
          <Ionicons name="apps-outline" size={22} color="#FEA116" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{t('orderType.title1', 'How would you like')}</Text>
          <Text style={styles.titleHighlight}>{t('orderType.title2', 'your order?')}</Text>
          <Text style={styles.subtitle}>{t('orderType.subtitle', 'Select your preferred dining experience to continue to the menu.')}</Text>
        </View>

        <View style={styles.cardsContainer}>
          {/* Dine In Card */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.85}
            onPress={() => handleSelection('dine-in')}
          >
            <View style={styles.cardIconWrap}>
              <Ionicons name="restaurant-outline" size={42} color="#042D31" />
            </View>
            <Text style={styles.cardTitle}>{t('orderType.dineIn', 'Dine In')}</Text>
            <Text style={styles.cardDesc}>{t('orderType.dineInDesc', 'Enjoy the ambiance and fresh food served right at your table.')}</Text>
            <View style={styles.cardArrow}>
              <Ionicons name="arrow-forward" size={20} color="#FEA116" />
            </View>
          </TouchableOpacity>

          {/* Takeaway Card */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.85}
            onPress={() => handleSelection('takeaway')}
          >
            <View style={styles.cardIconWrap}>
              <Ionicons name="fast-food-outline" size={42} color="#042D31" />
            </View>
            <Text style={styles.cardTitle}>{t('orderType.takeaway', 'Takeaway')}</Text>
            <Text style={styles.cardDesc}>{t('orderType.takeawayDesc', 'Grab your food on the go. Perfectly packed and ready when you arrive.')}</Text>
            <View style={styles.cardArrow}>
              <Ionicons name="arrow-forward" size={20} color="#FEA116" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#042D31',
  },
  topAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#FEA116',
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 24 : 54,
    paddingBottom: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.2)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  textWrap: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 40,
  },
  titleHighlight: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FEA116',
    lineHeight: 40,
    marginVertical: 4,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 22,
    marginTop: 8,
  },
  cardsContainer: {
    gap: 20,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  cardIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#FEA116',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#FEA116',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  cardArrow: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
