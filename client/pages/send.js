import { ConnectWallet, Web3Button } from "@thirdweb-dev/react";
import { Input } from "@mantine/core";
import styles from "../styles/Home.module.css";
import { CONTRACT_ADDRESS } from "@/constants";
import { useState, useEffect } from "react";
import { useGlobalContext } from "@/contexts/global-context";
import { ethers } from "ethers";
import { RiDeleteBin6Line } from  "react-icons/ri"

export default function Send() {
  const [form, setForm] = useState({
    recipients: [],
    amounts: [],
    totalVal: 0
  });
  const [newRecipent, setNewRecipent] = useState({
    addr: "",
    amount: "",
  });
  const { address, setLoading } = useGlobalContext();

  function resetRecipientList() {
    setForm({
      ...form,
      recipients: [],
      amounts: [],
      totalVal: 0,
    });
  }

  function reset() {
    setNewRecipent({
      ...newRecipent,
      addr: "",
      amount: "",
    });
  }

  function handleInputChange(name, e) {
    setNewRecipent({ ...newRecipent, [name]: e.target.value });
  }

  function removeRecipient(index) {
    let totalAmt = 0;
    
    form.amounts.forEach((amt, i) => {
       if(i !== index) {
        totalAmt += Number.parseFloat(ethers.utils.formatEther(amt));
       }
    })
    
    
    setForm({
      ...form,
      recipients: form.recipients.filter((addr, i) => i !== index),
      amounts: form.amounts.filter((amt, i) => i !== index),
      totalVal: totalAmt,
    });
  }

  function addRecipient(e) {
    e.preventDefault();

    if (!address) {
      alert("Please connect to a wallet");
      return;
    }

    if (
      newRecipent.addr.length == 0 ||
      newRecipent.amount.length == 0 ||
      newRecipent.amount.includes("-")
    ) {
      alert("Invalid field value");
      return;
    }

    const amt = ethers.utils.parseEther(newRecipent.amount);
    const totalAmt =
      Number.parseFloat(form.totalVal) + Number.parseFloat(newRecipent.amount);

    setForm({
      ...form,
      recipients: [...form.recipients, newRecipent.addr],
      amounts: [...form.amounts, amt],
      totalVal: totalAmt
    });
    reset();
  } 
  

  return (
    <div className={`${styles.container} my-10 sm:mt-10 sm:mb-20`}>
      <main className={styles.main}>
        <h1 className={`text-[2.5rem] sm:text-[4rem] ${styles.title}`}>
          Send Ether To Multiple Address
        </h1>

        <p className={`${styles.description} text-[1rem] sm:text-[1.5rem]`}>
          Send ether to multiple addresses at once. PlusiSend is typically done
          through the use of a list of addresses and amount which is used to
          send the ethers.
        </p>

        <div className={`block sm:hidden ${styles.connect}`}>
          <ConnectWallet />
        </div>

        <form className="max-w-md w-full" onSubmit={addRecipient}>
          <div className="w-full flex flex-col sm:flex-row flex-wrap gap-[10px]">
            <div className="flex w-full gap-1 flex-1 flex-col">
              <Input.Label className="text-white text-[18px]">
                Recipient Address
              </Input.Label>
              <Input
                size="md"
                placeholder="Enter Address"
                className="sm:min-w-[300px]"
                value={newRecipent.addr}
                onChange={(e) => handleInputChange("addr", e)}
              />
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row flex-wrap gap-[10px] mt-6">
            <div className="flex w-full gap-1 flex-1 flex-col">
              <Input.Label className="text-white text-[18px]">
                Amount
              </Input.Label>
              <Input
                size="md"
                placeholder="0.0002"
                className="sm:min-w-[300px]"
                value={newRecipent.amount}
                onChange={(e) => handleInputChange("amount", e)}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <button
              type="submit"
              className="bg-black text-[16px] text-primaryText py-[0.75em] px-[1.25em] rounded-[0.5em] font-medium w-[200px] border-[2px] border-[#262627] hover:bg-[#262627] hover:border-[#262627]"
            >
              ADD
            </button>
          </div>
        </form>

        {address && form.recipients.length !== 0 && (
          <>
            <div className="w-full max-w-md flex flex-col items-center rounded-[0.5em] border-[2px] border-[#262627] mt-8">
              <p
                className={`text-center text-[1rem] sm:text-[1.5rem] py-4 font-bold bg-[#262627] w-full mt-0`}
              >
                RECIPIENTS
              </p>

              {form.recipients?.map((addr, index) => (
                <div
                  className="px-4 border-b border-white/40 last:border-none py-4"
                  key={index}
                >
                  <p className={`text-[0.8rem] sm:text-[1rem] truncate `}>
                    Addr: <span className="text-white/60">{addr}</span>
                  </p>
                  <p
                    className={`text-[0.8rem] sm:text-[1rem] text-left truncate`}
                  >
                    Amount:{" "}
                    <span className="text-white/60">
                      {" "}
                      {ethers.utils.formatEther(form.amounts[index])}{" "}
                    </span>
                  </p>
                  <div className="w-full flex flex-row justify-end">
                    <RiDeleteBin6Line
                      color="rgb(255 255 255 / 0.6)"
                      className="cursor-pointer"
                      onClick={() => removeRecipient(index)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Web3Button
                contractAddress={CONTRACT_ADDRESS}
                action={(contract) => {
                  setLoading((prev) => true);
                  contract
                    .call("send", form.recipients, form.amounts, {
                      value: ethers.utils.parseEther(form.totalVal.toString()),
                    })
                    .then((res) => {
                      console.log(res);
                      resetRecipientList();
                      alert("Transaction successful!");
                      setLoading((prev) => false);
                    })
                    .catch((err) => {
                      console.log(err.message);
                      alert(err.message);
                    });
                }}
              >
                SEND
              </Web3Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

Send.title = "Send ether now";
