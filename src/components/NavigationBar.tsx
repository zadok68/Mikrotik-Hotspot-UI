"use client"

import { CreditCard, LogOut, Settings } from "lucide-react"
import { useUser } from "./UserProvider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function NavigationBar(props: { showSettings?: boolean, title: string, balance: number }) {
    const router = useRouter()
    const { setUser } = useUser()
    function logout() {
        router.replace("/login")
    }

    function getBalance() {
        return props.balance > 0 ? `${props.balance} KES` : ""
    }

    return (
        <nav className="h-14 border-b w-full flex sticky top-0 flex items-center font-medium text-lg p-2 gap-4 bg-background">
            <h1 className="p-4">{props.title}</h1>
            <span className="flex-grow" />
        </nav>
    )
}
/*
<div className="p2 uppercase"> {getBalance()}</div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="w-12 h-12">
                        <Settings />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className={props.showSettings ? "" : "hidden"}>
                        <DropdownMenuItem
                            onClick={
                                () => router.push("/account")
                            }
                        >
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Account</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </div>
                    <DropdownMenuItem onClick={() => logout()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            */