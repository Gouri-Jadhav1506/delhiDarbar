import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Modal, StatusBar, Platform, TextInput, KeyboardAvoidingView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PRODUCTS, productImages } from '../../../constants/products';
import { useWishlist } from '../../../contexts/WishlistContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useRetailCart } from '../../../contexts/RetailCartContext';

interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  message: string;
  images: any[];
}

const { width, height } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { addToCart, isInCart, getCartItem, updateQuantity } = useRetailCart();
  const product = PRODUCTS.find((p) => p.id === id);
  const cartItem = product ? getCartItem(product.id) : undefined;
  const inCart = product ? isInCart(product.id) : false;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = product ? isInWishlist(product.id) : false;
  const scrollRef = useRef<ScrollView>(null);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'r1',
      user: 'Sarah Jenkins',
      rating: 5,
      date: new Date().toLocaleDateString(),
      message: 'Absolutely stunning! The quality exceeded my expectations. Highly recommend this for anyone looking to add a touch of elegance.',
      images: []
    }
  ]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState('');
  const [reviewImages, setReviewImages] = useState<any[]>([]);

  const handleAddPhoto = () => {
    if (product && product.images.length > 0) {
       setReviewImages([...reviewImages, productImages[product.images[0]]]);
    }
  };

  const handleSubmitReview = () => {
    if (reviewRating === 0) return;
    const newReview: Review = {
      id: Math.random().toString(),
      user: 'You',
      rating: reviewRating,
      date: new Date().toLocaleDateString(),
      message: reviewMessage,
      images: reviewImages,
    };
    setReviews([newReview, ...reviews]);
    setIsReviewModalOpen(false);
    setReviewRating(0);
    setReviewMessage('');
    setReviewImages([]);
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t('product.notFound', 'Product not found')}</Text>
      </View>
    );
  }

  const handleImageScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveImageIndex(index);
  };

  const scrollToImage = (index: number) => {
    setActiveImageIndex(index);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Ionicons key={i} name="star" size={16} color="#FEA116" />);
      } else if (i === fullStars && hasHalf) {
        stars.push(<Ionicons key={i} name="star-half" size={16} color="#FEA116" />);
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={16} color="rgba(255,255,255,0.2)" />);
      }
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Zoom Modal */}
      <Modal visible={isZoomed} transparent animationType="fade">
        <View style={styles.zoomOverlay}>
          <TouchableOpacity style={styles.zoomClose} onPress={() => setIsZoomed(false)}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentOffset={{ x: activeImageIndex * width, y: 0 }}
          >
            {product.images.map((imgKey, idx) => (
              <ScrollView
                key={idx}
                maximumZoomScale={4}
                minimumZoomScale={1}
                contentContainerStyle={styles.zoomImageContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <Image
                  source={productImages[imgKey]}
                  style={styles.zoomImage}
                  resizeMode="contain"
                />
              </ScrollView>
            ))}
          </ScrollView>
          {/* Zoom dots */}
          <View style={styles.zoomDots}>
            {product.images.map((_, idx) => (
              <View
                key={idx}
                style={[styles.dot, idx === activeImageIndex && styles.dotActive]}
              />
            ))}
          </View>
        </View>
      </Modal>

      {/* Write Review Modal */}
      <Modal visible={isReviewModalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
           <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalContainer}>
             <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{t('product.writeReviewHeader', 'Write a Review')}</Text>
                <TouchableOpacity onPress={() => setIsReviewModalOpen(false)}>
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
             </View>

             <Text style={styles.modalLabel}>{t('product.overallRating', 'Overall Rating')}</Text>
             <View style={styles.ratingSelectorRow}>
               {[1, 2, 3, 4, 5].map((star) => (
                 <TouchableOpacity key={star} onPress={() => setReviewRating(star)}>
                   <Ionicons 
                     name={star <= reviewRating ? "star" : "star-outline"} 
                     size={32} 
                     color={star <= reviewRating ? "#FEA116" : "rgba(255,255,255,0.3)"} 
                   />
                 </TouchableOpacity>
               ))}
             </View>

             <Text style={styles.modalLabel}>{t('product.addPhotos', 'Add Photos')}</Text>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoUploadRow}>
               {reviewImages.map((img, i) => (
                  <View key={i} style={styles.uploadedPhotoWrapper}>
                    <Image source={img} style={styles.uploadedPhoto} />
                  </View>
               ))}
               <TouchableOpacity style={styles.addPhotoBtn} onPress={handleAddPhoto}>
                 <Ionicons name="camera-outline" size={28} color="#FEA116" />
                 <Text style={styles.addPhotoText}>{t('product.addPhotoBtn', 'Add Photo')}</Text>
               </TouchableOpacity>
             </ScrollView>

             <Text style={styles.modalLabel}>{t('product.yourReview', 'Your Review')}</Text>
             <TextInput
               style={styles.reviewInput}
               placeholder={t('product.reviewPlaceholder', 'What did you like or dislike?')}
               placeholderTextColor="rgba(255,255,255,0.3)"
               multiline
               textAlignVertical="top"
               value={reviewMessage}
               onChangeText={setReviewMessage}
             />

             <TouchableOpacity 
               style={[styles.submitReviewBtn, reviewRating === 0 && styles.submitReviewBtnDisabled]} 
               onPress={handleSubmitReview}
               disabled={reviewRating === 0}
             >
                <Text style={styles.submitReviewBtnText}>{t('product.submitReview', 'Submit Review')}</Text>
             </TouchableOpacity>
           </KeyboardAvoidingView>
        </View>
      </Modal>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        <View style={styles.imageSection}>
          {/* Back button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#FEA116" />
          </TouchableOpacity>

          {/* Wishlist button */}
          <TouchableOpacity 
            style={styles.wishlistBtn} 
            onPress={() => product && toggleWishlist(product.id)}
          >
            <Ionicons 
              name={isWishlisted ? "heart" : "heart-outline"} 
              size={22} 
              color={isWishlisted ? "#F06595" : "#fff"} 
            />
          </TouchableOpacity>

          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleImageScroll}
            scrollEventThrottle={16}
          >
            {product.images.map((imgKey, idx) => (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.95}
                onPress={() => setIsZoomed(true)}
                style={styles.carouselSlide}
              >
                <Image
                  source={productImages[imgKey]}
                  style={styles.carouselImage}
                  resizeMode="cover"
                />
                {/* Pinch to zoom hint */}
                <View style={styles.zoomHint}>
                  <Ionicons name="expand-outline" size={14} color="rgba(255,255,255,0.7)" />
                  <Text style={styles.zoomHintText}>{t('product.tapZoom', 'Tap to zoom')}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Dot indicators */}
          <View style={styles.dotsRow}>
            {product.images.map((_, idx) => (
              <TouchableOpacity key={idx} onPress={() => scrollToImage(idx)}>
                <View style={[styles.dot, idx === activeImageIndex && styles.dotActive]} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Thumbnail strip */}
          <View style={styles.thumbRow}>
            {product.images.map((imgKey, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => scrollToImage(idx)}
                style={[styles.thumb, idx === activeImageIndex && styles.thumbActive]}
              >
                <Image source={productImages[imgKey]} style={styles.thumbImage} resizeMode="cover" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          {/* Category badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{t(`ecommerce.cat_${product.category.toLowerCase().replace(/ /g, '_')}`, product.category)}</Text>
          </View>

          {/* Name */}
          <Text style={styles.productName}>{t(`ecommerce.product_${product.id}_name`, product.name)}</Text>

          {/* Rating row */}
          <View style={styles.ratingRow}>
            <View style={styles.stars}>{renderStars(product.rating)}</View>
            <Text style={styles.ratingValue}>{product.rating}</Text>
            <Text style={styles.reviewCount}>({product.reviewCount} {t('product.reviewsLabel', 'reviews')})</Text>
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <View style={styles.inStockBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#66BB6A" />
              <Text style={styles.inStockText}>{t('product.inStock', 'In Stock')}</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.descTitle}>{t('product.descTitle', 'Description')}</Text>
          <Text style={styles.descText}>{t(`ecommerce.product_${product.id}_desc`, product.description)}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Features */}
          <Text style={styles.descTitle}>{t('product.highlights', 'Highlights')}</Text>
          <View style={styles.featureRow}>
            <View style={styles.featureItem}>
              <Ionicons name="shield-checkmark" size={20} color="#FEA116" />
              <Text style={styles.featureText}>{t('product.featQuality', 'Quality\nAssured')}</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="car" size={20} color="#FEA116" />
              <Text style={styles.featureText}>{t('product.featShipping', 'Free\nShipping')}</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="refresh" size={20} color="#FEA116" />
              <Text style={styles.featureText}>{t('product.featReturns', 'Easy\nReturns')}</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="lock-closed" size={20} color="#FEA116" />
              <Text style={styles.featureText}>{t('product.featPayment', 'Secure\nPayment')}</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Customer Reviews Section */}
          <View style={styles.reviewsHeader}>
            <Text style={styles.descTitle}>{t('product.customerReviews', 'Customer Reviews')} ({reviews.length})</Text>
            <TouchableOpacity style={styles.writeReviewBtn} onPress={() => setIsReviewModalOpen(true)}>
              <Ionicons name="pencil" size={14} color="#042D31" />
              <Text style={styles.writeReviewBtnText}>{t('product.writeReviewBtn', 'Write a Review')}</Text>
            </TouchableOpacity>
          </View>

          {reviews.map(review => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewCardHeader}>
                <View>
                  <Text style={styles.reviewUser}>{review.user}</Text>
                  <View style={styles.stars}>{renderStars(review.rating)}</View>
                </View>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              {review.message ? <Text style={styles.reviewMessage}>{review.message}</Text> : null}
              {review.images && review.images.length > 0 && (
                <View style={styles.reviewImagesRow}>
                  {review.images.map((img, i) => (
                    <Image key={i} source={img} style={styles.reviewThumb} />
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Bottom spacing for action buttons */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View style={styles.actionBar}>
        {inCart && cartItem ? (
          <View style={styles.cartQtyBar}>
            <TouchableOpacity
              style={styles.cartQtyBtn}
              onPress={() => updateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
            >
              <Ionicons name="remove" size={20} color="#FEA116" />
            </TouchableOpacity>
            <Text style={styles.cartQtyValue}>{cartItem.quantity} in bag</Text>
            <TouchableOpacity
              style={styles.cartQtyBtn}
              onPress={() => updateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
            >
              <Ionicons name="add" size={20} color="#FEA116" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addCartBtn}
            activeOpacity={0.85}
            onPress={() => product && addToCart(product)}
          >
            <Ionicons name="bag-add-outline" size={20} color="#042D31" />
            <Text style={styles.addCartBtnText}>ADD TO BAG</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.buyNowBtn}
          activeOpacity={0.85}
          onPress={() => {
            if (product && !inCart) addToCart(product);
            router.push('/ecommerce/(tabs)/cart' as any);
          }}
        >
          <Ionicons name="flash" size={18} color="#FFF" />
          <Text style={styles.buyNowBtnText}>BUY NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#042D31',
  },
  scrollView: {
    flex: 1,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },

  // Image Carousel
  imageSection: {
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 16 : 50,
    left: 16,
    zIndex: 10,
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: 'rgba(4, 45, 49, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.3)',
  },
  wishlistBtn: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 16 : 50,
    right: 16,
    zIndex: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(4, 45, 49, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.3)',
  },
  carouselSlide: {
    width: width,
    height: width * 0.85,
    position: 'relative',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  zoomHint: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
  },
  zoomHintText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dotActive: {
    backgroundColor: '#FEA116',
    width: 24,
    borderRadius: 4,
  },
  thumbRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  thumbActive: {
    borderColor: '#FEA116',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },

  // Zoom Modal
  zoomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
  },
  zoomClose: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 54,
    right: 20,
    zIndex: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomImageContainer: {
    width: width,
    height: height * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomImage: {
    width: width,
    height: height * 0.75,
  },
  zoomDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 20,
  },

  // Info Section
  infoSection: {
    paddingHorizontal: 24,
    paddingTop: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(254, 161, 22, 0.12)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 10,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FEA116',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 32,
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FEA116',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  price: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FEA116',
  },
  inStockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(102, 187, 106, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  inStockText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#66BB6A',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginVertical: 20,
  },
  descTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  descText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 22,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    paddingVertical: 14,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  featureText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 15,
  },

  // Sticky Action Bar
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 14,
    paddingBottom: Platform.OS === 'web' ? 14 : 30,
    gap: 12,
    backgroundColor: '#042D31',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
  },
  addCartBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#FEA116',
  },
  addCartBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#042D31',
    letterSpacing: 1,
  },
  buyNowBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  buyNowBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 1,
  },
  cartQtyBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.25)',
  },
  cartQtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(254, 161, 22, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartQtyValue: {
    color: '#FEA116',
    fontSize: 15,
    fontWeight: '800',
  },

  // Reviews Section
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  writeReviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEA116',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  writeReviewBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#042D31',
  },
  reviewCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  reviewCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
  },
  reviewMessage: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 20,
    marginTop: 8,
  },
  reviewImagesRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  reviewThumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },

  // Review Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#042D31',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    marginTop: 16,
  },
  ratingSelectorRow: {
    flexDirection: 'row',
    gap: 8,
  },
  photoUploadRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  addPhotoBtn: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.4)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addPhotoText: {
    fontSize: 11,
    color: '#FEA116',
    marginTop: 4,
  },
  uploadedPhotoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  uploadedPhoto: {
    width: '100%',
    height: '100%',
  },
  reviewInput: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    padding: 16,
    height: 120,
    fontSize: 14,
    marginBottom: 24,
  },
  submitReviewBtn: {
    backgroundColor: '#FEA116',
    borderRadius: 12,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitReviewBtnDisabled: {
    opacity: 0.5,
  },
  submitReviewBtnText: {
    color: '#042D31',
    fontSize: 16,
    fontWeight: '800',
  }
});
