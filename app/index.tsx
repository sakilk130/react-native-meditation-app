import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import beachImage from '@/assets/meditation-images/beach.webp';
import CustomButton from '@/components/custom-button';
import AppGradient from '@/components/app-gradient';

const AppScreen = () => {
  const router = useRouter();
  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        resizeMethod="resize"
        className="flex-1"
      >
        <AppGradient colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}>
          <StatusBar style="light" />
          <SafeAreaView className="flex justify-between flex-1 px-1">
            <View>
              <Text className="text-4xl font-bold text-center text-white">
                Simple Meditation
              </Text>
              <Text className="mt-3 text-2xl text-center text-white font-regular">
                Simplifying Meditation for Everyone
              </Text>
            </View>
            <CustomButton
              onPress={() => router.push('/nature-meditate')}
              title="Get Started"
            />
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default AppScreen;
