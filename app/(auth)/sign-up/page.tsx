'use client'

import { AuthForm } from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signupSchema } from "@/lib/validations";

export default function Signup() {
    return(
        <AuthForm
            type={'SIGN_UP'}
            schema={signupSchema}
            defaultValues={{ fullName: '', email: '', universityId: 0, universityCard: '', password: '' }}
            onSubmit={signUp}
        />
    )
}