// components/NavBar.tsx
import React from 'react';
import Link from "next/link"; // or `next/link` if in Next.js
import { Authenticator, useAuthenticator, View, Button, Flex, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const NavBar: React.FC = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);


  return (
    <View as="header" padding="1rem" backgroundColor="neutral.80">
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          Axie Info
        </Text>
        
        <Flex direction="row" alignItems="center" gap="1rem">
          <Link href="/">Home</Link>
          <Link href="/releasevalue">Release Value</Link>
          <Link href="/garuda">Garuda</Link>
          <Link href="/crafting">Crafting</Link>

          {user ? (
            <>
              <Text>Hello, {user?.signInDetails?.loginId}</Text>
              <Button onClick={signOut}>Sign Out</Button>
            </>
          ) : (
            <Authenticator>
              {({ signOut }) => (
                <Button onClick={signOut}>Sign In</Button>
              )}
            </Authenticator>
          )}
        </Flex>
      </Flex>
    </View>
  );
};


export default NavBar;