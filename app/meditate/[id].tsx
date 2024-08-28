import { View, Text, ImageBackground, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';

import MEDITATION_IMAGES from '@/constants/meditation-images';
import AppGradient from '@/components/app-gradient';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '@/components/custom-button';
import { AUDIO_FILES, MEDITATION_DATA } from '@/constants/meditation-data';

const MeditateScreen = () => {
  const { id } = useLocalSearchParams();

  const [secondsRemaining, setSecondsRemaining] = useState<number>(10);
  const [isMeditating, setMeditating] = useState<boolean>(false);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setPlayingAudio] = useState<boolean>(false);

  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, '0');

  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, '0');

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setSound(sound);
    return sound;
  };

  const togglePlayPause = async () => {
    const sound = audioSound ? audioSound : await initializeSound();
    const status = await sound?.getStatusAsync();
    if (status?.isLoaded && !isPlayingAudio) {
      await sound?.playAsync();
      setPlayingAudio(true);
    } else {
      await sound?.pauseAsync();
      setPlayingAudio(false);
    }
  };

  const toggleMeditationSessionStatus = async () => {
    if (secondsRemaining === 0) setSecondsRemaining(10);
    setMeditating(!isMeditating);
    await togglePlayPause();
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (secondsRemaining === 0) {
      setMeditating(false);
      return;
    }
    if (isMeditating) {
      timerId = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [secondsRemaining, isMeditating]);

  useEffect(() => {
    return () => {
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDITATION_IMAGES[Number(id) - 1]}
        className="flex-1"
      >
        <AppGradient colors={['transparent', 'rgba(0,0,0,0.8)']}>
          <Pressable
            onPress={() => router.back()}
            className="absolute z-10 top-16 left-6"
          >
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>
          <View className="justify-center flex-1">
            <View className="items-center justify-center mx-auto rounded-full w-44 h-44 bg-neutral-200">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>
          <View className="mb-5">
            {/* <CustomButton
              title="Adjust duration"
              onPress={handleAdjustDuration}
            /> */}
            <CustomButton
              title={isMeditating ? 'Stop' : 'Start Meditation'}
              onPress={toggleMeditationSessionStatus}
              containerStyles="mt-4"
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default MeditateScreen;
