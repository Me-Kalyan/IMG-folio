'use client';
import { motion } from 'framer-motion';

export default function InvertSection({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.section
            initial={{ backgroundColor: "#ffffff", color: "#000000" }}
            whileInView={{ backgroundColor: "#000000", color: "#ffffff" }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.2 }} // Triggers when 20% of the section is visible
            className={`relative py-32 px-4 ${className}`}
        >
            {children}
        </motion.section>
    );
}
