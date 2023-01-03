import { Heading, HStack, Image, Text, VStack, Icon} from 'native-base';

import  { TouchableOpacity, TouchableOpacityProps} from 'react-native';

import ArrowSvg from '@assets/arrow-right.svg';

type Props = TouchableOpacityProps & {

};

export function ExerciseCard({...rest}: Props) {
    return(
        <TouchableOpacity {...rest}>
            <HStack bg='gray.500' alignItems='center' p={2} pr={4} rounded='md' mb={3} >
                <Image 
                alt='imagem de exercicio'
                source={{ uri: 'https://scontent.fcgh8-1.fna.fbcdn.net/v/t1.6435-9/187110829_789962068324256_1757451666272246910_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFN0QKdarsnN5hAerNPsgdOpxAfyxXJZa2nEB_LFcllreNYTjZ78QzDKtIMQbf21RtexuJ2MVOlI-ZFsG-djMpm&_nc_ohc=IwslLcaK7v8AX8Jg_pq&_nc_ht=scontent.fcgh8-1.fna&oh=00_AfB-uGolCkL1BaZo6ijYA2wbWtFymxEoQgTajBowi4xpJg&oe=63D5D8BA'}}
                w={16}
                h={16}
                rounded='md'
                mr={4}
                resizeMode='cover'
 />

            <VStack flex={1} >
                <Heading fontSize='lg' color='white' fontFamily='heading' >
                    Remada Unilateral
                </Heading>

                    <Text fontSize='sm' color='gray.200' mt={1} numberOfLines={2}>
                    3 séries x 12 repetições
                </Text>
            </VStack>
            
            <ArrowSvg fill='white' width={20} height={20} />
            </HStack>
        </TouchableOpacity>
    )
}