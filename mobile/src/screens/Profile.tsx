import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { TouchableOpacity } from 'react-native'
import { Center, ScrollView, Text, VStack, Skeleton, Heading, useToast } from 'native-base';
import { useState } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import { AppError } from '@utils/AppError';
import { useAuth } from '@hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { api } from '@services/api';
import defaultImg from '@assets/userPhotoDefault.png';

const PHOTO_SIZE = 33;

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    old_password: string;
    confirm_password: string;
  }

  const profileSchema = yup.object({
    name: yup
      .string()
      .required('Informe o nome'),
    password: yup
      .string()
      .min(6, 'A senha deve ter pelo menos 6 dígitos.')
      .nullable()
      .transform((value) => !!value ? value : null),
    confirm_password: yup
      .string()
      .nullable()
      .transform((value) => !!value ? value : null)
      .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
      .when('password', {
        is: (Field: any) => Field, 
        then: yup
          .string()
          .nullable()
          .required('Informe a confirmação da senha.')
          .transform((value) => !!value ? value : null)
      }),
  })
  

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
    const [isUpdating, setIsUpdating] = useState(false);
    const  [photoLoading, setPhotoLoading] = useState(false);

    const toast = useToast();
    const { user, updateUserProfile } = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({ 
        defaultValues: { 
          name: user.name,
          email: user.email
        },
        resolver: yupResolver(profileSchema) 
      });

    async function handleUserPhotoSelect(){
        setPhotoLoading(true);
        try {

        const photoSelected =  await ImagePicker.launchImageLibrary(DEFAULT_OPTIONS);

        const fileExtension = photoSelected.assets[0].uri.split('.').pop();

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`
        } as any;

        const userPhotoUploadForm = new FormData();

        userPhotoUploadForm.append('avatar', photoFile);

        const avatarUpdtedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const userUpdated = user;

        userUpdated.avatar = avatarUpdtedResponse.data.avatar;

        await updateUserProfile(userUpdated);

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

    async function handleProfileUpdate(data: FormDataProps) {
        try {
          setIsUpdating(true);
    
          const userUpdated = user;
          userUpdated.name = data.name;
    
          await api.put('/users', data);
    
          await updateUserProfile(userUpdated);
    
          toast.show({
            title: 'Perfil atualizado com sucesso!',
            placement: 'top',
            bgColor: 'green.500'
          });
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';
    
          toast.show({
            title,
            placement: 'top',
            bgColor: 'red.500'
          })
        } finally {
          setIsUpdating(false);
        }
      }

    return(
        <VStack flex={1}>
            <ScreenHeader title='Perfil' />
            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {
            photoLoading ?
              <Skeleton 
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
              />
            :
              <UserPhoto 
                source={
                  user.avatar  
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } 
                  : defaultImg
                }
                alt="Foto do usuário"
                size={PHOTO_SIZE}
              />
          }
          
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Controller 
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input 
                bg="gray.600" 
                placeholder='Nome'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input 
                bg="gray.600" 
                placeholder="E-mail"
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          
        
          <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12} fontFamily="heading">
            Alterar senha
          </Heading>

          <Controller 
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input 
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller 
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input 
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input 
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button 
            title="Atualizar" 
            mt={4} 
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </Center>
      </ScrollView>
            
           
        </VStack>
    )
}