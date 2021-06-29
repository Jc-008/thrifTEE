import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  isRequired,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import * as sessionActions from "../store/session"
import { login } from '../store/session'
import { useDispatch, useSelector } from "react-redux";
import {Redirect} from 'react-router'



// need to work on this functionality
export function LoginForm() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [email, setEmail] = useState("");
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data= await dispatch(sessionActions.login( email, password ))


    if (data.errors) setErrors(data.errors)
  };

  const handleDemo= async (e) => {
    e.preventDefault();
    const email = 'demo@aa.io';
    const password = 'password'
    const dispatched = await dispatch(sessionActions.login( email, password))


    if (dispatched.errors) setErrors(dispatch.errors)
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <ul style={{marginTop: '.25em', marginBottom: '1.25em'}}>
        {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>

      </div>
      <Stack spacing={3}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <Input
              // ref={initialRef}
              placeholder="Email"
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              // ref={initialRef}
              placeholder="Password"
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>

          <br />
          <Button type='Submit'>Log in</Button>

        </FormControl>
      </Stack>
    </form>

    <form onSubmit={handleDemo}>
      <Button type="Submit">Demo User</Button>
    </form>
    </>
  )
}
