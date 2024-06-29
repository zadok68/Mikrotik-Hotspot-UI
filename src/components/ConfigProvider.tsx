"use client"

import { fetchJSON } from "@/lib/utils";
import loadConfig from "next/dist/server/config";
import { createContext, useState, useEffect, useContext } from "react";

interface ConfigContext {
    config: {
        title: string,
        description: string,
        baseURL: string,
        plans: Array<InternetPlan>
        router: number,
        mac: string,
        routerProps: any
    } | null;
    setConfig: (config: Partial<ConfigContext["config"]>) => void
}

const ConfigContext = createContext<ConfigContext>({
    config: null,
    setConfig: () => {}
});

export default function ConfigProvider({ children }: any) {
    const [config, setConfig] = useState<ConfigContext["config"] | null>(null);

    useEffect(() => {
        new Promise<void>(async (resolve) => {
            try {
                const response = await fetch("/config.json");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const router = localStorage.getItem("ROUTER")
                if (router) {
                    data["routerProps"] = JSON.parse(router)
                }
                setConfig(data)
                return data;
            } catch (error) {
                console.error('There was a problem fetching config', error);
                throw error; // Re-throw the error to propagate it
            }
        })
    }, []);

    return (
        <ConfigContext.Provider value={{ config, setConfig: (props) => {
            const all = Object.assign({config, ...props})
            setConfig(all)
        } }}>
            {children}
        </ConfigContext.Provider>
    );
}

export const useConfig = () => useContext(ConfigContext);
