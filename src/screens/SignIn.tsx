import {VStack, Image, Center, Text, Heading, ScrollView} from 'native-base';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import {Input} from '@components/Input';
import {Button} from '@components/Button';
import { useNavigation } from '@react-navigation/native';


export function SignIn() {

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

function handleNewAccount(){
  navigation.navigate('signUp')
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
            Acesse sua conta
          </Heading>
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />

          <Button title="Acessar" />
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
