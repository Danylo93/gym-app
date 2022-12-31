import {VStack, Image, Center, Text, Heading, ScrollView} from 'native-base';
import { useState} from 'react'
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import React from 'react';
import {Input} from '@components/Input';
import {Button} from '@components/Button';
import { useNavigation } from '@react-navigation/native';


export function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation();

function handleSignIn(){
  navigation.goBack();
}

function handleSignUp(){
  console.log(name);
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
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Input placeholder="Nome"
          onChangeText={setName}
          />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setName}
          />

          <Input placeholder="Senha" secureTextEntry  onChangeText={setPassword}/>
          <Input placeholder=" Confirme a Senha" secureTextEntry onChangeText={setPasswordConfirm} />

          <Button title="Criar e acessar" onPress={handleSignUp}/>
        </Center>

        <Button title="Voltar para o login" onPress={handleSignIn} variant="outline" mt={24} />
      </VStack>
    </ScrollView>
  );
}
