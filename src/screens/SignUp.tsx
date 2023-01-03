import {VStack, Image, Center, Text, Heading, ScrollView, useToast} from 'native-base';
import { useState} from 'react'
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import axios from 'axios';
import {Input} from '@components/Input';
import {Button} from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller} from "react-hook-form";
import * as yup from 'yup';
import { yupResolver} from '@hookform/resolvers/yup';
import { api } from '@services/api';
import { Alert } from 'react-native';
import { AppError } from '@utils/AppError';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}


const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o email').email('E-mail Inválido'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos'),
  password_confirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password'), null], 'As senhas não conferem')
});

export function SignUp() {

  const toast = useToast();

  const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
    resolver : yupResolver(signUpSchema)
  });

  const navigation = useNavigation();

function handleSignIn(){
  navigation.goBack();
}

async function handleSignUp( { email, name, password}: FormDataProps){

  try {
  const response = await api.post('/users', { email, name, password});
  console.log(response.data);
    
  } catch (error) {
    const isAppError = error instanceof AppError;
    const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde'
    toast.show({
      title: title,
      placement: 'top',
      bgColor: 'red.500'
    })
  }
  
}

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="gray.700" px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />
        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Você em forma
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Controller 
          control={control}
          name='name'
          render={({field: {onChange, value}}) => (
             <Input placeholder="Nome"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
              />
          )}
          />

          <Controller 
          control={control}
          name='email'
          render={({field: {onChange, value}}) => (
            <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
          />
          )}
          />
          
          <Controller 
          control={control}
          name='password'
          render={({field: {onChange, value}}) => (
            <Input 
            placeholder="Senha" 
            secureTextEntry  
            onChangeText={onChange}  
            value={value}
            errorMessage={errors.password?.message}
            />
          )}
          />

          <Controller 
          control={control}
          name='password_confirm'
          render={({field: {onChange, value}}) => (
            <Input 
            placeholder=" Confirme a Senha" 
            secureTextEntry 
            onChangeText={onChange}  
            value={value}
            onSubmitEditing={handleSubmit(handleSignUp)}
            returnKeyType='send'
            errorMessage={errors.password_confirm?.message}
            />
          )}
          />
          
          <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)}/>
        </Center>

        <Button title="Voltar para o login" onPress={handleSignIn} variant="outline" mt={24} />
      </VStack>
    </ScrollView>
  );
}
