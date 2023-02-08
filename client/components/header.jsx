import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <header>
      <div className="w-full">
        <nav className="px-[9vw]">
          <ul className="flex flex-row items-center justify-between w-full h-36">
            <li
              className="flex cursor-pointer"
              onClick={() => router.push("/")}
            >
              <Image
                src="/assets/plusisend.png"
                width={40}
                height={30}
                blurDataURL="/assets/plusisend.png"
                alt="Brand Logo"
              />
              <span className="text-[44px] text-white font-semibold">
                Plusi<span className="text-secondary">Send</span>
              </span>
            </li>
            <li className="hidden sm:list-item">
              <ConnectWallet  />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
