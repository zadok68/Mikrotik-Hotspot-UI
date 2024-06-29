"use client";

import { useConfig } from "@/components/ConfigProvider";
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
        action: "Sign in"
    }
]

export default function Home() {
    const router = useRouter()
    const [userPin, setUserPin] = useState("");
    const [userPhone, setUserPhone] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const { setUser } = useUser()
    const { config } = useConfig()

    const [inputState, setInputState] = useState<InputState>({
        label: "Phone Number",
        name: "phone",
        placeholder: "Enter your phone number",
        action: "Sign in"
    })

    function stateIs(value: InputState["name"]): boolean {
        return inputState.name.localeCompare(value) === 0
    }

    async function loginUser() {
        setLoading(true)
        setHasError(false)
        /* make network request
        const url = `${config?.baseURL}plugin/hotspot_signin`
        const data = { phone: userPhone, router: config?.router };
        try {
            console.log({ url, config })
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                setHasError(true);
                setLoading(false);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(response.json())
            router.push("/dashboard")    
        } catch (error) {
            setHasError(true);
            setLoading(false)
            throw error;
        } */
        router.push("/dashboard") 
        setLoading(false)
    }

    async function reset() {
        setLoading(false)
        setUserPhone("")
        setUserPin("")
        setInputState(inputStates[0])
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form /*action={`${config?.baseURL}plugin/hotspot_signin`} */>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>{config?.title ? config?.title : "Zeiteck Wifi Login"}</CardTitle>
                        <CardDescription className={hasError ? "text-red-500 font-medium" : ""}>
                            {hasError ? "Could not fetch your account!! Please try again" : "Login to your account to access amazing offers!"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <input type="hidden" name="router" value={config?.router} />
                            <div className="flex flex-col space-y-4">
                                <Label htmlFor={inputState.name}>{inputState.label}</Label>
                                <Input
                                    value={userPhone}
                                    type="text"
                                    name="phone"
                                    onChange={(e) => {
                                        const input = e.target
                                        const value = input.value
                                        stateIs("otp") ? setUserPin(value) : setUserPhone(value)
                                    }}
                                    id={inputState.name} placeholder={inputState.placeholder} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        <Button
                            className="w-full text-center uppercase"
                            type="button"
                            onClick={() => {
                                loginUser()
                            }}
                            disabled={isLoading}
                        >{isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                            {inputState.action}</Button>

                        <div className={`flex justify-between w-full ${(stateIs("phone") || isLoading) ? "invisible" : ""}`}>
                            <Button
                                variant="ghost"
                                type="button"
                                onClick={() => {
                                    reset()
                                }}
                                disabled={isLoading}
                            >Cancel</Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </main>
    );
}
