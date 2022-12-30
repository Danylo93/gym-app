import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { TouchableOpacity } from 'react-native'
import { Center, ScrollView, Text, VStack, Skeleton, Heading } from 'native-base';
import React, { useState } from 'react';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33;

export function Profile(){

    const  [photoLoading, setPhotoLoading] = useState(false);
    return(
        <VStack flex={1}>
            <ScreenHeader title='Perfil' />
            <ScrollView contentContainerStyle={{ paddingBottom: 36}}>
                <Center mt={6} px={10}>
                    {
                    photoLoading ?
                    <Skeleton 
                    w={PHOTO_SIZE} 
                    h={PHOTO_SIZE} 
                    rounded='full'
                    startColor='gray.500'
                    endColor='gray.400'
                    /> :
                    <UserPhoto 
                    source={{uri: 'https://github.com/Danylo93.png'}}
                    size={PHOTO_SIZE}
                    alt="Imagem user"
                    mr={4}
                    />
                    }

                    <TouchableOpacity>
                        <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8}> Alterar Foto</Text>
                    </TouchableOpacity>

                    <Input bg='gray.600' placeholder='Nome' />
                    <Input bg='gray.600' placeholder='Email' isDisabled  />
                </Center>

                <Center px={10} mt={12} mb={9}>
                    <Heading color='gray.200' fontSize='md' mb={2} alignSelf='flex-start' mt={8}>
                        Alterar Senha
                    </Heading>

                    <Input
                    bg='gray.600'
                    placeholder='Senha Antiga'
                    secureTextEntry
                    />
                    <Input
                    bg='gray.600'
                    placeholder='Nova Senha'
                    secureTextEntry
                    />
                    <Input
                    bg='gray.600'
                    placeholder='Confirme a nova senha'
                    secureTextEntry
                    />
                    <Button title='Atualizar' mt={4} />
                </Center>
                
            </ScrollView>
            
           
        </VStack>
    )
}