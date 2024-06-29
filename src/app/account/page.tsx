"use client";

import NavigationBar from "@/components/NavigationBar";
import { useUser } from "@/components/UserProvider";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter()
    const { user } = useUser()
    const [phoneNumber, setPhoneNumber] = useState(user.name)
    const [amount, setAmount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)


    return (
        <>
            <NavigationBar title={"Wallet"} balance={user.balance} />
            <main className="flex min-h-screen h-screen flex-col items-center p-24">
                <Card className="w-[350px]">
                    <CardHeader className="text-center flex justify-center border-b">
                        <CardTitle className="uppercase">Mpesa</CardTitle>
                        <CardDescription>Enter details to topup with mpesa</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 flex flex-col gap-4 items-center uppercase">
                        <form className="w-full">
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-4">
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input
                                        value={phoneNumber}
                                        type="text"
                                        onChange={(e) => {
                                            const input = e.target
                                            const value = input.value
                                            setPhoneNumber(value)
                                        }}
                                        id="phoneNumber" placeholder="Phone Number" />
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <Label htmlFor="amount">Top Up Amount</Label>
                                    <Input
                                        value={amount}
                                        type="text"
                                        onChange={(e) => {
                                            const input = e.target
                                            const value = input.value
                                            setAmount(Number(value))
                                        }}
                                        id="amount" placeholder="Top Up Amount" />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        <Button
                            className="w-full text-center uppercase"
                            onClick={() => {

                            }}
                            disabled={isLoading}
                        >{isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )} Top Up</Button>

                    </CardFooter>
                </Card>
            </main>
        </>
    );
}
