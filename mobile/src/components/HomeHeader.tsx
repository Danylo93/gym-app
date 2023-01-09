import { HStack, Text, Heading, VStack, Icon} from "native-base";
import { TouchableOpacity} from 'react-native';
import LogoutSvg from '@assets/logout.svg';
import defaultImg from '@assets/userPhotoDefault.png';
import { UserPhoto } from "./UserPhoto";
import { useAuth } from "@hooks/useAuth";



export function HomeHeader() {
    const { user, signOut} = useAuth();
    return(
        <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems='center'>
            <UserPhoto 
            source={user.avatar ? { uri: user.avatar} : defaultImg }
            size={16}
            alt="Imagem user"
            mr={4}
            />
            <VStack flex={1}>
            <Text color='gray.100' fontSize='md'>Ola,</Text>

            <Heading color='gray.100' fontSize='md' fontFamily='heading'>
                {user.name}
            </Heading>
            </VStack>

            <TouchableOpacity onPress={signOut}>
            <LogoutSvg fill='white' width={20} height={20} />
            </TouchableOpacity>
            

           
        </HStack>
    )
}