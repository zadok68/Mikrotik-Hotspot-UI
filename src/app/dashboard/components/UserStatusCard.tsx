"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Input } from "postcss";
import { useEffect } from "react";
import { InternetPlanDialog } from "./InternetPlanDialog";
import { getDescription } from "../utils";


export default function UserStatusCard({ plan, user }: { plan: ActiveInternetPlan, user: User }) {
    function hasBalance(balance: ActiveInternetPlan["balance"]) {
        return balance.data.value !== 0
    }

    function getBalance(balance: ActiveInternetPlan["balance"]) {
        if (hasBalance(balance)) {
            return `${balance.data.value} ${balance.data.unit}`
        }
    }

    return (
        <Card className="min-w-[320px] w-full">
            <CardHeader className="">
                <CardTitle className="">Status</CardTitle>
                <CardDescription>Real-time user profile and connectivity details</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <CardTitle className="border-b pb-1">Profile</CardTitle>
                <div className="grid grid-cols-5 gap-2 w-full">
                    <h6 className="font-medium col-span-2">Wallet Balance</h6>
                    <div className="col-span-3">KES {user.accountBalance}</div>
                </div>
                <div className="grid grid-cols-5 gap-2 w-full">
                    <h6 className="font-medium col-span-2">Phone Number</h6>
                    <div className="col-span-3">{user.phoneNumber}</div>
                </div>
                <div className="grid grid-cols-5 gap-2 w-full">
                    <h6 className="font-medium col-span-2">IP Address</h6>
                    <div className="col-span-3">{user.macAddress}</div>
                </div>
                {hasBalance(plan.balance) && (
                    <>
                        <CardTitle className="border-b pb-1">Current Plan</CardTitle>
                        <div className="grid grid-cols-5 gap-2 w-full">
                            <h6 className="font-medium col-span-2">Name</h6>
                            <div className="col-span-3">{plan.name}</div>
                        </div>
                        <div className="grid grid-cols-5 gap-2 w-full">
                            <h6 className="font-medium col-span-2">Description</h6>
                            <div className="col-span-3">{getDescription(plan)}</div>
                        </div>
                        <div className="grid grid-cols-5 gap-2 w-full">
                            <h6 className="font-medium col-span-2">Data Balance</h6>
                            <div className="col-span-3">{getBalance(plan.balance)}</div>
                        </div>
                        <div className="grid grid-cols-5 w-full">
                            <h6 className="font-medium col-span-2">Expires on</h6>
                            <div className="col-span-2">{formatDate(plan.expires)}</div>
                        </div>
                    </>
                )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button variant="outline" className="w-full uppercase  font-bold">Topup Account</Button>
            </CardFooter>
        </Card>
    );
}

/*
                
*/