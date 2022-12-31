import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';

import { Center, Heading, Text, VStack, SectionList } from 'native-base';
import  { useState } from 'react';


export function History(){

const  [ exercises, setExercises] = useState([
    {
        title : '26.12.2022',
        data: ['Puxada Frontal', 'Remada Frontal']
    },
    {
        title : '28.12.2022',
        data: ['Biceps', 'Triceps']
    },


])

    return(
        <VStack flex={1}>
           <ScreenHeader title='Histórico de Exercícios'/>

           <SectionList
           sections={exercises}
           keyExtractor={item => item}
           renderItem={({ item}) => (
            <HistoryCard />
           )}
           renderSectionHeader={({section}) => (
            <Heading color='gray.200' fontSize='md' mt={10} mb={3}>
                {section.title}
            </Heading>
           )}
           px={8}
           contentContainerStyle={[].length === 0  && {flex: 1, justifyContent: 'center'}}
           ListEmptyComponent={() => (
            <Text color='gray.100' textAlign='center'>
                Não há exercícios registrados ainda. {'\n'}
                Vamos nos exercitar hoje?
            </Text>
           )}
           />
          
        </VStack>
        
    )
}