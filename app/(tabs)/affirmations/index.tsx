import { View, ScrollView, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

import AppGradient from '@/components/app-gradient';
import GuidedAffirmationsGallery from '@/components/guided-affirmations-gallery';
import instance from '@/config/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

const AffirmationsScreen = () => {
  const [affirmations, setAffirmations] = useState([]);

  const fetchAffirmations = async () => {
    try {
      const response = await instance.get(
        API_ENDPOINTS.GET_AFFIRMATIONS_CATEGORY
      );
      if (response.data?.status === 200) {
        setAffirmations(response.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAffirmations();
  }, []);

  return (
    <View className="flex-1">
      <AppGradient colors={['#2e1f58', '#54426b', '#a790af']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-3xl font-bold text-zinc-50">
            Change your beliefs with affirmations
          </Text>
          <View>
            {affirmations?.map((category: any) => (
              <GuidedAffirmationsGallery
                key={category.id}
                title={category.name}
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
