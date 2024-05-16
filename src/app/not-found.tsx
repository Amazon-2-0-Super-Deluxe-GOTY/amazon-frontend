import "./globals.css";
import Image from 'next/image';
import Link from 'next/link';
import placeholder from "@/../public/Icons/placeholder.svg";
import { Button } from '@/components/ui/button';
 
export default function NotFound() {
  return (
    <div className='flex justify-center items-center'>
      <div className='flex justify-center items-center'>
        <Image src={placeholder} alt="Placeholder" className=" max-w-lg max-h-96" /> 
        <span>This page has gone fishing...</span>
        <Button variant={"default"}>
          <Link href="/">Return to main page</Link>
        </Button>
      </div>
    </div>
  )
}
