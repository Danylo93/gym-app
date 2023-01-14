import { HStack, Text, Heading, VStack, Icon, Skeleton} from "native-base";
import { TouchableOpacity} from 'react-native';
import LogoutSvg from '@assets/logout.svg';
import defaultImg from '@assets/userPhotoDefault.png';
import { UserPhoto } from "./UserPhoto";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { useState } from "react";


const PHOTO_SIZE = 16;
export function HomeHeader() {
    const { user, signOut} = useAuth();
    const  [photoLoading, setPhotoLoading] = useState(false);
    return(
        <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems='center'>

        {
            photoLoading ?
              <Skeleton 
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
                mr={4}
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
                mr={4}
              />
          }
           
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