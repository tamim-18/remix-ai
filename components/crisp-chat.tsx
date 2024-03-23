"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("28466e1f-1dd4-4682-8b7d-2e5b79688fda");
  }, []);

  return null;
};
