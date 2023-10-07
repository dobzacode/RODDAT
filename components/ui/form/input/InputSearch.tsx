import { cn } from "@/utils/utils";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { FC, InputHTMLAttributes, LegacyRef, Ref, forwardRef } from "react";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
}

const InputSearch: FC<SearchProps> = forwardRef<HTMLInputElement, SearchProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "box-border flex items-center rounded-lg border px-extra-small shadow-inner",
          className,
        )}
      >
        <Icon path={mdiMagnify} size={2}></Icon>
        <input
          className={cn(
            " body placeholder:body w-full p-extra-small",
            className,
          )}
          type="search"
          name={props.id}
          ref={ref}
          {...props}
        ></input>
      </div>
    );
  },
);

InputSearch.displayName = "InputSearch";

export default InputSearch;
