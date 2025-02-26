import Input from "@/components/ui/input";
import { X } from "lucide-react";

const FormInputInterset = () => {
  return (
    <form className="pt-6">
      <div className="w-full rounded-xl bg-white-opacity px-6 py-4">
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center rounded-lg bg-white/10 px-4 py-2 text-white">
            {}
            <button className="ml-2">
              <X size={18} />
            </button>
          </div>
        </div>

        <Input
          type="text"
          className="mt-2 w-full rounded-lg border border-secondary bg-transparent px-3 py-2 text-white focus:outline-none"
        />
      </div>
    </form>
  );
};

export default FormInputInterset;
