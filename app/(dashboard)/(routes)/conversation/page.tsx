import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import React from "react";

const Convesation = () => {
  return (
    <div>
      <Heading
        title="Convesation"
        description="Convesation description"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
    </div>
  );
};

export default Convesation;
