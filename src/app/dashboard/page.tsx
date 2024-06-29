"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ActiveInternetPlanCard, InternetPlanCard } from "./components/InternetPlanCard";
import NavigationBar from "@/components/NavigationBar";
import { useUser } from "@/components/UserProvider";
import { useConfig } from "@/components/ConfigProvider";
import UserStatusCard from "./components/UserStatusCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const router = useRouter()
  const { user } = useUser()
  const { config } = useConfig()
  const plans = config?.plans
  const active: ActiveInternetPlan = {
    id: '1',
    name: 'Simba',
    router: 1,
    price: { unit: 'KES', value: 1000 },
    bandwidth: {
      up: { unit: 'Mb/s', value: 16 },
      down: { unit: 'Mb/s', value: 16 }
    },
    limit: {
      type: 'Monthly',
      data: { unit: 'GB', value: 100 },
      time: { unit: 'Days', value: 30 }
    },
    balance: {
      data: { unit: 'GB', value: 50 },
      time: { unit: 'Days', value: 15 }
    },
    expires: '2024-07-15'
  }

  console.log({ config })
  if (!user) {
    router.replace("/login")
  }

  return (
    <>
      <NavigationBar title={config?.title || ""} balance={user.accountBalance} showSettings={true} />
      <main className="flex min-h-screen flex-col items-center justify-between md:p-16 p-4 gap-8">
        <section className="flex flex-col items-center justify-between w-full">
          <UserStatusCard user={user} plan={active} />
        </section>
        <section className="flex flex-col items-center justify-between w-full">
          <Card className="w-full">
            <CardHeader className="">
              <CardTitle className="">Available Internet Plans</CardTitle>
              <CardDescription>Explore our range of budget-friendly internet plans designed to fit your needs. Select a plan and enjoy seamless internet access today!"</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="mb-4 font-medium uppercase uppercase text-3xl"></h4>
              <span className="border-b w-full" />
              <ul className="flex md:flex-row flex-col gap-8 md:flex-wrap md:max-w-screen m-auto py-8 md:justify-around items-center">{
                plans?.map(plan => <InternetPlanCard key={plan.id} {...plan} />)
              }
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>

    </>
  );
}
