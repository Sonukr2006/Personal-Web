"use client";
import useInView from "@/app/hooks/useInView";

export default function InView({ as: Tag = "div", delay = 0, className = "", children, ...props }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      data-visible={inView}
      style={{ transitionDelay: `${delay}ms` }}
      className={`translate-y-6 opacity-0 transition duration-700 ease-out data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}