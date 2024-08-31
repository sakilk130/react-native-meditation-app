import { View, Text, ImageBackground, Pressable } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';

import AppGradient from '@/components/app-gradient';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '@/components/custom-button';
import { TimerContext } from '@/context/timer-context';
import instance, { BASE_URL } from '@/config/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

const MeditateScreen = () => {
  const { id } = useLocalSearchParams();
  const [meditationData, setMeditationData] = useState<any>();

  const { duration: secondsRemaining, setDuration: setSecondsRemaining } =
    useContext(TimerContext);

  const [isMeditating, setMeditating] = useState<boolean>(false);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setPlayingAudio] = useState<boolean>(false);

  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, '0');

  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, '0');

  const initializeSound = async () => {
    const audioFileUrl = `${BASE_URL}/${meditationData?.audio}`;
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioFileUrl },
      { shouldPlay: false }
    );
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

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();
    router.push('/(modal)/adjust-meditation-duration');
  };

  const fetchMeditationData = async () => {
    try {
      const response = await instance.get(
        API_ENDPOINTS.GET_MEDITATION_BY_ID(Number(id))
      );
      if (response.data?.status === 200) {
        setMeditationData(response.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
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

  useEffect(() => {
    fetchMeditationData();
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        source={
          {
            uri: `${BASE_URL}/${meditationData?.image}`,
          } as any
        }
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
            <CustomButton
              title="Adjust duration"
              onPress={handleAdjustDuration}
            />
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
