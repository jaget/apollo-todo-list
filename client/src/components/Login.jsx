import React, {useState} from "react";
import gql from "graphql-tag";

import { useQuery, useMutation } from "@apollo/react-hooks";

const LOGIN_DETAILS = gql`
    fragment LoginDetails on SigninInput {
        email
        password
    }
`;

const ATTEMPT_SIGNIN = gql`
    mutation AttemptSigning($input: SigninInput!) {
        signIn(input: $input) {
            ...LoginDetails
        }
    }
    ${LOGIN_DETAILS}
`;



const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        signIn({
            variables: {username, password},

            optimisticResponse: {
                __typename: "Mutation",
                signIn: {
                    __typename: "SigninInput",
                    email: username,
                    password: password
                },
            },
        });
    };


    return (<form onSubmit={onSubmit}>
            <label>
                <input type="email" placeholder='Email address' value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label>
                <input type="password" placeholder='Enter password'  value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <input type="submit" value='submit'/>
        </form>

    );
}

export default Login;