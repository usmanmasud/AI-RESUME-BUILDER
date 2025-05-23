"use client";

import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import React from "react";

const GetSubscriptionBtn = () => {
  const premiumModal = usePremiumModal();

  return (
    <Button onClick={() => premiumModal.setOpen(true)} variant="premium">
      Get Premimum subscription
    </Button>
  );
};

export default GetSubscriptionBtn;
