
import SignUpForm from "@/components/auth/SignUpForm";
import { motion } from "framer-motion";

const RegisterPage = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <SignUpForm />
        </motion.div>
      </div>
    </section>
  );
};

export default RegisterPage;
