"use client";

import { useConfig } from "@/components/ConfigProvider";
import { DockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  const { config, setConfig } = useConfig()

  async function getRouterData() {
    if (typeof window !== undefined) {
      const interval = setInterval(() => {
        const data = localStorage.getItem("ROUTER")
        if (data) {
          setConfig({ routerProps: JSON.parse(data) })
          setLoaded(true)
          clearInterval(interval)
        }
      }, 300)
    }
  }

  useEffect(() => {
    if (loaded) {
      router.replace("/login")
    }
  }, [loaded, router])

  useEffect(() => {
    if (config) {
      setTimeout(() => {
        getRouterData()
      }, 300)
    }
  },)

  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-center p-24">
      <div className="loader"></div>
      <script dangerouslySetInnerHTML={{
        __html: `
      window.addEventListener("load", function(){
        const form = document.getElementById("server-form")
        console.log({ form })
        const hiddenInputs = form.querySelectorAll('input[type="hidden"]');
        const values = {};
        hiddenInputs.forEach(input => {
          values[input.name] = input.value;
        });
        console.log({ values })
        localStorage.setItem("ROUTER", JSON.stringify(values))
      })
      `}} />
      <form id="server-form">
        <input type="hidden" name="mac" value="$(mac)" />
        <input type="hidden" name="ip" value="$(ip)" />
        <input type="hidden" name="username" value="$(username)" />
        <input type="hidden" name="link-login" value="$(link-login)" />
        <input type="hidden" name="link-orig" value="$(link-orig)" />
        <input type="hidden" name="error" value="$(error)" />
      </form>
    </main>
  );
}
