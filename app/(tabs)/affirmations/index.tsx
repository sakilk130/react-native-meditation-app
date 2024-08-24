import { View, ScrollView, Text } from 'react-native';
import React from 'react';

import AppGradient from '@/components/app-gradient';
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallary';
import GuidedAffirmationsGallery from '@/components/guided-affirmations-gallery';

const AffirmationsScreen = () => {
  return (
    <View className="flex-1">
      <AppGradient colors={['#2e1f58', '#54426b', '#a790af']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-3xl font-bold text-zinc-50">
            Change your beliefs with affirmations
          </Text>
          <View>
            {AFFIRMATION_GALLERY.map((category) => (
              <GuidedAffirmationsGallery
                key={category.title}
                title={category.title}
                previews={category.data}
              />
            ))}
          </View>
        </ScrollView>
      </AppGradient>
    </View>
  );
};

export default AffirmationsScreen;
