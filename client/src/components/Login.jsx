import React, {useState} from "react";
import gql from "graphql-tag";

import {useQuery, useMutation} from "@apollo/react-hooks";

//todo cannot use login input as it is an "input" not a graphql "type"
const LOGIN_DETAILS = gql`
    fragment LoginDetails on AuthUser {
        token
        user {
            email
        }
    }
`;

const ATTEMPT_SIGNIN = gql`
    mutation AttemptSignin($input: LoginInput!) {
        login(input: $input) {
            ...LoginDetails
        }
    }
    ${LOGIN_DETAILS}
`;


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');

    const [login, loginItem] = useMutation(ATTEMPT_SIGNIN, {
        update(cache, {data: {login}}) {
            const {loginItem} = cache.readQuery({query: ATTEMPT_SIGNIN});

            cache.writeQuery({
                query: ATTEMPT_SIGNIN,
                data: {loginItem},
            });
        },
    });


    const submit = (e) => {
        e.preventDefault();
        onSubmit({email: username, password});
    }

    const onSubmit = (input) => {
        // e.preventDefault();
        login({
            variables: {input},

            // optimisticResponse: {
            //     __typename: "Mutation",
            //     signin: {
            //         __typename: "SigninInput",
            //         email: username,
            //         password: password
            //     },
            // },
        });
    };


    return (<form onSubmit={submit}>
            <label>
                <input type="email" placeholder='Email address' value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label>
                <input type="password" placeholder='Enter password' value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <input type="submit" value='submit'/>
        </form>

    );
}

export default Login;