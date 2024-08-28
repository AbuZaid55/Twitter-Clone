import Sidebar from "@/components/Sidebar";
import LoginNSignupButton from "@/components/LoginNSignupButton";
import Main from "@/components/Main";
export default function Home() {
  return (
    <div className="grid grid-cols-7 h-screen">
      <div className="col-span-2"><Sidebar /></div>
      <div className="col-span-3"><Main/></div>
      <div className="col-span-2"><LoginNSignupButton/></div>
    </div>
  );
}
