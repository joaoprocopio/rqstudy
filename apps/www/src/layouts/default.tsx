import type { QueryClient } from "@tanstack/react-query"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { ChartPie, ChevronRight, ChevronsUpDown, LogOut, Moon, Sun } from "lucide-react"
import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "~/components/ui/sidebar"
import { Skeleton } from "~/components/ui/skeleton"
import { useTheme } from "~/hooks/use-theme"
import { AuthServices } from "~/services/auth"
import { OrgServices } from "~/services/org"

const navGroups = [
  {
    title: "Analytics",
    pathname: "/analytics",
    icon: ChartPie,
    links: [
      {
        title: "Regionalidade",
        pathname: "/analytics/regionalidade",
      },
    ],
  },
] as const

const userQueryOptions = queryOptions({
  queryKey: ["user"],
  queryFn: AuthServices.getUser,
})

const orgQueryOptions = queryOptions({
  queryKey: ["org"],
  queryFn: OrgServices.getOrg,
})

type LoaderData = {
  user: ReturnType<typeof AuthServices.getUser>
  org: ReturnType<typeof OrgServices.getOrg>
}

export function loader(queryClient: QueryClient) {
  return function () {
    return {
      user: queryClient.ensureQueryData(userQueryOptions),
      org: queryClient.ensureQueryData(orgQueryOptions),
    } satisfies LoaderData
  }
}

export default function DefaultLayout() {
  const loaderData = useLoaderData() as LoaderData
  const location = useLocation()
  const [theme, setTheme] = useTheme()

  const userQuery = useQuery({
    ...userQueryOptions,
    initialData: loaderData.user as unknown as Awaited<LoaderData["user"]>,
  })
  const orgQuery = useQuery({
    ...orgQueryOptions,
    initialData: loaderData.org as unknown as Awaited<LoaderData["org"]>,
  })

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              {orgQuery.isLoading && (
                <div className="flex gap-2 p-2 group-data-[collapsible=icon]:!p-0">
                  <Skeleton className="aspect-square size-8" />

                  <div className="flex flex-col justify-between truncate">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              )}

              {orgQuery.isSuccess && (
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  tooltip={orgQuery.data.name}>
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    {orgQuery.data.abbr}
                  </div>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="text-muted-foreground truncate text-xs">Organização</span>
                    <span className="truncate font-semibold">{orgQuery.data.name}</span>
                  </div>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navGroups.map((navGroup) => {
                const prefixMatch = location.pathname.startsWith(navGroup.pathname)

                return (
                  <Collapsible
                    asChild
                    key={navGroup.title}
                    defaultOpen={prefixMatch}
                    className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={navGroup.title}>
                          {navGroup.icon && <navGroup.icon />}
                          <span>{navGroup.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {navGroup.links?.map((link) => {
                            const routeMatch = location.pathname === link.pathname

                            return (
                              <SidebarMenuSubItem key={link.title}>
                                <SidebarMenuSubButton asChild isActive={routeMatch}>
                                  <Link to={link.pathname}>{link.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                {userQuery.isLoading && (
                  <div className="flex gap-2 p-2 group-data-[collapsible=icon]:!p-0">
                    <Skeleton className="aspect-square size-8" />

                    <div className="flex flex-col justify-between truncate">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                )}

                {userQuery.isSuccess && (
                  <>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage
                            src={userQuery.data.photoURL || undefined}
                            alt={userQuery.data.name}
                          />

                          <AvatarFallback className="rounded-lg">
                            {userQuery.data.abbr}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">{userQuery.data.name}</span>
                          <span className="truncate text-xs">{userQuery.data.email}</span>
                        </div>
                        <ChevronsUpDown className="ml-auto size-4" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                      side="bottom"
                      align="end"
                      sideOffset={4}>
                      <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                          <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage
                              src={userQuery.data.photoURL || undefined}
                              alt={userQuery.data.name}
                            />
                            <AvatarFallback className="rounded-lg">
                              {userQuery.data.abbr}
                            </AvatarFallback>
                          </Avatar>

                          <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{userQuery.data.name}</span>
                            <span className="truncate text-xs">{userQuery.data.email}</span>
                          </div>
                        </div>
                      </DropdownMenuLabel>

                      <DropdownMenuSeparator />

                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <LogOut />
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </>
                )}
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="bg-background sticky inset-0 flex h-16 w-full shrink-0 items-center justify-between border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SidebarTrigger />

          <Button onClick={toggleTheme} variant="ghost" size="icon" className="h-7 w-7">
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </header>

        <div>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
