import { router } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import React, { useContext } from 'react';

import AppGradient from '@/components/app-gradient';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '@/components/custom-button';
import { TimerContext } from '@/context/timer-context';

const AdjustMeditationDuration = () => {
  const { setDuration } = useContext(TimerContext);

  const handlePress = (duration: number) => {
    setDuration(duration);
    router.back();
  };

  return (
    <View className="relative flex-1">
      <AppGradient colors={['#161b2e', '#0a4d4a', '#766e67']}>
        <Pressable
          onPress={() => router.back()}
          className="absolute z-10 top-8 left-6"
        >
          <AntDesign name="leftcircleo" size={50} color="white" />
        </Pressable>
        <View className="justify-center h-4/5">
          <View>
            <Text className="mb-8 text-3xl font-bold text-center text-white">
              Adjust your meditation duration
            </Text>
          </View>
          <View>
            <CustomButton
              title="10 seconds"
              onPress={() => handlePress(10)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="5 minutes"
              onPress={() => handlePress(5 * 60)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="10 minutes"
              onPress={() => handlePress(10 * 60)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="15 minutes"
              onPress={() => handlePress(15 * 60)}
              containerStyles="mb-5"
            />
          </View>
        </View>
      </AppGradient>
    </View>
  );
};

export default AdjustMeditationDuration;
