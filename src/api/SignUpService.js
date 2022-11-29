import useAxios from "./useAxios";

const SignUpService = (function() {
    const axios = useAxios();

    const signUp = async (email) => {
        let response = await axios.post(`/security/sign-up`, {email: email});

        return response.data;
    }

    const verify = async (email, code) => {
        let response = await axios.post(`/security/sign-up/verify`, {email: email, code: code});

        return response.data;
    }

    const confirm = async (password, name, token) => {
        let response = await axios.post(
            `/security/sign-up/confirm`,
            {
                password: password,
                name: name,
                token: token
            }
        );

        return response.data;
    }

    return {
        signUp: signUp,
        verify: verify,
        confirm: confirm
    }
})();

export default SignUpService;