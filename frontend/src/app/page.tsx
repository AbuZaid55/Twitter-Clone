import Sidebar from "@/components/Sidebar";
import LoginNSignupButton from "@/components/LoginNSignupButton";
export default function Home() {
  return (
    <div className="grid grid-cols-3 h-screen">
      <Sidebar />
      <div className="border">b</div>
      <LoginNSignupButton/>
    </div>
  );
}
