import { useState } from 'react';
import {VStack, Image, Center, Text, Heading, ScrollView, useToast} from 'native-base';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import {Input} from '@components/Input';
import {Button} from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AppError } from '@utils/AppError';
import { useAuth } from '@hooks/useAuth';


type FormDataProps = {
  email: string;
  password: string;
}


const signUpSchema = yup.object({
  email: yup.string().required('Informe o email').email('E-mail Inválido'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos'),
});


export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { singIn } = useAuth();
  const toast = useToast();

  const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
    resolver : yupResolver(signUpSchema)
  });


async function handleSignIn( { email, password}: FormDataProps){

  try {
    setIsLoading(true);
    singIn(email, password);

    
  } catch (error) {
    const isAppError = error instanceof AppError;
    const title = isAppError ? error.message : 'Não foi possível acessar sua a conta. Tente novamente mais tarde'
    
    setIsLoading(false);
    toast.show({
      title: title,
      placement: 'top',
      bgColor: 'red.500'
    });
  }
  
}

const navigation = useNavigation<AuthNavigatorRoutesProps>();

async function handleNewAccount(){
 await navigation.navigate('signUp');
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
         
          <Text color="gray.100" fontSize={40} fontWeight='bold'>
            GymUp
          </Text>

          <Text color="gray.100" fontSize="sm">
          Um Upgrade para os seus treinos
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>
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

        <Button title="Criar e acessar" onPress={handleSubmit(handleSignIn)} isLoading={isLoading}/>
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso
          </Text>
        </Center>

        <Button title="Criar Conta" variant="outline" onPress={handleNewAccount}/>
      </VStack>
    </ScrollView>
  );
}
