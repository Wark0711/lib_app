'use client'

import { AuthForm } from "@/components/AuthForm";
import { signinSchema } from "@/lib/validations";

export default function Signin() {
    return (
        <AuthForm
            type={'SIGN_IN'}
            schema={signinSchema}
            defaultValues={{ email: '', password: '' }}
            // onSubmit={() => { }}
        />
    )
}