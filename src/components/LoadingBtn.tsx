import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";

interface LoadingBtnProps extends ButtonProps {
  loading: boolean;
}

const LoadingBtn = ({
  loading,
  disabled,
  className,
  ...props
}: LoadingBtnProps) => {
  return (
    <Button
      disabled={loading || disabled}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      {props.children}
    </Button>
  );
};

export default LoadingBtn;
