import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import {
  Button
} from "@chakra-ui/react"

const LogoutButton = () => {
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    dispatch(logout());
  };

  return (
    <Button onClick={onLogout} _hover={{ color: "white", bg: "gray.500" }} colorScheme="white" variant="ghost">
      Logout
    </Button>
  )


};

export default LogoutButton;
