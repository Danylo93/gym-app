import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { TouchableOpacity } from 'react-native'
import { Center, ScrollView, Text, VStack, Skeleton, Heading, useToast } from 'native-base';
import { useState } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';


const PHOTO_SIZE = 33;

const DEFAULT_OPTIONS: ImageLibraryOptions & CameraOptions = {
    mediaType: 'photo',
    videoQuality: 'high',
    quality: 1,
    maxWidth: 0,
    maxHeight: 0,
    includeBase64: true,
    cameraType: 'back' && 'front',
    selectionLimit: 1,
    saveToPhotos: true,
    durationLimit: 0,
    includeExtra: true,
    presentationStyle: 'overFullScreen',
    
  };

export function Profile(){

    const  [photoLoading, setPhotoLoading] = useState(false);
    const [userPhoto, setUserPhoto] = useState('https://github.com/Danylo93.png');
    const toast = useToast();

    async function handleUserPhotoSelect(){
        setPhotoLoading(true);
        try {

        const photoSelected =  await ImagePicker.launchCamera(DEFAULT_OPTIONS);
       
        if(photoSelected.didCancel){
            return;
        }
        if(photoSelected.assets[0].uri){
          setUserPhoto(photoSelected.assets[0].uri); 
          toast.show({
            title: 'Foto Atualizada com sucesso',
            placement: 'top',
            bgColor: 'green.500'
          })
        }

        
            
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'Erro ao atualizar foto',
                placement: 'bottom',
                bgColor: 'red.500'
            })
        }finally{
            setPhotoLoading(false);
        }

        
    }

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
                    source={{uri: userPhoto}}
                    size={PHOTO_SIZE}
                    alt="Imagem user"
                    mr={4}
                    />
                    }

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8}> Alterar Foto</Text>
                    </TouchableOpacity>

                    <Input bg='gray.600' placeholder='Nome' />
                    <Input bg='gray.600' placeholder='Email' isDisabled  />
                </Center>

                <Center px={10} mt={12} mb={9}>
                    <Heading color='gray.200' fontSize='md' mb={2} alignSelf='flex-start' mt={8} fontFamily='heading'>
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