import { useConfig } from "@/components/ConfigProvider"
import { useUser } from "@/components/UserProvider"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMediaQuery } from "@/hooks/use-media-query"
import React from "react"
import { useState } from "react"
import { purchasePlan, verifyPayment } from "../utils"

export function InternetPlanDialog(props: { children: any, plan: InternetPlan }) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { user } = useUser()

  const { title, description } = {
    title: `Purchase Plan: ${props.plan.name}`,
    description: (user.balance < props.plan.price.value ? "Please top up your account to purchase plan." : "Click on activate plan to continue.")
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {props.children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <PurchasePlanForm {...props} onChange={setOpen} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {props.children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <PurchasePlanForm {...props} onChange={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}


function PurchasePlanForm(props: { plan: InternetPlan, onChange: (v: boolean) => void }) {
  const { user } = useUser()
  const { config } = useConfig()
  const [phone, setPhoneNumber] = useState(user.name)
  const [amount, setAmount] = useState(props.plan.price.value)
  const [isLoading, setLoading] = useState(false)
  const [inputError, setInputError] = useState(false)
  const [hasError, setHasError] = useState(false);
  const [verify, setVerify] = useState(false)

  async function activatePlan() {
    setLoading(true)
    if (!phone || phone.length < 10) {
      setLoading(false)
      return setInputError(true)
    }

    try {
      await purchasePlan({ plan: props.plan, phone, mac: config?.mac! })
      setVerify(true)
      const done = await new Promise<boolean>((resolve) => {
        setTimeout(async () => {
          return await verifyPayment(phone)
        }, 2000)
      })

      if (!done) {
        setVerify(false)
      }

      setLoading(false)
    } catch {
      setVerify(false)
      setHasError(true)
      setLoading(false)
    } finally {
      setVerify(false)
      setLoading(false);
      props.onChange(false)
    }
  }

  return (
    <div className="grid gap-4 p-4">
      {
        hasError || verify ? (
          hasError ? (
            <h4>
              Could not verify payment! Please try again.
            </h4>) :
            (
              <h4>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Please wait as we verify payment;
              </h4>
            )
        ) : (
          <form className="w-full">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-4">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  value={phone}
                  type="text"
                  onChange={(e) => {
                    const input = e.target
                    const value = input.value
                    setPhoneNumber(value)
                    setInputError(false)
                  }}
                  id="phoneNumber" placeholder="Phone Number" />
                <span className={`${inputError ? "text-red-500" : "hidden"}`}>Please provide a valid phone number!</span>
              </div>
              <div className="flex flex-col space-y-4">
                <Label htmlFor="amount">Price</Label>
                <Input
                  value={amount}
                  type="text"
                  disabled
                  className="text-foreground"
                  onChange={(e) => {
                    const input = e.target
                    const value = input.value
                    setAmount(Number(value))
                  }}
                  id="amount" placeholder="Top Up Amount" />

              </div>
              <Button type="button" onClick={() => {
                activatePlan()
              }} className="uppercase">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isLoading ? "Initiated Payment" : "Purchase Plan"
                }</Button>
            </div>
          </form>
        )
      }

    </div>
  )
}
