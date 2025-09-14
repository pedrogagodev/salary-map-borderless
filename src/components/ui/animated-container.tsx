import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedContainerProps {
	children: ReactNode;
	delay?: number;
	duration?: number;
	className?: string;
}

export function AnimatedContainer({ 
	children, 
	delay = 0, 
	duration = 0.6,
	className = "" 
}: AnimatedContainerProps) {
	return (
		<motion.div
			initial={{ 
				opacity: 0, 
				y: 20 
			}}
			animate={{ 
				opacity: 1, 
				y: 0 
			}}
			transition={{
				duration,
				delay,
				ease: "easeOut"
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}
