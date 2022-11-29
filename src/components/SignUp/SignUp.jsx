import React from 'react';
import StepOneForm from "./StepOneForm";
import StepTwoForm from "./StepTwoForm";
import StepThreeForm from "./StepThreeForm";

let dialog = undefined;

const SignUp = ({closeSignUpForm}) => {
    const [step, setStep] = React.useState(1);
    const [email, setEmail] = React.useState('');
    const [token, setToken] = React.useState('');

    switch (step) {
        case 1:
            dialog = (
                <StepOneForm
                    setStep={setStep}
                    email={email}
                    setEmail={setEmail}
                />
            );
            break;
        case 2:
            dialog = (
                <StepTwoForm
                    setStep={setStep}
                    email={email}
                    setEmail={setEmail}
                    setToken={setToken}
                />
            );
            break;
        case 3:
            dialog = (
                <StepThreeForm
                    token={token}
                    closeSignUpForm={closeSignUpForm}
                />
            );
            break;
    }


    return dialog;
};

export default SignUp;