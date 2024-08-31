import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import AppGradient from '@/components/app-gradient';
import { AntDesign } from '@expo/vector-icons';
import instance, { BASE_URL } from '@/config/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

const AffirmationIdScreen = () => {
  const { itemId } = useLocalSearchParams();
  const [affirmation, setAffirmation] = useState<any>();

  const fetchAffirmation = async () => {
    try {
      const response = await instance.get(
        API_ENDPOINTS.GET_AFFIRMATION_GALLERY_BY_ID(Number(itemId))
      );
      if (response.data?.status === 200) {
        setAffirmation(response.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAffirmation();
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        source={{
          uri: `${BASE_URL}/${affirmation?.image}`,
        }}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.9)']}>
          <Pressable
            onPress={() => router.back()}
            className="absolute z-10 top-16 left-6"
          >
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>
          <ScrollView className="mt-20" showsVerticalScrollIndicator={false}>
            <View className="justify-center h-full border-white">
              <View className="justify-center h-4/5">
                {affirmation?.sentences.map((sentence: any, idx: number) => (
                  <Text
                    className="mb-12 text-3xl font-bold text-center text-white"
                    key={idx}
                  >
                    {sentence}.
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default AffirmationIdScreen;
