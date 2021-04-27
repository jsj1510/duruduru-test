import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { Button, Input } from '../components';
import { logout, getCurrentUser, updateUserPhoto } from '../utils/firebase';
import { UserContext, ProgressContext } from '../contexts';
import { Alert, Image } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Profile = () => {
  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  const theme = useContext(ThemeContext);

  const user = getCurrentUser();

  const _handleLogoutButtonPress = async () => {
    try {
      spinner.start();
      await logout();
    } catch (e) {
      console.log('[Profile] logout: ', e.message);
    } finally {
      dispatch({});
      spinner.stop();
    }
  };


  return (
    <Container>
      <Input label="학번" value={user.name} disabled />
      <Input label="이메일" value={user.email} disabled />
      <Input label="이름" value={user.name} disabled />
      <Input label="별명" value={user.name} disabled />
      <Button
        title="로그아웃"
        onPress={_handleLogoutButtonPress}
        containerStyle={{ marginTop: 30, backgroundColor: theme.buttonLogout }}
      />
    </Container>
  );
};

export default Profile;