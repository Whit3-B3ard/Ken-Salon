import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center justify-center pl-2">
      <div className="p-2 w-16 h-16 relative overflow-hidden"> 
        <Image
          src="/logo01.png"
          alt="logo"
          className="object-cover"
          priority 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}
