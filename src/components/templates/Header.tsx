
import {KeyboardIcon} from "lucide-react";
import React, {useEffect, useState} from "react";
import {getUser} from "@/components/templates/_utils/actions";
import {NavigationMenu, NavigationMenuLink, NavigationMenuList} from "@/components/ui/navigation-menu";
import Link from "next/link";

export const Header = () => {

    const [user, setUser] = useState<any>();

    useEffect(() => {
        getUser().then((res=>{
            setUser(res)
        }))
    }, []);

    return <div className="flex justify-center gap-2 md:justify-start p-6 md:p-10">
        <div className="w-full px-4 py-6 flex items-center justify-between">
            <div className="flex justify-center gap-2 md:justify-start">
                <a href="#" className="flex items-center gap-2 font-medium">
                    <div
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-300 text-primary-foreground">
                        <KeyboardIcon className="size-4"/>
                    </div>
                    Typle
                </a>
            </div>
            <NavigationMenu>
                <NavigationMenuList className="flex gap-4">
                    <NavigationMenuLink asChild>
                        <Link
                            href="#"
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                            prefetch={false}
                        >
                            Home
                        </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                        <Link
                            href="#"
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                            prefetch={false}
                        >
                            Take a Test
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
        {
            user && <div className={'bg-neutral-200 p-2 size-10 flex justify-center items-center rounded-full'}>
                {(user.user.email[0].toUpperCase())}
            </div>
        }


    </div>
}