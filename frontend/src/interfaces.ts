export interface User {
    id:string
    name:string 
    email:string 
    avatar:string 
    createdAt:string
}
export interface TwitterSidebarButton {
    title: string;
    icon: React.ReactNode;
    link:string
  }
export interface Profile {
    email: string;
    name: string;
    picture: string;
}
export interface Account {
    provider: string;
}
