import { Text, TouchableOpacity, View } from 'react-native';
import { GameController } from 'phosphor-react-native';

import { DuoInfo } from '@components/DuoInfo';

import { styles } from './styles';
import { THEME } from '@theme/index';

export interface DuoCardData {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface DuoCardProps {
  data: DuoCardData;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: DuoCardProps) {
  return (
    <View style={styles.container}>
      <DuoInfo label='Nome' value={data.name} />

      <DuoInfo label='Tempo de jogo' value={`${data.yearsPlaying} anos`} />

      <DuoInfo
        label='Disponibilidade'
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

      <DuoInfo
        label='Chamada de áudio'
        value={data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />

        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
