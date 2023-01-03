import { Center, Heading, HStack, Text, VStack, Image, Box, ScrollView } from 'native-base';
import ArrowSvg from '@assets/arrow-left.svg';
import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { Button } from '@components/Button';

export function Exercise(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleGoBack(){
        navigation.goBack();
    }
    return(
        <VStack flex={1}>
            
           <VStack px={8} bg='gray.600' pt={12}>
            <TouchableOpacity onPress={handleGoBack}>
            <ArrowSvg fill='white' width={40} height={40} />
            </TouchableOpacity>
           
            <HStack justifyContent='space-between' mt={4} mb={8} size={6} alignItems='center' >
                <Heading color='gray.100' fontSize='lg' flexShrink={1} fontFamily='heading'>
                    Puxada Frontal
                </Heading>

                <HStack alignItems='center'>
                    <BodySvg />
                <Text color="gray.100" mt={1} textTransform="capitalize">
                    Costas
                </Text>
            </HStack>

            </HStack>

           </VStack>
<ScrollView>
           <VStack p={8}>
            <Image
            w='full'
            h={80}
            source={{uri: 'https://www.origym.com.br/upload/remada-unilateral-3.png'}}
            alt='Imagem do  exercicio'
            mb={3}
            resizeMode='cover'
            rounded='lg'
            
            />
            <Box bg='gray.600' rounded='md' pb={4} px={4}>
                <HStack  alignItems='center' justifyContent='space-around' mb={6} mt={5}>
                    
                    <HStack >
                        <SeriesSvg />
                        <Text color='gray.200' mt={2}>
                            3 Séries
                        </Text>
                    </HStack>

                    <HStack>
                        <RepetitionsSvg />
                        <Text color='gray.200' mt={2}>
                            12 repetições
                        </Text>
                    </HStack>
                    
                </HStack>
                <Button  
                title='Marcar como realizado'
                />
            </Box>
            
           </VStack>
           </ScrollView>
        </VStack>
    )
}