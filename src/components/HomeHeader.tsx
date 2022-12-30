import { HStack, Text, Heading, VStack, Icon} from "native-base";
import { TouchableOpacity} from 'react-native';
import React from "react";
import { UserPhoto } from "./UserPhoto";


export function HomeHeader() {
    return(
        <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems='center'>
            <UserPhoto 
            source={{uri: 'https://github.com/Danylo93.png'}}
            size={16}
            alt="Imagem user"
            mr={4}
            />
            <VStack flex={1}>
            <Text color='gray.100' fontSize='md'>Ola,</Text>

            <Heading color='gray.100' fontSize='md'>
                Danylo
            </Heading>
            </VStack>

            <TouchableOpacity>
            <Text color='red.600' fontSize='md'>Sair</Text>
            </TouchableOpacity>
            

           
        </HStack>
    )
}