"use client";

import { useUser } from "@/components/UserProvider";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import { useState } from "react";

type InputState = {
    label: string,
    name: "phone" | "otp",
    placeholder: string,
    action: string
}

const inputStates: Array<InputState> = [
    {
        label: "Phone Number",
        name: "phone",
        placeholder: "Enter your phone number",
        action: "Request OTP"
    },
    {
        label: "One Time Pin",
        name: "otp",
        placeholder: "Enter the one time pin.",
        action: "Sign In"
    }
]
export default function Home() {
    const router = useRouter()
    const [userPin, setUserPin] = useState("");
    const [userPhone, setUserPhone] = useState("")
    const [isLoading, setLoading] = useState(false)
    const {setUser} = useUser()
    const [inputState, setInputState] = useState<InputState>(inputStates[0])

    function stateIs(value: InputState["name"]): boolean {
        return inputState.name.localeCompare(value) === 0
    }

    async function requestOtp(phoneNumber: string) {
        setLoading(true)
        // make network request
        const success = await new Promise<boolean>((resolve) => {
            setTimeout(() => resolve(true), 3000)
        })
        if(success) {

        }
        setInputState(inputStates[1])
        setLoading(false)
    }

    async function verifyOTP(phoneNumber: string, otp: string) {
        setLoading(true)
        // make network request
        const success = await new Promise<boolean>((resolve) => {
            setTimeout(() => resolve(true), 3000)
        })

        if(success) {
            setUser({ name: "0758400840", balance:20})
            router.replace("/dashboard")
        }
    
        setLoading(false)
    }

    async function reset() {
        setLoading(false)
        setUserPhone("")
        setUserPin("")
        setInputState(inputStates[0])
    }

    return (
        <main className="flex min-h-screen h-screen flex-col items-center justify-between p-24">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Zeiteck Wifi Login</CardTitle>
                    <CardDescription>Login to your account to access amazing offers!</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-4">
                                <Label htmlFor={inputState.name}>{inputState.label}</Label>
                                <Input
                                    value={stateIs("otp") ? userPin : userPhone}
                                    type="text"
                                    onChange={(e) => {
                                        const input = e.target
                                        const value = input.value
                                        stateIs("otp") ? setUserPin(value) : setUserPhone(value)
                                    }}
                                    id={inputState.name} placeholder={inputState.placeholder} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button
                    className="w-full text-center uppercase"
                        onClick={() => {
                            if (stateIs("phone")) {
                                requestOtp(userPhone)
                            } else {
                                verifyOTP(userPhone, userPin)
                            }
                        }}
                        disabled={isLoading}
                    >{isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                        {inputState.action}</Button>
                        
                        <div className={`flex justify-between w-full ${(stateIs("phone") || isLoading) ? "invisible" : ""}`}>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            reset()
                        }}
                        disabled={isLoading}
                    >Cancel</Button>

                    <Button
                        onClick={() => {
                                requestOtp(userPhone)
                        }}
                        variant="ghost"
                    >Resend OTP.</Button>
                                        </div>
                </CardFooter>
            </Card>
        </main>
    );
}
