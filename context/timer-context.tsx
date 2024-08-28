import { View, Text } from 'react-native';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

interface TimerProviderProps {
  children: ReactNode;
}

interface TimerContextProps {
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
}

export const TimerContext = createContext<TimerContextProps>({
  duration: 10,
  setDuration: () => {},
});

const TimerProvider = ({ children }: TimerProviderProps) => {
  const [duration, setDuration] = useState(10);
  return (
    <TimerContext.Provider value={{ duration, setDuration }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
