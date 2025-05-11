"use client";

import LoadingBtn from "@/components/LoadingBtn";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createCustomerPortalSession } from "./action";

const ManageSubscriptionBtn = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const redirectUrl = await createCustomerPortalSession();
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast({
        description: "Something went wrong please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingBtn onClick={handleClick} loading={loading}>
      Manage subscription
    </LoadingBtn>
  );
};

export default ManageSubscriptionBtn;
