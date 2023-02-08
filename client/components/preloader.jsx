import { Loader } from "@mantine/core";
import { useGlobalContext } from "@/contexts/global-context";

export default function PreLoader({ children }) {
  const { loading } = useGlobalContext();

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
          <Loader color="blue" />
          <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
            Please wait...
          </p>
        </div>
      )}
      {children}
    </>
  );
}
