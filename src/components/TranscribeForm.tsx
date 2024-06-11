'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useFormStatus, useFormState } from 'react-dom';
import { Button } from './ui/button';
import { Transcribe } from '@/app/actions';
import { callSchema, taskSchema, Calls } from "@/data/schema"

interface IInitial {
    error: string,
    formValues: {
        callURL: string,
        callID: string
    }
}

const initial: IInitial = {
    error: "",
    formValues: {
        callURL: "",
        callID: ""
    }
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {
                pending ? "Transcribing..." : "Transcribe"
            }
        </Button>
    )
}

export default function TranscribeForm({ call }: { call: Calls }) {

    const [state, formAction] = useFormState(Transcribe, initial)
    const formRef = useRef<HTMLFormElement>(null)


    return (
        <form ref={formRef} action={formAction}>

            <input type="hidden" name="callURL" id="callURL" defaultValue={call.Call_Recording} />
            <input type="hidden" name="callID" id="callID" defaultValue={call.id} />
            <SubmitButton />
        </form>
    )
}
