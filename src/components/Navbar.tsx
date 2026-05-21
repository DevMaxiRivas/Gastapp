import { Link } from 'react-router-dom';
import { ModeToggle } from './ModeToggle';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { APP_NAME } from '@/lib/constants';

export function NavBar() {
    return (
        <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl">
            <h1 className="text-3xl font-bold">
                {APP_NAME}
            </h1>
            <NavigationMenuNavBar />
            <ModeToggle />
        </div>
    );
}

export function NavigationMenuNavBar() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}
                        render={<Link to="/">Home</Link>}
                    />
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}
                        render={<Link to="/login">Login</Link>}
                    />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}