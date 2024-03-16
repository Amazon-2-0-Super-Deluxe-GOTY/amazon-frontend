import React, { CSSProperties } from 'react';

interface ScrollAreaProps {
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}

const ScrollArea = ({ className, style, children }: ScrollAreaProps) => {
  return (
     <div className="scrollbar-container overflow-y-auto max-h-[160px]">
     {children}
     <style jsx>{`
       .scrollbar-container::-webkit-scrollbar {
         width: 8px;
       }
       .scrollbar-container::-webkit-scrollbar-track {
         background-color: #f1f1f1; 
         border-radius: 4px;
       }
       .scrollbar-container::-webkit-scrollbar-thumb {
         background-color: #A1A1A1;
         border-radius: 4px;
       }
       .scrollbar-container::-webkit-scrollbar-thumb:hover {
        background-color: rgb(209 213 219); 
       }
     `}</style>
   </div>
  );
};

export default ScrollArea;
