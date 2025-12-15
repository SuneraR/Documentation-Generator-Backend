import { useFormStatus } from "react-dom";


export default function ContactButton() {
const formStatus = useFormStatus();

  return (
    <button disabled={formStatus.pending} className={`bg-indigo-700 ${!formStatus.pending ? "hover:bg-indigo-800" : ""} border border-white/20 py-3 px-8 w-full sm:w-fit text-white font-semibold shadow-lg rounded-lg transition-all duration-200 text-sm sm:text-base`} >
      {formStatus.pending ? "Sending..." : "Send Message"}
    </button>
  );
}
