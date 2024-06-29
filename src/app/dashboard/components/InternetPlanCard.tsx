"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Input } from "postcss";
import { useEffect } from "react";
import { InternetPlanDialog } from "./InternetPlanDialog";
import { LIMITS, getDescription } from "../utils";


export function InternetPlanCard(plan: InternetPlan) {
    function dataLimit() {
        if (plan.limit.type.localeCompare(LIMITS.UNLIMITED)) {
            return "Unlimited"
        }

        return `${plan.limit.data.value} ${plan.limit.data.unit}`
    }

    return (
        <li className="w-full max-w-[350px]">
            <Card className="w-full group">
                <CardHeader className="">
                    <CardTitle className="capitalize">{plan.name}</CardTitle>
                    <CardDescription>{getDescription(plan)}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="border-b border-t flex flex-col gap-2 w-full">
                    <div className="grid grid-cols-5 gap-2 w-full">
                        <h6 className="font-medium col-span-2">Bundles</h6>
                        <div className="col-span-3">{dataLimit()}</div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 w-full">
                        <h6 className="font-medium col-span-2">Speed</h6>
                        <div className="col-span-3">{plan.bandwidth.down.value} {plan.bandwidth.down.unit}</div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 w-full">
                        <h6 className="font-medium col-span-2">Validity</h6>
                        <div className="col-span-3">{plan.limit.time.value} {plan.limit.time.unit}</div>
                    </div>
                    </div>
                    <CardTitle className="text-3xlpb-1 space-x-1">
                        <span className="">@{plan.price.value}</span>
                        <span className="text-xl">{plan.price.unit}</span>
                    </CardTitle>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <InternetPlanDialog plan={plan}>
                        <Button variant="outline" className="w-full uppercase">Purchase Plan</Button>
                    </InternetPlanDialog>
                </CardFooter>
            </Card>
        </li>
    );
}

export function ActiveInternetPlanCard(plan: ActiveInternetPlan) {
    async function activatePlan() {

    }

    function hasBalance(balance: ActiveInternetPlan["balance"]) {
        return balance.data.value !== 0
    }

    function getBalance(balance: ActiveInternetPlan["balance"]) {
        if (hasBalance(balance)) {
            return `${balance.data.value} ${balance.data.unit}`
        }
    }

    return (
        <li>
            <Card className="w-[350px]">
                <CardHeader className="">
                    <CardTitle className="uppercase">Active Plan</CardTitle>
                    <CardDescription>{getDescription(plan)}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 flex flex-col gap-4 items-center uppercase">
                    {plan.name}
                    <span className="border-b w-full" />
                    <div className="font-medium text-xl uppercase text-center">{getDescription(plan)}</div>
                    <span className="border-b w-full" />
                    {hasBalance(plan.balance) && (
                        <div className="grid grid-cols-3 gap-2 w-full">
                            <h6 className="uppercase font-medium uppercase">Balance</h6>
                            <div className="col-span-2">{getBalance(plan.balance)}</div>
                        </div>
                    )}
                    <div className="grid grid-cols-3 w-full">
                        <h6 className="uppercase font-medium uppercase">Expires</h6>
                        <div className="col-span-2">{formatDate(plan.expires)}</div>
                    </div>
                </CardContent>
            </Card>
        </li>
    );
}

/*

                <CardFooter className="flex flex-col gap-2">
                    <Button variant="outline" className="w-full uppercase hover:bg-foreground hover:text-background font-bold" onClick={activatePlan}>Activate Plan</Button>
                </CardFooter>
*/