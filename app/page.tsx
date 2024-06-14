'use client'

import SideBar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { CheckPoint } from "@/types/types";
import { Loader2, Rocket } from "lucide-react";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';




const Map = dynamic(() => import('@/components/map'), { ssr: false });


export default function Home() {
  const [checkpoints, setCheckpoints] = useState<CheckPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  // const onImageDownload = () => {
  //   checkpoints.map((c) => {
  //     const svg = document.getElementById(`qr-code-${c.id - 1}`);
  //     if (svg) {
  //       const svgData = new XMLSerializer().serializeToString(svg);
  //       const canvas = document.createElement("canvas");
  //       const ctx = canvas.getContext("2d");
  //       const img = new Image();
  //       img.onload = () => {
  //         canvas.width = img.width;
  //         canvas.height = img.height;
  //         ctx?.drawImage(img, 0, 0);
  //         const pngFile = canvas.toDataURL("image/png");
  //         const downloadLink = document.createElement("a");
  //         downloadLink.download = c.name;
  //         downloadLink.href = `${pngFile}`;
  //         downloadLink.click();
  //       };
  //       img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  //     }
  //   })
  // };

  const handleLaunchYourAdventure = async () => {
    setIsLoading(true)

    const adventure = {
      customerId: 0,
      checkPoints: checkpoints
    }


    // onImageDownload()
    const res = await fetch('/api/adventure', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adventure),
    })
    const { adventure: { id } } = await res.json()
    router.push(`/${id}`)

  }


  return (
    <div style={{ overflow: "hidden", padding: 0, margin: 0, height: "100%" }}>
      <Map checkpoints={checkpoints} setCheckpoints={setCheckpoints} />
      <SideBar checkpoints={checkpoints} setCheckpoints={setCheckpoints} />
      <Button disabled={isLoading} onClick={handleLaunchYourAdventure} variant="default" style={{ position: "absolute", bottom: 30, right: 50, zIndex: 999, height: "10vh" }}>
        Launch your adventure
        {isLoading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Rocket className="ml-2" />}
      </Button>
    </div>
  )
}
